import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';
import { SignalCatalog } from './signalcatalog';
import { Vehicle } from './vehicle';


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

    const handler = new Handler(this, 'Handler', {
      handler: 'fleethandler.on_event',
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: Provider.getOrCreate(this, handler).provider.serviceToken,
      properties: {
        fleet_id: this.fleetId,
        signal_catalog_arn: this.signalCatalog.arn,
        description: props.description || ' ',
        vehicle_names: Array.from(new Set(this.vehicles!.map(v => v.vehicleName))),
      },
    });

    resource.node.addDependency(this.signalCatalog);
    this.vehicles!.map(v => resource.node.addDependency(v));
  }
}