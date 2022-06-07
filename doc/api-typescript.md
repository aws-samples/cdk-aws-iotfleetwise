# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Campaign <a name="Campaign" id="pahud-iot-demo.Campaign"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.Campaign.Initializer"></a>

```typescript
import { Campaign } from 'pahud-iot-demo'

new Campaign(scope: Construct, id: string, props: ICampaign)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.ICampaign">ICampaign</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.Campaign.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.Campaign.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.Campaign.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.ICampaign">ICampaign</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pahud-iot-demo.Campaign.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pahud-iot-demo.Campaign.isConstruct"></a>

```typescript
import { Campaign } from 'pahud-iot-demo'

Campaign.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.Campaign.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.Campaign.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.property.target">target</a></code> | <code><a href="#pahud-iot-demo.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.Campaign.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="pahud-iot-demo.Campaign.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.Campaign.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `target`<sup>Required</sup> <a name="target" id="pahud-iot-demo.Campaign.property.target"></a>

```typescript
public readonly target: Vehicle;
```

- *Type:* <a href="#pahud-iot-demo.Vehicle">Vehicle</a>

---


### SignalCatalog <a name="SignalCatalog" id="pahud-iot-demo.SignalCatalog"></a>

The Signal Catalog represents the list of all signals that you want to collect from all the vehicles.

The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalog.Initializer"></a>

```typescript
import { SignalCatalog } from 'pahud-iot-demo'

new SignalCatalog(scope: Construct, id: string, props: IServiceCatalogProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.IServiceCatalogProps">IServiceCatalogProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.SignalCatalog.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.SignalCatalog.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.SignalCatalog.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.IServiceCatalogProps">IServiceCatalogProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pahud-iot-demo.SignalCatalog.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pahud-iot-demo.SignalCatalog.isConstruct"></a>

```typescript
import { SignalCatalog } from 'pahud-iot-demo'

SignalCatalog.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.SignalCatalog.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.lambdaLayer">lambdaLayer</a></code> | <code>aws-cdk-lib.aws_lambda.LayerVersion</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.lambdaRole">lambdaRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.name">name</a></code> | <code>string</code> | The name of the signal catalog. |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.SignalCatalog.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="pahud-iot-demo.SignalCatalog.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `lambdaLayer`<sup>Required</sup> <a name="lambdaLayer" id="pahud-iot-demo.SignalCatalog.property.lambdaLayer"></a>

```typescript
public readonly lambdaLayer: LayerVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LayerVersion

---

##### `lambdaRole`<sup>Required</sup> <a name="lambdaRole" id="pahud-iot-demo.SignalCatalog.property.lambdaRole"></a>

```typescript
public readonly lambdaRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.SignalCatalog.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the signal catalog.

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.SignalCatalog.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---


### Vehicle <a name="Vehicle" id="pahud-iot-demo.Vehicle"></a>

The vehicle of a specific type from which IoT FleetWise collect signals.

#### Initializers <a name="Initializers" id="pahud-iot-demo.Vehicle.Initializer"></a>

```typescript
import { Vehicle } from 'pahud-iot-demo'

new Vehicle(scope: Construct, id: string, props: IVehicle)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.IVehicle">IVehicle</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.Vehicle.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.Vehicle.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.Vehicle.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.IVehicle">IVehicle</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pahud-iot-demo.Vehicle.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pahud-iot-demo.Vehicle.isConstruct"></a>

```typescript
import { Vehicle } from 'pahud-iot-demo'

Vehicle.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.Vehicle.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.Vehicle.property.arn">arn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.vehicleModel">vehicleModel</a></code> | <code><a href="#pahud-iot-demo.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.certificateArn">certificateArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.certificateId">certificateId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.certificatePem">certificatePem</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.endpointAddress">endpointAddress</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.privateKey">privateKey</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.Vehicle.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="pahud-iot-demo.Vehicle.property.arn"></a>

```typescript
public readonly arn: string;
```

- *Type:* string

