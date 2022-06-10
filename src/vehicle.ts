import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_lambda as lambda,
  aws_iot as iot,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VehicleModel } from './vehiclemodel';


/**
 * Interface
 */
export interface IVehicle {
  vehicleModel: VehicleModel;
  vehicleId: string;
  createIotThing: boolean;
}

/**
 * The vehicle of a specific type from which IoT FleetWise collect signals.
 */
export class Vehicle extends Construct {
  public readonly arn: string;
  public readonly vehicleModel: VehicleModel;
  public readonly vehicleId: string;
  public readonly endpointAddress?: string;
  public readonly certificateId?: string;
  public readonly certificateArn?: string;
  public readonly certificatePem?: string;
  public readonly privateKey?: string;

  constructor(scope: Construct, id: string, props: IVehicle) {
    super(scope, id);

    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:vehicle/${props.vehicleId}`;
    this.vehicleModel = props.vehicleModel;
    this.vehicleId = props.vehicleId;

    const onEventHandler = new lambda.Function(this, 'Lambda', {
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/handlers')),
      handler: 'vehiclehandler.on_event',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.vehicleModel.signalCatalog.lambdaLayer],
      role: this.vehicleModel.signalCatalog.lambdaRole,
    });

    const provider = new cr.Provider(this, 'Provider', {
      onEventHandler: onEventHandler,
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: {
        vehicle_id: props.vehicleId,
        create_iot_thing: props.createIotThing,
        decoder_manifest_arn: `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:decoder-manifest/${props.vehicleModel.name}`,
        model_manifest_arn: `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:model-manifest/${props.vehicleModel.name}`,
      },
    });

    resource.node.addDependency(this.vehicleModel);

    if (props.createIotThing) {
      this.endpointAddress = resource.getAtt('endpointAddress').toString();
      this.certificateId = resource.getAtt('certificateId').toString();
      this.certificateArn = resource.getAtt('certificateArn').toString();
      this.certificatePem = resource.getAtt('certificatePem').toString();
      this.privateKey = resource.getAtt('privateKey').toString();

      const policy = new iot.CfnPolicy(this, 'Policy', {
        policyName: `${props.vehicleId}-policy`,
        policyDocument: `{
          "Version": "2012-10-17",
          "Statement": [{
                  "Effect": "Allow",
                  "Action": [
                      "iot:Connect",
                      "iot:Subscribe",
                      "iot:Publish",
                      "iot:Receive"
                  ],
                  "Resource": [
                      "arn:aws:iot:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:client/${props.vehicleId}*",
                      "arn:aws:iot:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topic/*",
                      "arn:aws:iot:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topicfilter/*"
                  ]
          }]
        }`,
      });
      policy.node.addDependency(resource);

      const policy_attachement = new iot.CfnPolicyPrincipalAttachment(this, 'Attachment', {
        policyName: policy.policyName!,
        principal: this.certificateArn,
      });
      policy_attachement.node.addDependency(policy);

      const thing_attachment = new iot.CfnThingPrincipalAttachment(this, 'ThingAttachment', {
        thingName: props.vehicleId,
        principal: this.certificateArn,
      });
      thing_attachment.node.addDependency(policy_attachement);

    }
  }
}