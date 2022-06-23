import * as cdk from 'aws-cdk-lib';
import {
  aws_timestream as ts,
  aws_iam as iam,
  aws_ec2 as ec2,
} from 'aws-cdk-lib';
import * as ifw from '.';


export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION || 'us-east-1',
      account: process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'integ-stack', { env });

    const databaseName = 'FleetWise';
    const tableName = 'FleetWise';

    const database = new ts.CfnDatabase(stack, 'Database', {
      databaseName,
    });

    const table = new ts.CfnTable(stack, 'Table', {
      databaseName,
      tableName,
    });

    table.node.addDependency(database);

    const role = new iam.Role(stack, 'Role', {
      roleName: 'iotfleetwise-role',
      assumedBy: new iam.ServicePrincipal('iotfleetwise.amazonaws.com'),
    });

    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'timestream:WriteRecords',
        'timestream:Select',
      ],
      resources: ['*'],
    }));

    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'timestream:DescribeEndpoints',
      ],
      resources: ['*'],
    }));

    const signalCatalog = new ifw.SignalCatalog(stack, 'SignalCatalog', {
      database,
      table,
      role,
      description: 'my signal catalog',
      nodes: [
        new ifw.SignalCatalogBranch('Vehicle', 'Vehicle'),
        new ifw.SignalCatalogSensor('EngineTorque', 'Vehicle.EngineTorque', 'DOUBLE'),
      ],
    });

    const model_a = new ifw.VehicleModel(stack, 'ModelA', {
      signalCatalog,
      name: 'modelA',
      description: 'Model A vehicle',
      networkInterfaces: [new ifw.CanVehicleInterface('1', 'vcan0')],
      signals: [
        new ifw.CanVehicleSignal('EngineTorque', 'Vehicle.EngineTorque', '1',
          401, // messageId
          1.0, // factor
          true, // isBigEndian
          false, // isSigned
          8, // length
          0.0, // offset
          9), // startBit
      ],
    });

    const vin100 = new ifw.Vehicle(stack, 'vin100', {
      vehicleId: 'vin100',
      vehicleModel: model_a,
      createIotThing: true,
    });

    const vpc = ec2.Vpc.fromLookup(stack, 'VPC', { isDefault: true });

    const securityGroup = new ec2.SecurityGroup(stack, 'SecurityGroup', {
      vpc,
      allowAllOutbound: true,
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'SSH access');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allIcmp(), 'ping');

    // EC2 role
    const ec2_role = new iam.Role(stack, 'ec2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
      ],
    });

    ec2_role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:List*',
        's3:Get*',
      ],
      resources: ['arn:aws:s3:::*'],
    }));

    // Ubuntu 18.04 for Arm64
    const machineImage = ec2.MachineImage.fromSsmParameter(
      '/aws/service/canonical/ubuntu/server/18.04/stable/current/arm64/hvm/ebs-gp2/ami-id',
      { os: ec2.OperatingSystemType.LINUX },
    );

    // Create the Vehicle simulator
    const keyName = stack.node.tryGetContext('key_name');
    const instance = new ec2.Instance(stack, 'VehicleSim', {
      vpc: vpc,
      instanceType: new ec2.InstanceType('m6g.xlarge'),
      machineImage,
      securityGroup,
      keyName,
      role: ec2_role,
      vpcSubnets: {
        subnetGroupName: 'Public',
      },
      resourceSignalTimeout: cdk.Duration.minutes(30),
    });

    const sourceUrl = 'https://github.com/aws/aws-iot-fleetwise-edge.git';
    const userData = `\
    set -euo pipefail

    # Wait for any existing package install to finish
    i=0
    while true; do
        if sudo fuser /var/{lib/{dpkg,apt/lists},cache/apt/archives}/lock >/dev/null 2>&1; then
            i=0
        else
            i=\`expr $i + 1\`
            if expr $i \\>= 10 > /dev/null; then
                break
            fi
        fi
        sleep 1
    done

    # Upgrade system and reboot if required
    apt update && apt upgrade -y
    if [ -f /var/run/reboot-required ]; then
      # Delete the UserData info file so that we run again after reboot
      rm -f /var/lib/cloud/instances/*/sem/config_scripts_user
      reboot
      exit
    fi

    # Install helper scripts:
    apt update && apt install -y python3-setuptools
    mkdir -p /opt/aws/bin
    wget https://s3.amazonaws.com/cloudformation-examples/aws-cfn-bootstrap-py3-latest.tar.gz
    python3 -m easy_install --script-dir /opt/aws/bin aws-cfn-bootstrap-py3-latest.tar.gz
    rm aws-cfn-bootstrap-py3-latest.tar.gz

    # On error, signal back to cfn:
    error_handler() {
      /opt/aws/bin/cfn-signal --success false --stack ${stack.stackName} --resource ${instance.instance.logicalId} --region ${stack.region}
    }
    trap error_handler ERR

    # Increase pid_max:
    echo 1048576 > /proc/sys/kernel/pid_max
    # Disable syslog:
    systemctl stop syslog.socket rsyslog.service
    # Remove journald rate limiting and set max size:
    printf "RateLimitBurst=0\nSystemMaxUse=1G\n" >> /etc/systemd/journald.conf

    # Install packages
    apt update && apt install -y git ec2-instance-connect htop jq unzip

    # Install AWS CLI:
    curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    ./aws/install
    rm awscliv2.zip

    # Download source
    cd /home/ubuntu
    if echo ${sourceUrl} | grep -q 's3://'; then
      sudo -u ubuntu aws s3 cp ${sourceUrl} aws-iot-fleetwise-edge.zip
      sudo -u ubuntu unzip aws-iot-fleetwise-edge.zip -d aws-iot-fleetwise-edge
    else
      sudo -u ubuntu git clone ${sourceUrl} aws-iot-fleetwise-edge
    fi
    cd aws-iot-fleetwise-edge
    
    # Install SocketCAN modules:
    ./tools/install-socketcan.sh --bus-count 1
    
    # Install CAN Simulator
    ./tools/install-cansim.sh --bus-count 1
    
    # Install FWE credentials and config file
    mkdir /etc/aws-iot-fleetwise
    echo -n "${vin100.certificatePem}" > /etc/aws-iot-fleetwise/certificate.pem
    echo -n "${vin100.privateKey}" > /etc/aws-iot-fleetwise/private-key.key
    ./tools/configure-fwe.sh \
      --input-config-file "configuration/static-config.json" \
      --output-config-file "/etc/aws-iot-fleetwise/config-0.json" \
      --vehicle-id vin100 \
      --endpoint-url "${vin100.endpointAddress}" \
      --topic-prefix '$aws/iotfleetwise/' \
      --can-bus0 "vcan0"

    # Install source deps
    ./tools/install-deps-native.sh

    # Build source
    sudo -u ubuntu ./tools/build-fwe-native.sh

    # Install FWE
    ./tools/install-fwe.sh
    
    # Signal init complete:
    /opt/aws/bin/cfn-signal --stack ${stack.stackName} --resource ${instance.instance.logicalId} --region ${stack.region}`;

    instance.addUserData(userData);
    new cdk.CfnOutput(stack, 'Vehicle Sim ssh command', { value: `ssh -i ${keyName}.pem ubuntu@${instance.instancePublicIp}` });

    new ifw.Campaign(stack, 'Campaign', {
      name: 'FwTimeBasedCampaign',
      target: vin100,
      collectionScheme: new ifw.TimeBasedCollectionScheme(cdk.Duration.seconds(10)),
      signals: [
        new ifw.CampaignSignal('Vehicle.EngineTorque'),
      ],
      autoApprove: true,
    });

    new ifw.Fleet(stack, 'Fleet', {
      fleetId: 'fleet',
      signalCatalog,
      vehicles: [vin100],
    });

    this.stack = [stack];
  }
}

new IntegTesting();