---

##### `vehicleModel`<sup>Required</sup> <a name="vehicleModel" id="pahud-iot-demo.Vehicle.property.vehicleModel"></a>

```typescript
public readonly vehicleModel: VehicleModel;
```

- *Type:* <a href="#pahud-iot-demo.VehicleModel">VehicleModel</a>

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="pahud-iot-demo.Vehicle.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

---

##### `certificateId`<sup>Optional</sup> <a name="certificateId" id="pahud-iot-demo.Vehicle.property.certificateId"></a>

```typescript
public readonly certificateId: string;
```

- *Type:* string

---

##### `certificatePem`<sup>Optional</sup> <a name="certificatePem" id="pahud-iot-demo.Vehicle.property.certificatePem"></a>

```typescript
public readonly certificatePem: string;
```

- *Type:* string

---

##### `endpointAddress`<sup>Optional</sup> <a name="endpointAddress" id="pahud-iot-demo.Vehicle.property.endpointAddress"></a>

```typescript
public readonly endpointAddress: string;
```

- *Type:* string

---

##### `privateKey`<sup>Optional</sup> <a name="privateKey" id="pahud-iot-demo.Vehicle.property.privateKey"></a>

```typescript
public readonly privateKey: string;
```

- *Type:* string

---


### VehicleModel <a name="VehicleModel" id="pahud-iot-demo.VehicleModel"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.VehicleModel.Initializer"></a>

```typescript
import { VehicleModel } from 'pahud-iot-demo'

new VehicleModel(scope: Construct, id: string, props: IVehicleModel)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.IVehicleModel">IVehicleModel</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.VehicleModel.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.VehicleModel.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.VehicleModel.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.IVehicleModel">IVehicleModel</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="pahud-iot-demo.VehicleModel.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="pahud-iot-demo.VehicleModel.isConstruct"></a>

```typescript
import { VehicleModel } from 'pahud-iot-demo'

VehicleModel.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.VehicleModel.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.VehicleModel.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.property.signalCatalog">signalCatalog</a></code> | <code><a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.property.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.VehicleModel.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.VehicleModel.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `signalCatalog`<sup>Required</sup> <a name="signalCatalog" id="pahud-iot-demo.VehicleModel.property.signalCatalog"></a>

```typescript
public readonly signalCatalog: SignalCatalog;
```

- *Type:* <a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.VehicleModel.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---



## Classes <a name="Classes" id="Classes"></a>

### CampaignSignal <a name="CampaignSignal" id="pahud-iot-demo.CampaignSignal"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CampaignSignal.Initializer"></a>

```typescript
import { CampaignSignal } from 'pahud-iot-demo'

new CampaignSignal(name: string, maxSampleCount?: number, minimumSamplingInterval?: Duration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.CampaignSignal.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CampaignSignal.Initializer.parameter.maxSampleCount">maxSampleCount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CampaignSignal.Initializer.parameter.minimumSamplingInterval">minimumSamplingInterval</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.CampaignSignal.Initializer.parameter.name"></a>

- *Type:* string

---

##### `maxSampleCount`<sup>Optional</sup> <a name="maxSampleCount" id="pahud-iot-demo.CampaignSignal.Initializer.parameter.maxSampleCount"></a>

- *Type:* number

---

##### `minimumSamplingInterval`<sup>Optional</sup> <a name="minimumSamplingInterval" id="pahud-iot-demo.CampaignSignal.Initializer.parameter.minimumSamplingInterval"></a>

- *Type:* aws-cdk-lib.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CampaignSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.CampaignSignal.toObject"></a>

```typescript
public toObject(): object
```




### CanVehicleInterface <a name="CanVehicleInterface" id="pahud-iot-demo.CanVehicleInterface"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CanVehicleInterface.Initializer"></a>

```typescript
import { CanVehicleInterface } from 'pahud-iot-demo'

