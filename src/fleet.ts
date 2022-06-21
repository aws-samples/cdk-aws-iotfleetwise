import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  Aws,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SignalCatalog } from './signalcatalog';
import { Vehicle } from './vehicle';
import { Provider } from './provider';


/**
 * Interface
 */
export interface FleetProps {
  readonly signalCatalog: SignalCatalog;
  readonly fleetId: string;
  readonly description?: string;
  readonly vehicles?: Array<Vehicle>;
}

/**
 * The fleet of vehicles
 */
export class Fleet extends Construct {
  public readonly arn: string;
  public readonly fleetId: string = '';
  public readonly signalCatalog: SignalCatalog = ({} as SignalCatalog);
  public readonly vehicles?: Array<Vehicle> = undefined;

  constructor(scope: Construct, id: string, props: FleetProps) {
    super(scope, id);

    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:fleet/${props.fleetId}`;
    (this.signalCatalog as SignalCatalog) = props.signalCatalog;
    (this.fleetId as string)= props.fleetId;
    (this.vehicles as Vehicle[]) = props.vehicles || [];

    const onEventHandler = new lambda.SingletonFunction(this, 'Lambda', {
      uuid: `${Aws.STACK_NAME}-fleet-handler`,
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/handlers')),
      handler: 'fleethandler.on_event',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.signalCatalog.lambdaLayer],
      role: this.signalCatalog.lambdaRole,
      logRetention: this.signalCatalog.logRetention,
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: Provider.getOrCreate(this, onEventHandler).provider.serviceToken,
      properties: {
        fleet_id: this.fleetId,
        signal_catalog_arn: this.signalCatalog.arn,
        description: props.description || ' ',
        vehicle_ids: this.vehicles!.map(v => v.vehicleId),
      },
    });

    resource.node.addDependency(this.signalCatalog);
    this.vehicles!.map(v => resource.node.addDependency(v));
  }
}