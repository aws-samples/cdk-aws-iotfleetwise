import * as fs from 'fs';
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

    const canDbc = fs.readFileSync(path.join(__dirname, '/../hscan.dbc'), 'utf8');

    const nodes: Array<ifw.SignalCatalogNode> = [
      new ifw.SignalCatalogBranch({
        fullyQualifiedName: 'Vehicle',
        description: 'Vehicle Catalog',
      }),
    ];
    canDbc
      .split('\n')
      .filter((line) => /^\s+SG_\s+\w+/.test(line))
      .map((line) => {
        const signal_name = line.split(/\s+/)[2];
        nodes.push(
          new ifw.SignalCatalogSensor({
            fullyQualifiedName: `Vehicle.${signal_name}`,
            dataType: 'DOUBLE',
          }),
        );
      });

    const signalCatalog = new ifw.SignalCatalog(stack, 'SignalCatalog', {
      description: 'my signal catalog',
      nodes,
    });

    const signalsMap: Record<string, string> = {};
    canDbc.split('\n').filter(line => /^\s+SG_\s+\w+/.test(line)).map(line => {
      const signal_name = line.split(/\s+/)[2];
      signalsMap[signal_name] =`Vehicle.${signal_name}`;
    });

    const model_a = new ifw.VehicleModel(stack, 'ModelA', {
      signalCatalog,
      name: 'modelA',
      description: 'Model A vehicle',
      networkInterfaces: [
        new ifw.CanVehicleInterface({ interfaceId: '1', name: 'vcan0' }),
      ],
      networkFileDefinitions: [
        new ifw.CanDefinition('1', signalsMap, [canDbc]),
      ],
    });

    const vin100 = new ifw.Vehicle(stack, 'vin100', {
      vehicleName: 'vin100',
      vehicleModel: model_a,
      createIotThing: true,
    });
    new cdk.CfnOutput(stack, 'certificateId', { value: vin100.certificateId! });

    new ifw.Fleet(stack, 'fleet1', {
      fleetId: 'fleet1',
      signalCatalog: signalCatalog,
      description: 'my fleet1',
      vehicles: [vin100],
    });

    this.stack = [stack];
  }
}

new IntegTesting();