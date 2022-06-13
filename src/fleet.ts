import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_lambda as lambda,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SignalCatalog } from './signalcatalog';
import { Vehicle  } from './vehicle';


/**
 * Interface
 */
export interface IFleet {
  signalCatalog: SignalCatalog;
  fleetId: string;
  description?: string;
  vehicles?: Vehicle[];
}

/**
 * The fleet of vehicles
 */
export class Fleet extends Construct {
  public readonly arn: string;
  public readonly fleetId: string;
  public readonly signalCatalog: SignalCatalog;
  public readonly vehicles: Vehicle[];
  
  constructor(scope: Construct, id: string, props: IFleet) {
    super(scope, id);

    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:fleet/${props.fleetId}`;
    this.signalCatalog = props.signalCatalog;
    this.fleetId = props.fleetId;
    this.vehicles = props.vehicles || [];

    const onEventHandler = new lambda.Function(this, 'Lambda', {
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/handlers')),
      handler: 'fleethandler.on_event',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.signalCatalog.lambdaLayer],
      role: this.signalCatalog.lambdaRole,
    });

    const provider = new cr.Provider(this, 'Provider', {
      onEventHandler: onEventHandler,
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: {
        fleet_id: this.fleetId,
        signal_catalog_arn: this.signalCatalog.arn,
        description: props.description,
        vehicle_ids: this.vehicles.map(v => v.vehicleId)
      },
    });

    resource.node.addDependency(this.signalCatalog);

  }
}