new CanVehicleInterface(interfaceId: string, name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleInterface.Initializer.parameter.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleInterface.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="pahud-iot-demo.CanVehicleInterface.Initializer.parameter.interfaceId"></a>

- *Type:* string

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.CanVehicleInterface.Initializer.parameter.name"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleInterface.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.CanVehicleInterface.toObject"></a>

```typescript
public toObject(): object
```




### CanVehicleSignal <a name="CanVehicleSignal" id="pahud-iot-demo.CanVehicleSignal"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CanVehicleSignal.Initializer"></a>

```typescript
import { CanVehicleSignal } from 'pahud-iot-demo'

new CanVehicleSignal(name: string, fullyQualifiedName: string, interfaceId: string, messageId: number, factor: number, isBigEndian: boolean, isSigned: boolean, length: number, offset: number, startBit: number)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.interfaceId">interfaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.messageId">messageId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.factor">factor</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isBigEndian">isBigEndian</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isSigned">isSigned</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.length">length</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.offset">offset</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.startBit">startBit</a></code> | <code>number</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.name"></a>

- *Type:* string

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* string

---

##### `interfaceId`<sup>Required</sup> <a name="interfaceId" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.interfaceId"></a>

- *Type:* string

---

##### `messageId`<sup>Required</sup> <a name="messageId" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.messageId"></a>

- *Type:* number

---

##### `factor`<sup>Required</sup> <a name="factor" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.factor"></a>

- *Type:* number

---

##### `isBigEndian`<sup>Required</sup> <a name="isBigEndian" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isBigEndian"></a>

- *Type:* boolean

---

##### `isSigned`<sup>Required</sup> <a name="isSigned" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isSigned"></a>

- *Type:* boolean

---

##### `length`<sup>Required</sup> <a name="length" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.length"></a>

- *Type:* number

---

##### `offset`<sup>Required</sup> <a name="offset" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.offset"></a>

- *Type:* number

---

##### `startBit`<sup>Required</sup> <a name="startBit" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.startBit"></a>

- *Type:* number

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.CanVehicleSignal.toObject"></a>

```typescript
public toObject(): object
```




### CollectionScheme <a name="CollectionScheme" id="pahud-iot-demo.CollectionScheme"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CollectionScheme.Initializer"></a>

```typescript
import { CollectionScheme } from 'pahud-iot-demo'

new CollectionScheme()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CollectionScheme.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.CollectionScheme.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogBranch <a name="SignalCatalogBranch" id="pahud-iot-demo.SignalCatalogBranch"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalogBranch.Initializer"></a>

```typescript
import { SignalCatalogBranch } from 'pahud-iot-demo'

new SignalCatalogBranch(name: string, fullyQualifiedName: string, description?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.name"></a>

- *Type:* string

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* string

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.description"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.SignalCatalogBranch.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogNode <a name="SignalCatalogNode" id="pahud-iot-demo.SignalCatalogNode"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalogNode.Initializer"></a>

```typescript
import { SignalCatalogNode } from 'pahud-iot-demo'

new SignalCatalogNode()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogNode.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.SignalCatalogNode.toObject"></a>

```typescript
public toObject(): object
```




### SignalCatalogSensor <a name="SignalCatalogSensor" id="pahud-iot-demo.SignalCatalogSensor"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalogSensor.Initializer"></a>

```typescript
import { SignalCatalogSensor } from 'pahud-iot-demo'

new SignalCatalogSensor(name: string, fullyQualifiedName: string, dataType: string, unit?: string, min?: number, max?: number, description?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName">fullyQualifiedName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.dataType">dataType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.unit">unit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.min">min</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.max">max</a></code> | <code>number</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.name"></a>

- *Type:* string

---

##### `fullyQualifiedName`<sup>Required</sup> <a name="fullyQualifiedName" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* string

---

##### `dataType`<sup>Required</sup> <a name="dataType" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.dataType"></a>

- *Type:* string

---

##### `unit`<sup>Optional</sup> <a name="unit" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.unit"></a>

- *Type:* string

---

##### `min`<sup>Optional</sup> <a name="min" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.min"></a>

- *Type:* number

---

##### `max`<sup>Optional</sup> <a name="max" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.max"></a>

- *Type:* number

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.description"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.SignalCatalogSensor.toObject"></a>

```typescript
public toObject(): object
```




### TimeBasedCollectionScheme <a name="TimeBasedCollectionScheme" id="pahud-iot-demo.TimeBasedCollectionScheme"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.TimeBasedCollectionScheme.Initializer"></a>

```typescript
import { TimeBasedCollectionScheme } from 'pahud-iot-demo'

new TimeBasedCollectionScheme(period: Duration)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.TimeBasedCollectionScheme.Initializer.parameter.period">period</a></code> | <code>aws-cdk-lib.Duration</code> | *No description.* |

---

##### `period`<sup>Required</sup> <a name="period" id="pahud-iot-demo.TimeBasedCollectionScheme.Initializer.parameter.period"></a>

- *Type:* aws-cdk-lib.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.TimeBasedCollectionScheme.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.TimeBasedCollectionScheme.toObject"></a>

```typescript
public toObject(): object
```




### VehicleInterface <a name="VehicleInterface" id="pahud-iot-demo.VehicleInterface"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.VehicleInterface.Initializer"></a>

```typescript
import { VehicleInterface } from 'pahud-iot-demo'

new VehicleInterface()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleInterface.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.VehicleInterface.toObject"></a>

```typescript
public toObject(): object
```




### VehicleSignal <a name="VehicleSignal" id="pahud-iot-demo.VehicleSignal"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.VehicleSignal.Initializer"></a>

```typescript
import { VehicleSignal } from 'pahud-iot-demo'

new VehicleSignal()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleSignal.toObject">toObject</a></code> | *No description.* |

---

##### `toObject` <a name="toObject" id="pahud-iot-demo.VehicleSignal.toObject"></a>

```typescript
public toObject(): object
```




## Protocols <a name="Protocols" id="Protocols"></a>

### ICampaign <a name="ICampaign" id="pahud-iot-demo.ICampaign"></a>

- *Implemented By:* <a href="#pahud-iot-demo.ICampaign">ICampaign</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.ICampaign.property.collectionScheme">collectionScheme</a></code> | <code><a href="#pahud-iot-demo.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.ICampaign.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.ICampaign.property.signals">signals</a></code> | <code><a href="#pahud-iot-demo.CampaignSignal">CampaignSignal</a>[]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.ICampaign.property.target">target</a></code> | <code><a href="#pahud-iot-demo.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `collectionScheme`<sup>Required</sup> <a name="collectionScheme" id="pahud-iot-demo.ICampaign.property.collectionScheme"></a>

```typescript
public readonly collectionScheme: CollectionScheme;
```

- *Type:* <a href="#pahud-iot-demo.CollectionScheme">CollectionScheme</a>

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.ICampaign.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `signals`<sup>Required</sup> <a name="signals" id="pahud-iot-demo.ICampaign.property.signals"></a>

```typescript
public readonly signals: CampaignSignal[];
```

- *Type:* <a href="#pahud-iot-demo.CampaignSignal">CampaignSignal</a>[]

---

##### `target`<sup>Required</sup> <a name="target" id="pahud-iot-demo.ICampaign.property.target"></a>

```typescript
public readonly target: Vehicle;
```

- *Type:* <a href="#pahud-iot-demo.Vehicle">Vehicle</a>

---

### IServiceCatalogProps <a name="IServiceCatalogProps" id="pahud-iot-demo.IServiceCatalogProps"></a>

- *Implemented By:* <a href="#pahud-iot-demo.IServiceCatalogProps">IServiceCatalogProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.database">database</a></code> | <code>aws-cdk-lib.aws_timestream.CfnDatabase</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.nodes">nodes</a></code> | <code><a href="#pahud-iot-demo.SignalCatalogNode">SignalCatalogNode</a>[]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.table">table</a></code> | <code>aws-cdk-lib.aws_timestream.CfnTable</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.description">description</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `database`<sup>Required</sup> <a name="database" id="pahud-iot-demo.IServiceCatalogProps.property.database"></a>

```typescript
public readonly database: CfnDatabase;
```

- *Type:* aws-cdk-lib.aws_timestream.CfnDatabase

---

##### `nodes`<sup>Required</sup> <a name="nodes" id="pahud-iot-demo.IServiceCatalogProps.property.nodes"></a>

```typescript
public readonly nodes: SignalCatalogNode[];
```

- *Type:* <a href="#pahud-iot-demo.SignalCatalogNode">SignalCatalogNode</a>[]

---

##### `role`<sup>Required</sup> <a name="role" id="pahud-iot-demo.IServiceCatalogProps.property.role"></a>

```typescript
public readonly role: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

---

##### `table`<sup>Required</sup> <a name="table" id="pahud-iot-demo.IServiceCatalogProps.property.table"></a>

```typescript
public readonly table: CfnTable;
```

- *Type:* aws-cdk-lib.aws_timestream.CfnTable

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.IServiceCatalogProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="pahud-iot-demo.IServiceCatalogProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

### IVehicle <a name="IVehicle" id="pahud-iot-demo.IVehicle"></a>

- *Implemented By:* <a href="#pahud-iot-demo.IVehicle">IVehicle</a>

Interface.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.IVehicle.property.createIotThing">createIotThing</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicle.property.vehicleId">vehicleId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicle.property.vehicleModel">vehicleModel</a></code> | <code><a href="#pahud-iot-demo.VehicleModel">VehicleModel</a></code> | *No description.* |

---

##### `createIotThing`<sup>Required</sup> <a name="createIotThing" id="pahud-iot-demo.IVehicle.property.createIotThing"></a>

```typescript
public readonly createIotThing: boolean;
```

- *Type:* boolean

---

##### `vehicleId`<sup>Required</sup> <a name="vehicleId" id="pahud-iot-demo.IVehicle.property.vehicleId"></a>

```typescript
public readonly vehicleId: string;
```

- *Type:* string

---

##### `vehicleModel`<sup>Required</sup> <a name="vehicleModel" id="pahud-iot-demo.IVehicle.property.vehicleModel"></a>

```typescript
public readonly vehicleModel: VehicleModel;
```

- *Type:* <a href="#pahud-iot-demo.VehicleModel">VehicleModel</a>

---

### IVehicleModel <a name="IVehicleModel" id="pahud-iot-demo.IVehicleModel"></a>

- *Implemented By:* <a href="#pahud-iot-demo.IVehicleModel">IVehicleModel</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.networkInterfaces">networkInterfaces</a></code> | <code><a href="#pahud-iot-demo.VehicleInterface">VehicleInterface</a>[]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.signalCatalog">signalCatalog</a></code> | <code><a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.signals">signals</a></code> | <code><a href="#pahud-iot-demo.VehicleSignal">VehicleSignal</a>[]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.IVehicleModel.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `networkInterfaces`<sup>Required</sup> <a name="networkInterfaces" id="pahud-iot-demo.IVehicleModel.property.networkInterfaces"></a>

```typescript
public readonly networkInterfaces: VehicleInterface[];
```

- *Type:* <a href="#pahud-iot-demo.VehicleInterface">VehicleInterface</a>[]

---

##### `signalCatalog`<sup>Required</sup> <a name="signalCatalog" id="pahud-iot-demo.IVehicleModel.property.signalCatalog"></a>

```typescript
public readonly signalCatalog: SignalCatalog;
```

- *Type:* <a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a>

---

##### `signals`<sup>Required</sup> <a name="signals" id="pahud-iot-demo.IVehicleModel.property.signals"></a>

```typescript
public readonly signals: VehicleSignal[];
```

- *Type:* <a href="#pahud-iot-demo.VehicleSignal">VehicleSignal</a>[]

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.IVehicleModel.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

