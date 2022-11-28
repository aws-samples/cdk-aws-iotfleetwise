# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Campaign <a name="Campaign" id="cdk-aws-iotfleetwise.Campaign"></a>

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
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.name">name</a></code> | <code>string</code> | The name of the signal catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.description">description</a></code> | <code>string</code> | *No description.* |

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

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalog.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the signal catalog.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalog.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

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

### CampaignProps <a name="CampaignProps" id="cdk-aws-iotfleetwise.CampaignProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CampaignProps.Initializer"></a>

```typescript
import { CampaignProps } from 'cdk-aws-iotfleetwise'

const campaignProps: CampaignProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.collectionScheme">collectionScheme</a></code> | <code><a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.signals">signals</a></code> | <code><a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.autoApprove">autoApprove</a></code> | <code>boolean</code> | *No description.* |

---

##### `collectionScheme`<sup>Required</sup> <a name="collectionScheme" id="cdk-aws-iotfleetwise.CampaignProps.property.collectionScheme"></a>

```typescript
public readonly collectionScheme: CollectionScheme;
```

- *Type:* <a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a>

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

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="cdk-aws-iotfleetwise.CampaignProps.property.autoApprove"></a>

```typescript
public readonly autoApprove: boolean;
```

- *Type:* boolean

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

### SignalCatalogProps <a name="SignalCatalogProps" id="cdk-aws-iotfleetwise.SignalCatalogProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogProps.Initializer"></a>

```typescript
import { SignalCatalogProps } from 'cdk-aws-iotfleetwise'

const signalCatalogProps: SignalCatalogProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.database">database</a></code> | <code>aws-cdk-lib.aws_timestream.CfnDatabase</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.nodes">nodes</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>[]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.table">table</a></code> | <code>aws-cdk-lib.aws_timestream.CfnTable</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `database`<sup>Required</sup> <a name="database" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.database"></a>

```typescript
public readonly database: CfnDatabase;
```

- *Type:* aws-cdk-lib.aws_timestream.CfnDatabase

---

##### `nodes`<sup>Required</sup> <a name="nodes" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.nodes"></a>

```typescript
public readonly nodes: SignalCatalogNode[];
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>[]

---

##### `table`<sup>Required</sup> <a name="table" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.table"></a>

```typescript
public readonly table: CfnTable;
```

- *Type:* aws-cdk-lib.aws_timestream.CfnTable

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.name"></a>

```typescript
public readonly name: string;
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

## Classes <a name="Classes" id="Classes"></a>

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

new CanVehicleInterface(interfaceId: string, name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.interfaceId"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.name"></a>

- *Type:* string

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

new CanVehicleSignal(fullyQualifiedName: string, interfaceId: string, messageId: number, factor: number, isBigEndian: boolean, isSigned: boolean, length: number, offset: number, startBit: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.messageId">messageId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.factor">factor</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isBigEndian">isBigEndian</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isSigned">isSigned</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.length">length</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.offset">offset</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.startBit">startBit</a></code> | <code>number</code> | *No description.* |

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* string

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.interfaceId"></a>

- *Type:* string

---

##### `messageId`<sup>Required</sup> <a name="messageId" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.messageId"></a>

- *Type:* number

---

##### `factor`<sup>Required</sup> <a name="factor" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.factor"></a>

- *Type:* number

---

##### `isBigEndian`<sup>Required</sup> <a name="isBigEndian" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isBigEndian"></a>

- *Type:* boolean

---

##### `isSigned`<sup>Required</sup> <a name="isSigned" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isSigned"></a>

- *Type:* boolean

---

##### `length`<sup>Required</sup> <a name="length" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.length"></a>

- *Type:* number

---

##### `offset`<sup>Required</sup> <a name="offset" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.offset"></a>

- *Type:* number

---

##### `startBit`<sup>Required</sup> <a name="startBit" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.startBit"></a>

- *Type:* number

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




### SignalCatalogBranch <a name="SignalCatalogBranch" id="cdk-aws-iotfleetwise.SignalCatalogBranch"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer"></a>

```typescript
import { SignalCatalogBranch } from 'cdk-aws-iotfleetwise'

new SignalCatalogBranch(fullyQualifiedName: string, description?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.description"></a>

- *Type:* string

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

new SignalCatalogSensor(fullyQualifiedName: string, dataType: string, unit?: string, min?: number, max?: number, description?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.dataType">dataType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.unit">unit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.min">min</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.max">max</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* string

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.dataType"></a>

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.unit"></a>

- *Type:* string

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.min"></a>

- *Type:* number

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.max"></a>

- *Type:* number

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.description"></a>

- *Type:* string

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





