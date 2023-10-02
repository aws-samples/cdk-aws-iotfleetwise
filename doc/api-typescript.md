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
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Campaign <a name="Campaign" id="cdk-aws-iotfleetwise.Campaign"></a>

export class Campaign extends Construct { readonly name: string = '';

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
  data_destination_configs: JSON.stringify(props.dataDestinationConfigs.map(s => s.toObject())),
  target_arn: this.target.arn,
  collection_scheme: JSON.stringify(props.collectionScheme.toObject()),
  signals_to_collect: JSON.stringify(props.signals.map(s => s.toObject())),
  auto_approve: props.autoApprove || false,
},
});
resource.node.addDependency(this.target);
}
}

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Campaign.Initializer"></a>

```typescript
import { Campaign } from 'cdk-aws-iotfleetwise'

new Campaign(scope: Construct, id: string, props: CampaignProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.CampaignProps">CampaignProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.CampaignProps">CampaignProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-aws-iotfleetwise.Campaign.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-aws-iotfleetwise.Campaign.isConstruct"></a>

```typescript
import { Campaign } from 'cdk-aws-iotfleetwise'

Campaign.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Campaign.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Campaign.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.Campaign.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.Campaign.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-aws-iotfleetwise.Campaign.property.target"></a>

```typescript
public readonly target: Vehicle;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>

---


### Fleet <a name="Fleet" id="cdk-aws-iotfleetwise.Fleet"></a>

The fleet of vehicles.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Fleet.Initializer"></a>

```typescript
import { Fleet } from 'cdk-aws-iotfleetwise'

