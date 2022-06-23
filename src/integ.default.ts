import * as cdk from 'aws-cdk-lib';
import {
  aws_timestream as ts,
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

    const role = new iam.Role(stack, 'Role', {
      roleName: 'iotfleetwise-role',
      assumedBy: new iam.ServicePrincipal('iotfleetwise.amazonaws.com'),
    });

    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'timestream:WriteRecords',
        'timestream:Select',
      ],
      resources: ['*'],
    }));

    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'timestream:DescribeEndpoints',
      ],
      resources: ['*'],
    }));

    const signalCatalog = new ifw.SignalCatalog(stack, 'SignalCatalog', {
      database,
      table,
      role,
      description: 'my signal catalog',
      nodes: [
        new ifw.SignalCatalogBranch('Vehicle', 'Vehicle'),
        new ifw.SignalCatalogSensor('EngineTorque', 'Vehicle.EngineTorque', 'DOUBLE'),
      ],
    });

    const model_a = new ifw.VehicleModel(stack, 'ModelA', {
      signalCatalog,
      name: 'modelA',
      description: 'Model A vehicle',
      networkInterfaces: [new ifw.CanVehicleInterface('1', 'vcan0')],
      signals: [
        new ifw.CanVehicleSignal('EngineTorque', 'Vehicle.EngineTorque', '1',
          401, // messageId
          1.0, // factor
          true, // isBigEndian
          false, // isSigned
          8, // length
          0.0, // offset
          9), // startBit
      ],
    });

    const vin100 = new ifw.Vehicle(stack, 'vin100', {
      vehicleId: 'vin100',
      vehicleModel: model_a,
      createIotThing: true,
    });

    const vin200 = new ifw.Vehicle(stack, 'vin200', {
      vehicleId: 'vin200',
      vehicleModel: model_a,
      createIotThing: true,
    });


    new ifw.Campaign(stack, 'Campaign1', {
      name: 'FwTimeBasedCampaign1',
      target: vin100,
      collectionScheme: new ifw.TimeBasedCollectionScheme(cdk.Duration.seconds(10)),
      signals: [
        new ifw.CampaignSignal('Vehicle.EngineTorque'),
      ],
      autoApprove: true,
    });

    new ifw.Fleet(stack, 'Fleet1', {
      fleetId: 'fleet1',
      signalCatalog,
      vehicles: [vin100, vin200],
    });

    new ifw.Fleet(stack, 'Fleet2', {
      fleetId: 'fleet2',
      signalCatalog,
      vehicles: [vin100],
    });

    this.stack = [stack];
  }
}

new IntegTesting();