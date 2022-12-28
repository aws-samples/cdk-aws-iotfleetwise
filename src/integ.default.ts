import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { aws_timestream as ts } from 'aws-cdk-lib';
import * as ifw from '.';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region:
        process.env.CDK_INTEG_REGION ||
        process.env.CDK_DEFAULT_REGION ||
        'us-east-1',
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

    const signalCatalog = new ifw.SignalCatalog(stack, 'SignalCatalog', {
      database,
      table,
      description: 'my signal catalog',
      nodes: [
        new ifw.SignalCatalogBranch({ fullyQualifiedName: 'Vehicle' }),
        new ifw.SignalCatalogSensor({
          fullyQualifiedName: 'Vehicle.EngineTorque',
          dataType: 'DOUBLE',
        }),
        new ifw.SignalCatalogActuator({
          fullyQualifiedName: 'Vehicle.FanSpeed',
          allowedValues: ['OFF', 'LOW', 'MEDIUM', 'HIGH'],
          assignedValue: 'OFF',
          dataType: 'STRING_ARRAY',
          description: 'Test fan speed',
        }),
        new ifw.SignalCatalogAttribute({
          fullyQualifiedName: 'Vehicle.PowerMax',
          dataType: 'UINT16',
          defaultValue: '0',
          description: 'Peak power, in kilowatts, that engine can generate.',
          unit: 'kW',
        }),
      ],
      vssFile: path.join(__dirname, '..', 'test', 'OBD.vspec'),
      vssPrefix: 'Vehicle.OBD',
      vssGeneratePrefixBranch: true,
    });

    const model_a = new ifw.VehicleModel(stack, 'ModelA', {
      signalCatalog,
      name: 'modelA',
      description: 'Model A vehicle',
      networkInterfaces: [
        new ifw.CanVehicleInterface({ interfaceId: '1', name: 'vcan0' }),
      ],
      signals: [
        new ifw.CanVehicleSignal({
          fullyQualifiedName: 'Vehicle.EngineTorque',
          interfaceId: '1',
          messageId: 401,
          factor: 1.0,
          isBigEndian: true,
          isSigned: false,
          length: 8,
          offset: 0.0,
          startBit: 9,
        }),
      ],
    });

    const vin100 = new ifw.Vehicle(stack, 'vin100', {
      vehicleName: 'vin100',
      vehicleModel: model_a,
      createIotThing: true,
    });

    const vin200 = new ifw.Vehicle(stack, 'vin200', {
      vehicleName: 'vin200',
      vehicleModel: model_a,
      createIotThing: true,
    });

    new ifw.Campaign(stack, 'Campaign1', {
      name: 'FwTimeBasedCampaign1',
      target: vin100,
      collectionScheme: new ifw.TimeBasedCollectionScheme(
        cdk.Duration.seconds(10),
      ),
      signals: [new ifw.CampaignSignal('Vehicle.EngineTorque')],
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

    // Supplemental permutations of constructs
    // no prefix
    new ifw.SignalCatalog(stack, 'SignalCatalogFromVssNoPrefix', {
      database,
      table,
      description: 'my signal catalog without prefix',
      nodes: [],
      vssFile: path.join(__dirname, '..', 'test', 'OBD.vspec'),
      // vssPrefix: 'Vehicle.OBD',
      // vssGeneratePrefixBranch: false,
    });

    // No nodes[] provide, but VSS file is provided - example without description
    new ifw.SignalCatalog(stack, 'SignalCatalogFromVssOnly', {
      database,
      table,
      vssFile: path.join(__dirname, '..', 'test', 'OBD.vspec'),
    });

    // No nodes[] or VSS file provided - expect error
    expect(() => {
      new ifw.SignalCatalog(stack, 'SignalCatalogWithNoSignals', {
        database,
        table,
        description: 'my signal catalog without any Signals',
      });
    }).toThrowError(
      /Either a VSS file or signal catalog nodes must be provided./,
    );
    this.stack = [stack];
  }
}

new IntegTesting();
