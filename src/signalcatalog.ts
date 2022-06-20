import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_iam as iam,
  aws_timestream as ts,
  aws_lambda as lambda,
  aws_logs as logs,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

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
    name: string,
    fullyQualifiedName: string,
    description?: string,

  ) {
    super();

    this.node = {
      type: 'Branch',
      branch: {
        name: name,
        fullyQualifiedName: fullyQualifiedName,
        ...description && { description },
      },
    };
  }
}

export class SignalCatalogSensor extends SignalCatalogNode {
  constructor(
    name: string,
    fullyQualifiedName: string,
    dataType: string,
    unit?: string,
    min?: number,
    max?: number,
    description?: string) {
    super();

    this.node = {
      type: 'Sensor',
      sensor: {
        name,
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
  readonly role: iam.Role;
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
  readonly lambdaRole: iam.Role;
  readonly lambdaLayer: lambda.LayerVersion;
  readonly logRetention: logs.RetentionDays;

  constructor(scope: Construct, id: string, props: SignalCatalogProps) {
    super(scope, id);


    this.name = props.name || 'default';
    this.description = props.description;
    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:signal-catalog/${this.name}`;

    this.lambdaRole = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
    });

    this.lambdaLayer = new lambda.LayerVersion(this, 'Boto3', {
      description: 'Boto3 Library with Iot Fleetwise Support',
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../layer.zip')),
    });

    const code = lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/handlers'));

    this.logRetention = logs.RetentionDays.ONE_DAY;

    const onEventHandlerService = new lambda.Function(this, 'Service', {
      code,
      handler: 'servicehandler.on_event',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.lambdaLayer],
      role: this.lambdaRole,
      logRetention: this.logRetention,
    });

    const isCompleteHandlerService = new lambda.Function(this, 'ServiceComplete', {
      code,
      handler: 'servicehandler.is_complete',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.lambdaLayer],
      role: this.lambdaRole,
      logRetention: this.logRetention,
    });

    const providerService = new cr.Provider(this, 'ServiceProvider', {
      onEventHandler: onEventHandlerService,
      isCompleteHandler: isCompleteHandlerService,
    });

    const serviceResource = new cdk.CustomResource(this, 'ServiceResource', {
      serviceToken: providerService.serviceToken,
      properties: {
        role_arn: props.role.roleArn,
        database_name: props.database.databaseName,
        table_name: props.table.tableName,
      },
    });

    const onEventHandlerCatalog = new lambda.Function(this, 'Catalog', {
      code,
      handler: 'signalcataloghandler.on_event',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.lambdaLayer],
      role: this.lambdaRole,
      logRetention: this.logRetention,
    });

    const providerCatalog = new cr.Provider(this, 'CatalogProvider', {
      onEventHandler: onEventHandlerCatalog,
    });

    const resourceCatalog = new cdk.CustomResource(this, 'CatalogResource', {
      serviceToken: providerCatalog.serviceToken,
      properties: {
        name: this.name,
        description: this.description,
        nodes: JSON.stringify(props.nodes.map(node => node.toObject())),
      },
    });

    resourceCatalog.node.addDependency(serviceResource);
  }
}

