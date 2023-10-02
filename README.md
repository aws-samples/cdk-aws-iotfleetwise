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
import {
  SignalCatalog,
  VehicleModel,
  Vehicle,
  Campaign,
  CanVehicleInterface,
  CanVehicleSignal,
  SignalCatalogBranch,
  TimeBasedCollectionScheme,
} from 'cdk-aws-iotfleetwise';

const signalCatalog = new SignalCatalog(stack, 'SignalCatalog', {
  database: tsDatabaseConstruct,
  table: tsHeartBeatTableConstruct,
  nodes: [
    new SignalCatalogBranch({
      fullyQualifiedName: 'Vehicle',
    }),
    new SignalCatalogSensor({
      fullyQualifiedName: 'Vehicle.EngineTorque',
      dataType: 'DOUBLE',
    }),
  ],
});

const model_a = new VehicleModel(stack, 'ModelA', {
  signalCatalog,
  name: 'modelA',
  description: 'Model A vehicle',
  networkInterfaces: [
    new CanVehicleInterface({
      interfaceId: '1',
      name: 'vcan0',
    }),
  ],
  signals: [
    new CanVehicleSignal({
      fullyQualifiedName: 'Vehicle.EngineTorque',
      interfaceId: '1',
      messageId: 401,
      factor: 1.0,
      isBigEndian: true,
      isSigned: false,
      length: 8,
      offset: 0.0,
      startBit: 0,
    }),
  ],
});

const vin100 = new Vehicle(stack, 'vin100', {
  vehicleName: 'vin100',
  vehicleModel: model_a,
  createIotThing: true,
});

new Campaign(stack, 'Campaign', {
  name: 'TimeBasedCampaign',
  target: vin100,
  collectionScheme: new TimeBasedCollectionScheme(cdk.Duration.seconds(10)),
  signals: [new CampaignSignal('Vehicle.EngineTorque')],
});
```

## Getting started

To deploy a simple end-to-end example you can use the following commands

```sh
yarn install
projen && projen compile
# Define Amazon Timestream as fleetwise storage destination
npx cdk -a lib/integ.full.js deploy -c key_name=mykey
# Define Amazon S3 as fleetwise storage destination
npx cdk -a lib/integ.full.js deploy -c key_name=mykey -c use_s3=true
```

Where `mykey` is an existing keypair name present in your account.
The deploy takes about 15 mins mostly due to compilation of the IoT FleetWise agent in the
EC2 instance that simulate the vehicle. Once deploy is finshed, data will start to show up in your Timestream table.

## TODO

Warning: this construct should be considered at alpha stage and is not feature complete.

- Implement updates for all the custom resources
- Conditional campaigns

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This code is licensed under the MIT-0 License. See the LICENSE file.