import * as cdk from 'aws-cdk-lib';
import { aws_timestream as ts } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';

type dataTypeList =
  | 'INT8'
  | 'UINT8'
  | 'INT16'
  | 'UINT16'
  | 'INT32'
  | 'UINT32'
  | 'INT64'
  | 'UINT64'
  | 'BOOLEAN'
  | 'FLOAT'
  | 'DOUBLE'
  | 'STRING'
  | 'UNIX_TIMESTAMP'
  | 'INT8_ARRAY'
  | 'UINT8_ARRAY'
  | 'INT16_ARRAY'
  | 'UINT16_ARRAY'
  | 'INT32_ARRAY'
  | 'UINT32_ARRAY'
  | 'INT64_ARRAY'
  | 'UINT64_ARRAY'
  | 'BOOLEAN_ARRAY'
  | 'FLOAT_ARRAY'
  | 'DOUBLE_ARRAY'
  | 'STRING_ARRAY'
  | 'UNIX_TIMESTAMP_ARRAY'
  | 'UNKNOWN';
export class SignalCatalogNode {
  protected node: object;

  constructor() {
    this.node = {};
  }

  toObject(): object {
    return this.node;
  }
}

export interface SignalCatalogBranchProps {
  readonly description?: string;
  readonly fullyQualifiedName: string;
}

export class SignalCatalogBranch extends SignalCatalogNode {
  constructor(props: SignalCatalogBranchProps) {
    super();

    this.node = {
      branch: {
        ...props,
      },
    };
  }
}

export interface SignalCatalogSensorProps {
  readonly allowedValues?: string[];
  readonly dataType: dataTypeList;
  readonly description?: string;
  readonly fullyQualifiedName: string;
  readonly max?: number;
  readonly min?: number;
  readonly unit?: string;
}
export class SignalCatalogSensor extends SignalCatalogNode {
  constructor(props: SignalCatalogSensorProps) {
    super();

    this.node = {
      sensor: {
        ...props,
      },
    };
  }
}

export class SignalCatalogActuator extends SignalCatalogNode {
  constructor(
    dataType: string,
    fullyQualifiedName: string,
    allowedValues?: string[],
    assignedValue?: string,
    description?: string,
    max?: number,
    min?: number,
    unit?: string,
  ) {
    super();

    this.node = {
      actuator: {
        dataType,
        fullyQualifiedName,
        ...(allowedValues && { allowedValues }),
        ...(assignedValue && { assignedValue }),
        ...(description && { description }),
        ...(min && { min }),
        ...(max && { max }),
        ...(unit && { unit }),
      },
    };
  }
}

export class SignalCatalogAttribute extends SignalCatalogNode {
  constructor(
    dataType: string,
    fullyQualifiedName: string,
    allowedValues?: string[],
    assignedValue?: string,
    defaultValue?: string,
    description?: string,
    max?: number,
    min?: number,
    unit?: string,
  ) {
    super();

    this.node = {
      attribute: {
        dataType,
        fullyQualifiedName,
        ...(allowedValues && { allowedValues }),
        ...(assignedValue && { assignedValue }),
        ...(defaultValue && { defaultValue }),
        ...(description && { description }),
        ...(min && { min }),
        ...(max && { max }),
        ...(unit && { unit }),
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
 * At present, AWS IoT FleetWise can only support a single Signal Catalog per account.
 *
 */
export class SignalCatalog extends Construct {
  /**
   * The name of the signal catalog
   */
  readonly name: string;
  readonly description: string | undefined;
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
      serviceToken: Provider.getOrCreate(this, serviceCatalogHandler).provider
        .serviceToken,
      properties: {
        name: this.name,
        description: this.description,
        nodes: JSON.stringify(props.nodes.map((node) => node.toObject())),
      },
    });

    resourceCatalog.node.addDependency(serviceResource);
  }
}
