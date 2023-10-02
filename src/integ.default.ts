import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_timestream as ts,
  aws_s3 as s3,
  aws_iam as iam,
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

    const use_s3 = stack.node.tryGetContext('use_s3');

    // Fleetwise timestream role
    const fw_timestream_role = new iam.Role(stack, 'iotfleetwiseRole', {
      assumedBy: new iam.ServicePrincipal('iotfleetwise.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonTimestreamFullAccess'),
      ],
    });

    // add campaign s3 bucket
    const s3bucket = new s3.Bucket(stack, 'S3Bucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // add s3 bucket policy

    s3bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('iotfleetwise.amazonaws.com')],
        actions: ['s3:Get*', 's3:Put*'],
        resources: [`${s3bucket.bucketArn}/*`],
      }));

    s3bucket.policy?.document.addStatements(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('iotfleetwise.amazonaws.com')],
        actions: ['s3:List*'],
        resources: [s3bucket.bucketArn],
      }));

    const signalCatalog = new ifw.SignalCatalog(stack, 'SignalCatalog', {
      description: 'my signal catalog',
      nodes: [
        new ifw.SignalCatalogBranch({ fullyQualifiedName: 'Vehicle' }),
        new ifw.SignalCatalogSensor({
          fullyQualifiedName: 'Vehicle.EngineTorque',
          dataType: 'DOUBLE',
        }),
        new ifw.SignalCatalogActuator({
          fullyQualifiedName: 'Vehicle.FanSpeed',
          allowedValues: ['OFF', 'LOW', 'MEDIUM', 'HIGH'],
          assignedValue: 'OFF',
          dataType: 'STRING_ARRAY',
          description: 'Test fan speed',
        }),
        new ifw.SignalCatalogAttribute({
          fullyQualifiedName: 'Vehicle.PowerMax',
          dataType: 'UINT16',
          defaultValue: '0',
          description: 'Peak power, in kilowatts, that engine can generate.',
          unit: 'kW',
        }),
      ],
      vssFile: path.join(__dirname, '..', 'test', 'OBD.vspec'),
      vssPrefix: 'Vehicle.OBD',
      vssGeneratePrefixBranch: true,
    });

    const model_a = new ifw.VehicleModel(stack, 'ModelA', {
      signalCatalog,
      name: 'modelA',
      description: 'Model A vehicle',
      networkInterfaces: [
        new ifw.CanVehicleInterface({ interfaceId: '1', name: 'vcan0' }),
      ],
      signals: [
        new ifw.CanVehicleSignal({
          fullyQualifiedName: 'Vehicle.EngineTorque',
          interfaceId: '1',
          messageId: 401,
          factor: 1.0,
          isBigEndian: true,
          isSigned: false,
          length: 8,
          offset: 0.0,
          startBit: 9,
        }),
      ],
    });

    const vin100 = new ifw.Vehicle(stack, 'vin100', {
      vehicleName: 'vin100',
      vehicleModel: model_a,
      createIotThing: true,
    });

    const vin200 = new ifw.Vehicle(stack, 'vin200', {
      vehicleName: 'vin200',
      vehicleModel: model_a,
      createIotThing: true,
    });


    new ifw.Campaign(stack, 'Campaign1', {
      name: 'FwTimeBasedCampaign1',
      target: vin100,
      collectionScheme: new ifw.TimeBasedCollectionScheme(cdk.Duration.seconds(10)),
      signals: [
        new ifw.CampaignSignal('Vehicle.EngineTorque'),
        new ifw.CampaignSignal(
          'Vehicle.ThrottlePosition',
          20,
          cdk.Duration.seconds(10),
        ),
      ],
      autoApprove: true,
      useS3: use_s3,
      campaignS3arn: s3bucket.bucketArn,
      timestreamArn: table.attrArn,
      fwTimestreamRole: fw_timestream_role.roleArn,
    });

    new ifw.Fleet(stack, 'Fleet1', {
      fleetId: 'fleet1',
      signalCatalog,
      vehicles: [vin100, vin200],
    });

    new ifw.Fleet(stack, 'Fleet2', {
      fleetId: 'fleet2',
      signalCatalog,
      vehicles: [vin100],
    });

    // Supplemental permutations of constructs
    // no prefix
    new ifw.SignalCatalog(stack, 'SignalCatalogFromVssNoPrefix', {
      description: 'my signal catalog without prefix',
      nodes: [],
      vssFile: path.join(__dirname, '..', 'test', 'OBD.vspec'),
      // vssPrefix: 'Vehicle.OBD',
      // vssGeneratePrefixBranch: false,
    });

    // No nodes[] provide, but VSS file is provided - example without description
    new ifw.SignalCatalog(stack, 'SignalCatalogFromVssOnly', {
      vssFile: path.join(__dirname, '..', 'test', 'OBD.vspec'),
    });

    // No nodes[] or VSS file provided - expect error
    expect(() => {
      new ifw.SignalCatalog(stack, 'SignalCatalogWithNoSignals', {
        description: 'my signal catalog without any Signals',
      });
    }).toThrowError(
      /Either a VSS file or signal catalog nodes must be provided./,
    );
    this.stack = [stack];

    // test logging
    new ifw.Logging(stack, 'LoggingDefault', {
      logGroupName: 'AWSIotFleetWiseLogsV1',
      enableLogging: 'OFF',
    });
    new ifw.Logging(stack, 'LoggingDisable', {
      logGroupName: 'AWSIotFleetWiseLogsV1',
      enableLogging: 'ERROR',
    });
    new ifw.Logging(stack, 'LoggingDeleteGroup', {
      logGroupName: 'AWSIotFleetWiseLogsV1',
      enableLogging: 'ERROR',
      keepLogGroup: false,
    });

  }
}

new IntegTesting();