new Fleet(scope: Construct, id: string, props: FleetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.FleetProps">FleetProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.FleetProps">FleetProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-aws-iotfleetwise.Fleet.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-aws-iotfleetwise.Fleet.isConstruct"></a>

```typescript
import { Fleet } from 'cdk-aws-iotfleetwise'

Fleet.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Fleet.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.fleetId">fleetId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.signalCatalog">signalCatalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.vehicles">vehicles</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Fleet.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.Fleet.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `fleetId`<sup>Required</sup> <a name="fleetId" id="cdk-aws-iotfleetwise.Fleet.property.fleetId"></a>

```typescript
public readonly fleetId: string;
```

- *Type:* string

---

##### `signalCatalog`<sup>Required</sup> <a name="signalCatalog" id="cdk-aws-iotfleetwise.Fleet.property.signalCatalog"></a>

```typescript
public readonly signalCatalog: SignalCatalog;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `vehicles`<sup>Optional</sup> <a name="vehicles" id="cdk-aws-iotfleetwise.Fleet.property.vehicles"></a>

```typescript
public readonly vehicles: Vehicle[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>[]

---


### Logging <a name="Logging" id="cdk-aws-iotfleetwise.Logging"></a>

Configures FleetWise logging to CloudWatch logs.

If enabled, this will ensure the log group is accessible,
or create a new one if it is not.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Logging.Initializer"></a>

```typescript
import { Logging } from 'cdk-aws-iotfleetwise'

new Logging(scope: Construct, id: string, props: LoggingProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.LoggingProps">LoggingProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.LoggingProps">LoggingProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-aws-iotfleetwise.Logging.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-aws-iotfleetwise.Logging.isConstruct"></a>

```typescript
import { Logging } from 'cdk-aws-iotfleetwise'

Logging.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Logging.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Logging.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### SignalCatalog <a name="SignalCatalog" id="cdk-aws-iotfleetwise.SignalCatalog"></a>

The Signal Catalog represents the list of all signals that you want to collect from all the vehicles.

The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer"></a>

```typescript
import { SignalCatalog } from 'cdk-aws-iotfleetwise'

new SignalCatalog(scope: Construct, id: string, props: SignalCatalogProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps">SignalCatalogProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogProps">SignalCatalogProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-aws-iotfleetwise.SignalCatalog.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-aws-iotfleetwise.SignalCatalog.isConstruct"></a>

```typescript
import { SignalCatalog } from 'cdk-aws-iotfleetwise'

SignalCatalog.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.SignalCatalog.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.name">name</a></code> | <code>string</code> | The name of the signal catalog. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.SignalCatalog.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.SignalCatalog.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `description`<sup>Required</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalog.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalog.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the signal catalog.

---


### Vehicle <a name="Vehicle" id="cdk-aws-iotfleetwise.Vehicle"></a>

The vehicle of a specific type from which IoT FleetWise collect signals.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Vehicle.Initializer"></a>

```typescript
import { Vehicle } from 'cdk-aws-iotfleetwise'

new Vehicle(scope: Construct, id: string, props: VehicleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleProps">VehicleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleProps">VehicleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-aws-iotfleetwise.Vehicle.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-aws-iotfleetwise.Vehicle.isConstruct"></a>

```typescript
import { Vehicle } from 'cdk-aws-iotfleetwise'

Vehicle.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Vehicle.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.vehicleModel">vehicleModel</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.vehicleName">vehicleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.certificateArn">certificateArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.certificateId">certificateId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.certificatePem">certificatePem</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.privateKey">privateKey</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Vehicle.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.Vehicle.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `vehicleModel`<sup>Required</sup> <a name="vehicleModel" id="cdk-aws-iotfleetwise.Vehicle.property.vehicleModel"></a>

```typescript
public readonly vehicleModel: VehicleModel;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a>

---

##### `vehicleName`<sup>Required</sup> <a name="vehicleName" id="cdk-aws-iotfleetwise.Vehicle.property.vehicleName"></a>

```typescript
public readonly vehicleName: string;
```

- *Type:* string

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="cdk-aws-iotfleetwise.Vehicle.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

---

##### `certificateId`<sup>Optional</sup> <a name="certificateId" id="cdk-aws-iotfleetwise.Vehicle.property.certificateId"></a>

```typescript
public readonly certificateId: string;
```

- *Type:* string

---

##### `certificatePem`<sup>Optional</sup> <a name="certificatePem" id="cdk-aws-iotfleetwise.Vehicle.property.certificatePem"></a>

```typescript
public readonly certificatePem: string;
```

- *Type:* string

---

##### `endpointAddress`<sup>Optional</sup> <a name="endpointAddress" id="cdk-aws-iotfleetwise.Vehicle.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

---

##### `privateKey`<sup>Optional</sup> <a name="privateKey" id="cdk-aws-iotfleetwise.Vehicle.property.privateKey"></a>

```typescript
public readonly privateKey: string;
```

- *Type:* string

---


### VehicleModel <a name="VehicleModel" id="cdk-aws-iotfleetwise.VehicleModel"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.VehicleModel.Initializer"></a>

```typescript
import { VehicleModel } from 'cdk-aws-iotfleetwise'

new VehicleModel(scope: Construct, id: string, props: VehicleModelProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps">VehicleModelProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModelProps">VehicleModelProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-aws-iotfleetwise.VehicleModel.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-aws-iotfleetwise.VehicleModel.isConstruct"></a>

```typescript
import { VehicleModel } from 'cdk-aws-iotfleetwise'

VehicleModel.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.VehicleModel.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.signalCatalog">signalCatalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.VehicleModel.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.VehicleModel.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `signalCatalog`<sup>Required</sup> <a name="signalCatalog" id="cdk-aws-iotfleetwise.VehicleModel.property.signalCatalog"></a>

```typescript
public readonly signalCatalog: SignalCatalog;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---


## Structs <a name="Structs" id="Structs"></a>

### AttributeVehicleSignalProps <a name="AttributeVehicleSignalProps" id="cdk-aws-iotfleetwise.AttributeVehicleSignalProps"></a>

Attribute Signal - needed when creating a vehicle with attributes.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.AttributeVehicleSignalProps.Initializer"></a>

```typescript
import { AttributeVehicleSignalProps } from 'cdk-aws-iotfleetwise'

const attributeVehicleSignalProps: AttributeVehicleSignalProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignalProps.property.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.AttributeVehicleSignalProps.property.fullyQualifiedName"></a>

```typescript
public readonly fullyQualifiedName: string;
```

- *Type:* string

---

### CampaignProps <a name="CampaignProps" id="cdk-aws-iotfleetwise.CampaignProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CampaignProps.Initializer"></a>

```typescript
import { CampaignProps } from 'cdk-aws-iotfleetwise'

const campaignProps: CampaignProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.campaignS3arn">campaignS3arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.collectionScheme">collectionScheme</a></code> | <code><a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.fwTimestreamRole">fwTimestreamRole</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.signals">signals</a></code> | <code><a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.timestreamArn">timestreamArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.autoApprove">autoApprove</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.useS3">useS3</a></code> | <code>boolean</code> | *No description.* |

---

##### `campaignS3arn`<sup>Required</sup> <a name="campaignS3arn" id="cdk-aws-iotfleetwise.CampaignProps.property.campaignS3arn"></a>

```typescript
public readonly campaignS3arn: string;
```

- *Type:* string

---

##### `collectionScheme`<sup>Required</sup> <a name="collectionScheme" id="cdk-aws-iotfleetwise.CampaignProps.property.collectionScheme"></a>

```typescript
public readonly collectionScheme: CollectionScheme;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a>

---

##### `fwTimestreamRole`<sup>Required</sup> <a name="fwTimestreamRole" id="cdk-aws-iotfleetwise.CampaignProps.property.fwTimestreamRole"></a>

```typescript
public readonly fwTimestreamRole: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CampaignProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `signals`<sup>Required</sup> <a name="signals" id="cdk-aws-iotfleetwise.CampaignProps.property.signals"></a>

```typescript
public readonly signals: CampaignSignal[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>[]

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-aws-iotfleetwise.CampaignProps.property.target"></a>

```typescript
public readonly target: Vehicle;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>

---

##### `timestreamArn`<sup>Required</sup> <a name="timestreamArn" id="cdk-aws-iotfleetwise.CampaignProps.property.timestreamArn"></a>

```typescript
public readonly timestreamArn: string;
```

- *Type:* string

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="cdk-aws-iotfleetwise.CampaignProps.property.autoApprove"></a>

```typescript
public readonly autoApprove: boolean;
```

- *Type:* boolean

---

##### `useS3`<sup>Optional</sup> <a name="useS3" id="cdk-aws-iotfleetwise.CampaignProps.property.useS3"></a>

```typescript
public readonly useS3: boolean;
```

- *Type:* boolean

---

### CanVehicleInterfaceProps <a name="CanVehicleInterfaceProps" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.Initializer"></a>

```typescript
import { CanVehicleInterfaceProps } from 'cdk-aws-iotfleetwise'

const canVehicleInterfaceProps: CanVehicleInterfaceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolName">protocolName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolVersion">protocolVersion</a></code> | <code>string</code> | *No description.* |

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.interfaceId"></a>

```typescript
public readonly interfaceId: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `protocolName`<sup>Optional</sup> <a name="protocolName" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolName"></a>

```typescript
public readonly protocolName: string;
```

- *Type:* string

---

##### `protocolVersion`<sup>Optional</sup> <a name="protocolVersion" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolVersion"></a>

```typescript
public readonly protocolVersion: string;
```

- *Type:* string

---

### CanVehicleSignalProps <a name="CanVehicleSignalProps" id="cdk-aws-iotfleetwise.CanVehicleSignalProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.Initializer"></a>

```typescript
import { CanVehicleSignalProps } from 'cdk-aws-iotfleetwise'

const canVehicleSignalProps: CanVehicleSignalProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.factor">factor</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isBigEndian">isBigEndian</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isSigned">isSigned</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.length">length</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.messageId">messageId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.offset">offset</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.startBit">startBit</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `factor`<sup>Required</sup> <a name="factor" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.factor"></a>

```typescript
public readonly factor: number;
```

- *Type:* number

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.fullyQualifiedName"></a>

```typescript
public readonly fullyQualifiedName: string;
```

- *Type:* string

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.interfaceId"></a>

```typescript
public readonly interfaceId: string;
```

- *Type:* string

---

##### `isBigEndian`<sup>Required</sup> <a name="isBigEndian" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isBigEndian"></a>

```typescript
public readonly isBigEndian: boolean;
```

- *Type:* boolean

---

##### `isSigned`<sup>Required</sup> <a name="isSigned" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isSigned"></a>

```typescript
public readonly isSigned: boolean;
```

- *Type:* boolean

---

##### `length`<sup>Required</sup> <a name="length" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.length"></a>

```typescript
public readonly length: number;
```

- *Type:* number

---

##### `messageId`<sup>Required</sup> <a name="messageId" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.messageId"></a>

```typescript
public readonly messageId: number;
```

- *Type:* number

---

##### `offset`<sup>Required</sup> <a name="offset" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.offset"></a>

```typescript
public readonly offset: number;
```

- *Type:* number

---

##### `startBit`<sup>Required</sup> <a name="startBit" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.startBit"></a>

```typescript
public readonly startBit: number;
```

- *Type:* number

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

### FleetProps <a name="FleetProps" id="cdk-aws-iotfleetwise.FleetProps"></a>

Interface.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.FleetProps.Initializer"></a>

```typescript
import { FleetProps } from 'cdk-aws-iotfleetwise'

const fleetProps: FleetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.fleetId">fleetId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.signalCatalog">signalCatalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.vehicles">vehicles</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>[]</code> | *No description.* |

---

##### `fleetId`<sup>Required</sup> <a name="fleetId" id="cdk-aws-iotfleetwise.FleetProps.property.fleetId"></a>

```typescript
public readonly fleetId: string;
```

- *Type:* string

---

##### `signalCatalog`<sup>Required</sup> <a name="signalCatalog" id="cdk-aws-iotfleetwise.FleetProps.property.signalCatalog"></a>

```typescript
public readonly signalCatalog: SignalCatalog;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.FleetProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `vehicles`<sup>Optional</sup> <a name="vehicles" id="cdk-aws-iotfleetwise.FleetProps.property.vehicles"></a>

```typescript
public readonly vehicles: Vehicle[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>[]

---

### LoggingProps <a name="LoggingProps" id="cdk-aws-iotfleetwise.LoggingProps"></a>

FleetWise Logging Properties.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.LoggingProps.Initializer"></a>

```typescript
import { LoggingProps } from 'cdk-aws-iotfleetwise'

const loggingProps: LoggingProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.LoggingProps.property.enableLogging">enableLogging</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.LoggingProps.property.logGroupName">logGroupName</a></code> | <code>string</code> | Name of log group to configure. |
| <code><a href="#cdk-aws-iotfleetwise.LoggingProps.property.keepLogGroup">keepLogGroup</a></code> | <code>boolean</code> | *No description.* |

---

##### `enableLogging`<sup>Required</sup> <a name="enableLogging" id="cdk-aws-iotfleetwise.LoggingProps.property.enableLogging"></a>

```typescript
public readonly enableLogging: string;
```

- *Type:* string

---

##### `logGroupName`<sup>Required</sup> <a name="logGroupName" id="cdk-aws-iotfleetwise.LoggingProps.property.logGroupName"></a>

```typescript
public readonly logGroupName: string;
```

- *Type:* string

Name of log group to configure.

This can be either single name
such as `AWSIoTFleetWiseLogs` or a fully pathed entry such as:
`/iot/FleetWiseLogs`

---

##### `keepLogGroup`<sup>Optional</sup> <a name="keepLogGroup" id="cdk-aws-iotfleetwise.LoggingProps.property.keepLogGroup"></a>

```typescript
public readonly keepLogGroup: boolean;
```

- *Type:* boolean

---

### SignalCatalogActuatorProps <a name="SignalCatalogActuatorProps" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.Initializer"></a>

```typescript
import { SignalCatalogActuatorProps } from 'cdk-aws-iotfleetwise'

const signalCatalogActuatorProps: SignalCatalogActuatorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.dataType">dataType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.allowedValues">allowedValues</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.assignedValue">assignedValue</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.max">max</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.min">min</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.unit">unit</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.dataType"></a>

```typescript
public readonly dataType: string;
```

- *Type:* string

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.fullyQualifiedName"></a>

```typescript
public readonly fullyQualifiedName: string;
```

- *Type:* string

---

##### `allowedValues`<sup>Optional</sup> <a name="allowedValues" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.allowedValues"></a>

```typescript
public readonly allowedValues: string[];
```

- *Type:* string[]

---

##### `assignedValue`<sup>Optional</sup> <a name="assignedValue" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.assignedValue"></a>

```typescript
public readonly assignedValue: string;
```

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.max"></a>

```typescript
public readonly max: number;
```

- *Type:* number

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.min"></a>

```typescript
public readonly min: number;
```

- *Type:* number

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

### SignalCatalogAttributeProps <a name="SignalCatalogAttributeProps" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.Initializer"></a>

```typescript
import { SignalCatalogAttributeProps } from 'cdk-aws-iotfleetwise'

const signalCatalogAttributeProps: SignalCatalogAttributeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.dataType">dataType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.allowedValues">allowedValues</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.assignedValue">assignedValue</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.defaultValue">defaultValue</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.max">max</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.min">min</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.unit">unit</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.dataType"></a>

```typescript
public readonly dataType: string;
```

- *Type:* string

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.fullyQualifiedName"></a>

```typescript
public readonly fullyQualifiedName: string;
```

- *Type:* string

---

##### `allowedValues`<sup>Optional</sup> <a name="allowedValues" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.allowedValues"></a>

```typescript
public readonly allowedValues: string[];
```

- *Type:* string[]

---

##### `assignedValue`<sup>Optional</sup> <a name="assignedValue" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.assignedValue"></a>

```typescript
public readonly assignedValue: string;
```

- *Type:* string

---

##### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.defaultValue"></a>

```typescript
public readonly defaultValue: string;
```

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.max"></a>

```typescript
public readonly max: number;
```

- *Type:* number

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.min"></a>

```typescript
public readonly min: number;
```

- *Type:* number

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

### SignalCatalogBranchProps <a name="SignalCatalogBranchProps" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps.Initializer"></a>

```typescript
import { SignalCatalogBranchProps } from 'cdk-aws-iotfleetwise'

const signalCatalogBranchProps: SignalCatalogBranchProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.fullyQualifiedName"></a>

```typescript
public readonly fullyQualifiedName: string;
```

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

### SignalCatalogProps <a name="SignalCatalogProps" id="cdk-aws-iotfleetwise.SignalCatalogProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogProps.Initializer"></a>

```typescript
import { SignalCatalogProps } from 'cdk-aws-iotfleetwise'

const signalCatalogProps: SignalCatalogProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.deregister">deregister</a></code> | <code>boolean</code> | Deregister FleetWise on stack deletion. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.description">description</a></code> | <code>string</code> | Description of the Signal Catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.name">name</a></code> | <code>string</code> | Name of the Signal Catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.nodes">nodes</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>[]</code> | An array of signal nodes. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.vssFile">vssFile</a></code> | <code>string</code> | A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be appended after any `SignalCatalogNode` objects provided. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.vssGeneratePrefixBranch">vssGeneratePrefixBranch</a></code> | <code>boolean</code> | If set to true, this will parse the vssPrefix into branch nodes. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.vssPrefix">vssPrefix</a></code> | <code>string</code> | A prefix to prepend to the fully qualified names found in the VSS file. |

---

##### `deregister`<sup>Optional</sup> <a name="deregister" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.deregister"></a>

```typescript
public readonly deregister: boolean;
```

- *Type:* boolean
- *Default:* false

Deregister FleetWise on stack deletion.

If set to 'true',  FleetWise will be deregistered from the Timestream
destination.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* None

Description of the Signal Catalog.

If not provided no description is set.

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* default

Name of the Signal Catalog.

If not provided, default value is used.

---

##### `nodes`<sup>Optional</sup> <a name="nodes" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.nodes"></a>

```typescript
public readonly nodes: SignalCatalogNode[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>[]
- *Default:* []

An array of signal nodes.

Nodes are a general abstraction of a signal.
A node can be specified as an actuator, attribute, branch, or sensor. See `SignalCatalogBranch`,
`SignalCatalogSensor`, `SignalCatalogActuator`, or `SignalCatalogAttribute` for creating nodes.

---

##### `vssFile`<sup>Optional</sup> <a name="vssFile" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.vssFile"></a>

```typescript
public readonly vssFile: string;
```

- *Type:* string
- *Default:* None

A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be appended after any `SignalCatalogNode` objects provided.

---

##### `vssGeneratePrefixBranch`<sup>Optional</sup> <a name="vssGeneratePrefixBranch" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.vssGeneratePrefixBranch"></a>

```typescript
public readonly vssGeneratePrefixBranch: boolean;
```

- *Type:* boolean
- *Default:* true

If set to true, this will parse the vssPrefix into branch nodes.

For instance if `OBD.MyData` was
provided,  the `OBD.MyData` will be parsed into branch nodes of `OBD` and `OBD.MyData`. By default
this is set to true. If you define branches in another way such as via `SignalCatalogNode`, set this
to false to suppress creation of branch nodes.

---

##### `vssPrefix`<sup>Optional</sup> <a name="vssPrefix" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.vssPrefix"></a>

```typescript
public readonly vssPrefix: string;
```

- *Type:* string
- *Default:* None

A prefix to prepend to the fully qualified names found in the VSS file.

The format of the prefix
is in dotted notation, and will be the prepended to all signal names.

For instance, with the prefix of `OBD.MyData` and signal names of `PidA` and `PidB` will be combined
to create `OBD.MyData.PidA` and `OBD.MyData.PidB`.

---

### SignalCatalogSensorProps <a name="SignalCatalogSensorProps" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.Initializer"></a>

```typescript
import { SignalCatalogSensorProps } from 'cdk-aws-iotfleetwise'

const signalCatalogSensorProps: SignalCatalogSensorProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.dataType">dataType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.allowedValues">allowedValues</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.max">max</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.min">min</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.unit">unit</a></code> | <code>string</code> | *No description.* |

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.dataType"></a>

```typescript
public readonly dataType: string;
```

- *Type:* string

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.fullyQualifiedName"></a>

```typescript
public readonly fullyQualifiedName: string;
```

- *Type:* string

---

##### `allowedValues`<sup>Optional</sup> <a name="allowedValues" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.allowedValues"></a>

```typescript
public readonly allowedValues: string[];
```

- *Type:* string[]

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.max"></a>

```typescript
public readonly max: number;
```

- *Type:* number

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.min"></a>

```typescript
public readonly min: number;
```

- *Type:* number

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.unit"></a>

```typescript
public readonly unit: string;
```

- *Type:* string

---

### VehicleModelProps <a name="VehicleModelProps" id="cdk-aws-iotfleetwise.VehicleModelProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.VehicleModelProps.Initializer"></a>

```typescript
import { VehicleModelProps } from 'cdk-aws-iotfleetwise'

const vehicleModelProps: VehicleModelProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.networkInterfaces">networkInterfaces</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.signalCatalog">signalCatalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.networkFileDefinitions">networkFileDefinitions</a></code> | <code><a href="#cdk-aws-iotfleetwise.NetworkFileDefinition">NetworkFileDefinition</a>[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.signals">signals</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.VehicleModelProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `networkInterfaces`<sup>Required</sup> <a name="networkInterfaces" id="cdk-aws-iotfleetwise.VehicleModelProps.property.networkInterfaces"></a>

```typescript
public readonly networkInterfaces: VehicleInterface[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>[]

---

##### `signalCatalog`<sup>Required</sup> <a name="signalCatalog" id="cdk-aws-iotfleetwise.VehicleModelProps.property.signalCatalog"></a>

```typescript
public readonly signalCatalog: SignalCatalog;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.VehicleModelProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `networkFileDefinitions`<sup>Optional</sup> <a name="networkFileDefinitions" id="cdk-aws-iotfleetwise.VehicleModelProps.property.networkFileDefinitions"></a>

```typescript
public readonly networkFileDefinitions: NetworkFileDefinition[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.NetworkFileDefinition">NetworkFileDefinition</a>[]

---

##### `signals`<sup>Optional</sup> <a name="signals" id="cdk-aws-iotfleetwise.VehicleModelProps.property.signals"></a>

```typescript
public readonly signals: VehicleSignal[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>[]

---

### VehicleProps <a name="VehicleProps" id="cdk-aws-iotfleetwise.VehicleProps"></a>

Interface.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.VehicleProps.Initializer"></a>

```typescript
import { VehicleProps } from 'cdk-aws-iotfleetwise'

const vehicleProps: VehicleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.createIotThing">createIotThing</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.vehicleModel">vehicleModel</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.vehicleName">vehicleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.attributes">attributes</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `createIotThing`<sup>Required</sup> <a name="createIotThing" id="cdk-aws-iotfleetwise.VehicleProps.property.createIotThing"></a>

```typescript
public readonly createIotThing: boolean;
```

- *Type:* boolean

---

##### `vehicleModel`<sup>Required</sup> <a name="vehicleModel" id="cdk-aws-iotfleetwise.VehicleProps.property.vehicleModel"></a>

```typescript
public readonly vehicleModel: VehicleModel;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a>

---

##### `vehicleName`<sup>Required</sup> <a name="vehicleName" id="cdk-aws-iotfleetwise.VehicleProps.property.vehicleName"></a>

```typescript
public readonly vehicleName: string;
```

- *Type:* string

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="cdk-aws-iotfleetwise.VehicleProps.property.attributes"></a>

```typescript
public readonly attributes: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

## Classes <a name="Classes" id="Classes"></a>

### AttributeVehicleSignal <a name="AttributeVehicleSignal" id="cdk-aws-iotfleetwise.AttributeVehicleSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.AttributeVehicleSignal.Initializer"></a>

```typescript
import { AttributeVehicleSignal } from 'cdk-aws-iotfleetwise'

new AttributeVehicleSignal(props: AttributeVehicleSignalProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignal.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignalProps">AttributeVehicleSignalProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.AttributeVehicleSignal.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.AttributeVehicleSignalProps">AttributeVehicleSignalProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.AttributeVehicleSignal.toObject"></a>

```typescript
public toObject(): object
```




### CampaignSignal <a name="CampaignSignal" id="cdk-aws-iotfleetwise.CampaignSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer"></a>

```typescript
import { CampaignSignal } from 'cdk-aws-iotfleetwise'

new CampaignSignal(name: string, maxSampleCount?: number, minimumSamplingInterval?: Duration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.maxSampleCount">maxSampleCount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.minimumSamplingInterval">minimumSamplingInterval</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.name"></a>

- *Type:* string

---

##### `maxSampleCount`<sup>Optional</sup> <a name="maxSampleCount" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.maxSampleCount"></a>

- *Type:* number

---

##### `minimumSamplingInterval`<sup>Optional</sup> <a name="minimumSamplingInterval" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.minimumSamplingInterval"></a>

- *Type:* aws-cdk-lib.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.CampaignSignal.toObject"></a>

```typescript
public toObject(): object
```




### CanDefinition <a name="CanDefinition" id="cdk-aws-iotfleetwise.CanDefinition"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanDefinition.Initializer"></a>

```typescript
import { CanDefinition } from 'cdk-aws-iotfleetwise'

new CanDefinition(networkInterface: string, signalsMap: {[ key: string ]: string}, canDbcFiles: string[])
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.networkInterface">networkInterface</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.signalsMap">signalsMap</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.canDbcFiles">canDbcFiles</a></code> | <code>string[]</code> | *No description.* |

---

##### `networkInterface`<sup>Required</sup> <a name="networkInterface" id="cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.networkInterface"></a>

- *Type:* string

---

##### `signalsMap`<sup>Required</sup> <a name="signalsMap" id="cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.signalsMap"></a>

- *Type:* {[ key: string ]: string}

---

##### `canDbcFiles`<sup>Required</sup> <a name="canDbcFiles" id="cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.canDbcFiles"></a>

- *Type:* string[]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.CanDefinition.toObject"></a>

```typescript
public toObject(): object
```




### CanVehicleInterface <a name="CanVehicleInterface" id="cdk-aws-iotfleetwise.CanVehicleInterface"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer"></a>

```typescript
import { CanVehicleInterface } from 'cdk-aws-iotfleetwise'

new CanVehicleInterface(props: CanVehicleInterfaceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps">CanVehicleInterfaceProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps">CanVehicleInterfaceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.CanVehicleInterface.toObject"></a>

```typescript
public toObject(): object
```




### CanVehicleSignal <a name="CanVehicleSignal" id="cdk-aws-iotfleetwise.CanVehicleSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer"></a>

```typescript
import { CanVehicleSignal } from 'cdk-aws-iotfleetwise'

new CanVehicleSignal(props: CanVehicleSignalProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps">CanVehicleSignalProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps">CanVehicleSignalProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.CanVehicleSignal.toObject"></a>

```typescript
public toObject(): object
```




### CollectionScheme <a name="CollectionScheme" id="cdk-aws-iotfleetwise.CollectionScheme"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CollectionScheme.Initializer"></a>

```typescript
import { CollectionScheme } from 'cdk-aws-iotfleetwise'

new CollectionScheme()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CollectionScheme.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.CollectionScheme.toObject"></a>

```typescript
public toObject(): object
```




### NetworkFileDefinition <a name="NetworkFileDefinition" id="cdk-aws-iotfleetwise.NetworkFileDefinition"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.NetworkFileDefinition.Initializer"></a>

```typescript
import { NetworkFileDefinition } from 'cdk-aws-iotfleetwise'

new NetworkFileDefinition()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.NetworkFileDefinition.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.NetworkFileDefinition.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogActuator <a name="SignalCatalogActuator" id="cdk-aws-iotfleetwise.SignalCatalogActuator"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer"></a>

```typescript
import { SignalCatalogActuator } from 'cdk-aws-iotfleetwise'

new SignalCatalogActuator(props: SignalCatalogActuatorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps">SignalCatalogActuatorProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps">SignalCatalogActuatorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.SignalCatalogActuator.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogAttribute <a name="SignalCatalogAttribute" id="cdk-aws-iotfleetwise.SignalCatalogAttribute"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer"></a>

```typescript
import { SignalCatalogAttribute } from 'cdk-aws-iotfleetwise'

new SignalCatalogAttribute(props: SignalCatalogAttributeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps">SignalCatalogAttributeProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps">SignalCatalogAttributeProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogBranch <a name="SignalCatalogBranch" id="cdk-aws-iotfleetwise.SignalCatalogBranch"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer"></a>

```typescript
import { SignalCatalogBranch } from 'cdk-aws-iotfleetwise'

new SignalCatalogBranch(props: SignalCatalogBranchProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranchProps">SignalCatalogBranchProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogBranchProps">SignalCatalogBranchProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.SignalCatalogBranch.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogNode <a name="SignalCatalogNode" id="cdk-aws-iotfleetwise.SignalCatalogNode"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogNode.Initializer"></a>

```typescript
import { SignalCatalogNode } from 'cdk-aws-iotfleetwise'

new SignalCatalogNode()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogNode.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.SignalCatalogNode.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogSensor <a name="SignalCatalogSensor" id="cdk-aws-iotfleetwise.SignalCatalogSensor"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer"></a>

```typescript
import { SignalCatalogSensor } from 'cdk-aws-iotfleetwise'

new SignalCatalogSensor(props: SignalCatalogSensorProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps">SignalCatalogSensorProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps">SignalCatalogSensorProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.SignalCatalogSensor.toObject"></a>

```typescript
public toObject(): object
```




### TimeBasedCollectionScheme <a name="TimeBasedCollectionScheme" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme.Initializer"></a>

```typescript
import { TimeBasedCollectionScheme } from 'cdk-aws-iotfleetwise'

new TimeBasedCollectionScheme(period: Duration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.TimeBasedCollectionScheme.Initializer.parameter.period">period</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `period`<sup>Required</sup> <a name="period" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme.Initializer.parameter.period"></a>

- *Type:* aws-cdk-lib.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.TimeBasedCollectionScheme.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme.toObject"></a>

```typescript
public toObject(): object
```




### VehicleInterface <a name="VehicleInterface" id="cdk-aws-iotfleetwise.VehicleInterface"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.VehicleInterface.Initializer"></a>

```typescript
import { VehicleInterface } from 'cdk-aws-iotfleetwise'

new VehicleInterface()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleInterface.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.VehicleInterface.toObject"></a>

```typescript
public toObject(): object
```




### VehicleSignal <a name="VehicleSignal" id="cdk-aws-iotfleetwise.VehicleSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.VehicleSignal.Initializer"></a>

```typescript
import { VehicleSignal } from 'cdk-aws-iotfleetwise'

new VehicleSignal()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="cdk-aws-iotfleetwise.VehicleSignal.toObject"></a>

```typescript
public toObject(): object
```





