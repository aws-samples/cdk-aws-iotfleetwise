import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';
import { Vehicle } from './vehicle';


export class CollectionScheme {
  protected scheme: object;

  constructor() {
    this.scheme = {};
  }

  toObject(): object {
    return (this.scheme);
  }
}

export class TimeBasedCollectionScheme extends CollectionScheme {
  constructor(
    period: cdk.Duration,
  ) {
    super();

    this.scheme = {
      timeBasedCollectionScheme: {
        periodMs: period.toMilliseconds(),
      },
    };
  }
}

export class CampaignSignal {
  private signal: object;
  constructor(
    name: string,
    maxSampleCount?: number,
    minimumSamplingInterval?: cdk.Duration) {

    this.signal = {
      name,
      ...maxSampleCount && { maxSampleCount },
      ...minimumSamplingInterval && { minimumSamplingInterval },
    };
  }

  toObject(): object {
    return (this.signal);
  }
}

export interface CampaignProps {
  readonly name: string;
  readonly target: Vehicle;
  readonly collectionScheme: CollectionScheme;
  readonly signals: CampaignSignal[];
  readonly autoApprove?: boolean;
}

export class Campaign extends Construct {
  readonly name: string = '';
  readonly arn: string = '';
  readonly target: Vehicle = ({} as Vehicle);

  constructor(scope: Construct, id: string, props: CampaignProps) {
    super(scope, id);

    (this.name as string) = props.name;
    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:vehicle/${props.target}`;
    (this.target as Vehicle) = props.target;

    const handler = new Handler(this, 'Handler', {
      handler: 'campaignhandler.on_event',
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: Provider.getOrCreate(this, handler).provider.serviceToken,
      properties: {
        name: this.name,
        signal_catalog_arn: this.target.vehicleModel.signalCatalog.arn,
        target_arn: this.target.arn,
        collection_scheme: JSON.stringify(props.collectionScheme.toObject()),
        signals_to_collect: JSON.stringify(props.signals.map(s => s.toObject())),
        auto_approve: props.autoApprove || false,
      },
    });
    resource.node.addDependency(this.target);
  }
}