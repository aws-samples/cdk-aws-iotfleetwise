import * as cdk from 'aws-cdk-lib';
import {
  aws_timestream as ts,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';


export class SignalCatalogNode {
  protected node: object;

  constructor() {
    this.node = {};
  }

  toObject(): object {
    return (this.node);
  }
}

export class SignalCatalogBranch extends SignalCatalogNode {
  constructor(
    fullyQualifiedName: string,
    description?: string,

  ) {
    super();

    this.node = {
      branch: {
        fullyQualifiedName: fullyQualifiedName,
        ...description && { description },
      },
    };
  }
}

export class SignalCatalogSensor extends SignalCatalogNode {
  constructor(
    fullyQualifiedName: string,
    dataType: string,
    unit?: string,
    min?: number,
    max?: number,
    description?: string) {
    super();

    this.node = {
      sensor: {
        fullyQualifiedName,
        dataType,
        ...unit && { unit },
        ...min && { min },
        ...max && { max },
        ...description && { description },

      },
    };
  }
}

export interface SignalCatalogProps {
  readonly name?: string;
  readonly description?: string;
  readonly database: ts.CfnDatabase;
  readonly table: ts.CfnTable;
  readonly nodes: SignalCatalogNode[];
}

/**
 * The Signal Catalog represents the list of all signals that you want to collect from all
 * the vehicles.
 *
 *
 * The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.
 *
 */
export class SignalCatalog extends Construct {
  /**
   * The name of the signal catalog
   */
  readonly name: string;
  readonly description: (string|undefined);
  readonly arn: string;

  constructor(scope: Construct, id: string, props: SignalCatalogProps) {
    super(scope, id);

    this.name = props.name || 'default';
    this.description = props.description;
    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:signal-catalog/${this.name}`;

    const handler = new Handler(this, 'Handler', {
      handler: 'servicehandler.on_event',
    });

    const isCompleteHandler = new Handler(this, 'IsCompleteHandler', {
      handler: 'servicehandler.is_complete',
    });

    const provider = Provider.getOrCreate(this, handler, isCompleteHandler);

    const serviceResource = new cdk.CustomResource(this, 'ServiceResource', {
      serviceToken: provider.provider.serviceToken,
      properties: {
        database_name: props.database.databaseName,
        table_name: props.table.tableName,
      },
    });

    const serviceCatalogHandler = new Handler(this, 'ServiceCatalogHandler', {
      handler: 'signalcataloghandler.on_event',
    });

    const resourceCatalog = new cdk.CustomResource(this, 'CatalogResource', {
      serviceToken: Provider.getOrCreate(this, serviceCatalogHandler).provider.serviceToken,
      properties: {
        name: this.name,
        description: this.description,
        nodes: JSON.stringify(props.nodes.map(node => node.toObject())),
      },
    });

    resourceCatalog.node.addDependency(serviceResource);
  }
}

