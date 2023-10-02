import * as cdk from 'aws-cdk-lib';
import {
  aws_iot as iot,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';
import { VehicleModel } from './vehiclemodel';

/**
 * Attribute string map
 */

/**
 * Interface
 */
export interface VehicleProps {
  readonly vehicleModel: VehicleModel;
  readonly vehicleName: string;
  readonly createIotThing: boolean;
  readonly attributes?: {[key: string]: string};
}

/**
 * The vehicle of a specific type from which IoT FleetWise collect signals.
 */
export class Vehicle extends Construct {
  public readonly arn: string;
  public readonly vehicleModel: VehicleModel = ({} as VehicleModel);
  public readonly vehicleName: string = '';
  public readonly endpointAddress?: string;
  public readonly certificateId?: string;
  public readonly certificateArn?: string;
  public readonly certificatePem?: string;
  public readonly privateKey?: string;

  constructor(scope: Construct, id: string, props: VehicleProps) {
    super(scope, id);

    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:vehicle/${props.vehicleName}`;
    (this.vehicleModel as VehicleModel) = props.vehicleModel;
    (this.vehicleName as string) = props.vehicleName;

    const handler = new Handler(this, 'Handler', {
      handler: 'vehiclehandler.on_event',
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: Provider.getOrCreate(this, handler).provider.serviceToken,
      properties: {
        vehicle_name: props.vehicleName,
        create_iot_thing: props.createIotThing,
        decoder_manifest_arn: `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:decoder-manifest/${props.vehicleModel.name}`,
        model_manifest_arn: `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:model-manifest/${props.vehicleModel.name}`,
        attributes: props.attributes,
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
        policyName: `${props.vehicleName}-policy`,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [{
            Effect: 'Allow',
            Action: [
              'iot:Connect',
              'iot:Subscribe',
              'iot:Publish',
              'iot:Receive',
            ],
            Resource: [
              `arn:aws:iot:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:client/${props.vehicleName}*`,
              `arn:aws:iot:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topic/*`,
              `arn:aws:iot:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:topicfilter/*`,
            ],
          }],
        },
      });
      policy.node.addDependency(resource);

      const policy_attachement = new iot.CfnPolicyPrincipalAttachment(this, 'Attachment', {
        policyName: policy.policyName!,
        principal: this.certificateArn,
      });
      policy_attachement.node.addDependency(policy);

      const thing_attachment = new iot.CfnThingPrincipalAttachment(this, 'ThingAttachment', {
        thingName: props.vehicleName,
        principal: this.certificateArn,
      });
      thing_attachment.node.addDependency(policy_attachement);

    }
  }
}