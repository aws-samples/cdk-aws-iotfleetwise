[![NPM version](https://badge.fury.io/js/cdk-aws-iotfleetwise.svg)](https://badge.fury.io/js/cdk-aws-iotfleetwise)
[![PyPI version](https://badge.fury.io/py/cdk-aws-iotfleetwise.svg)](https://badge.fury.io/py/cdk-aws-iotfleetwise)
[![release](https://github.com/aws-samples/cdk-aws-iotfleetwise/actions/workflows/release.yml/badge.svg)](https://github.com/aws-samples/cdk-aws-iotfleetwise/actions/workflows/release.yml)

# cdk-aws-iotfleetwise

L2 CDK construct to provision AWS IoT Fleetwise

# Install

### Typescript

```sh
npm install cdk-aws-iotfleetwise 
```

[API Reference](doc/api-typescript.md)

#### Python

```sh
pip install cdk-aws-iotfleetwise 
```

[API Reference](doc/api-python.md)

# Sample

```ts

    const database = new ts.CfnDatabase(this, 'Database', {
      databaseName: 'FleetWise',
    });

    const table = new ts.CfnTable(this, 'Table', {
      databaseName: 'FleetWise',
      tableName: 'FleetWise',
    });

    const role = new aim.Role(this, 'Role', {
      assumedBy: new aim.ServicePrincipal('iotfleetwise.amazonaws.com'),
      managedPolicies: [
        aim.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],

    });

    const signalCatalog = new ifw.SignalCatalog(this, 'SignalCatalog', {
      database,
      table,
      role,
      nodes: [
        new ifw.SignalCatalogBranch('Vehicle', 'Vehicle'),
        new ifw.SignalCatalogSensor('EngineTorque', 'Vehicle.EngineTorque', 'DOUBLE'),
      ],
    });

    const model_a = new ifw.VehicleModel(this, 'ModelA', {
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
          8, // lenght
          0.0, // offset
          9), // startBit
      ],
    });

    const vin100 = new ifw.Vehicle(this, 'vin100', {
      vehicleId: 'vin100',
      vehicleModel: model_a,
      createIotThing: true
    });

    new ifw.Campaign(this, 'Campaign', {
      name: 'TimeBasedCampaign',
      target: vin100,
      collectionScheme: new ifw.TimeBasedCollectionScheme(cdk.Duration.seconds(10)),
      signals: [
        new ifw.CampaignSignal('Vehicle.EngineTorque'),
      ],
    });
```

## Getting started
To deploy a simple end-to-end example you can use the following commands

```sh
yarn install
projen && projen build
npx cdk -a lib/integ.full.js deploy
```

The deploy takes about 15 mins mostly due to compilation of the IoT FleetWise agent in the
EC2 instance that simulate the vehicle. Once deploy is finshed, approve the campaign with the command:

```sh
aws iotfleetwise update-campaign --campaign-name FwTimeBasedCampaign --action APPROVE
```

and data will start to show up in the Timestream table.

## TODO

Warning: this construct should be considered at alpha stage and is not feature complete.
- Reduce Lambda log retention to 1d
- Apply the least priviledge principle to roles
- Implement updates for all the custom resources
- Conditional campaigns

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more 
information.

## License

This code is licensed under the MIT-0 License. See the LICENSE file.

