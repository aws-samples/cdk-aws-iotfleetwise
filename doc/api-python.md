# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Campaign <a name="Campaign" id="cdk-aws-iotfleetwise.Campaign"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Campaign.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.Campaign(
  scope: Construct,
  id: str,
  props: ICampaign
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.ICampaign">ICampaign</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.ICampaign">ICampaign</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="cdk-aws-iotfleetwise.Campaign.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="cdk-aws-iotfleetwise.Campaign.isConstruct"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.Campaign.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Campaign.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.property.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Campaign.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.Campaign.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.Campaign.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-aws-iotfleetwise.Campaign.property.target"></a>

```python
target: Vehicle
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>

---


### SignalCatalog <a name="SignalCatalog" id="cdk-aws-iotfleetwise.SignalCatalog"></a>

The Signal Catalog represents the list of all signals that you want to collect from all the vehicles.

The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.SignalCatalog(
  scope: Construct,
  id: str,
  props: IServiceCatalogProps
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps">IServiceCatalogProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.IServiceCatalogProps">IServiceCatalogProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="cdk-aws-iotfleetwise.SignalCatalog.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="cdk-aws-iotfleetwise.SignalCatalog.isConstruct"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.SignalCatalog.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.SignalCatalog.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.lambdaLayer">lambda_layer</a></code> | <code>aws_cdk.aws_lambda.LayerVersion</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.lambdaRole">lambda_role</a></code> | <code>aws_cdk.aws_iam.Role</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.name">name</a></code> | <code>str</code> | The name of the signal catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.SignalCatalog.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.SignalCatalog.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `lambda_layer`<sup>Required</sup> <a name="lambda_layer" id="cdk-aws-iotfleetwise.SignalCatalog.property.lambdaLayer"></a>

```python
lambda_layer: LayerVersion
```

- *Type:* aws_cdk.aws_lambda.LayerVersion

---

##### `lambda_role`<sup>Required</sup> <a name="lambda_role" id="cdk-aws-iotfleetwise.SignalCatalog.property.lambdaRole"></a>

```python
lambda_role: Role
```

- *Type:* aws_cdk.aws_iam.Role

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalog.property.name"></a>

```python
name: str
```

- *Type:* str

The name of the signal catalog.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalog.property.description"></a>

```python
description: str
```

- *Type:* str

---


### Vehicle <a name="Vehicle" id="cdk-aws-iotfleetwise.Vehicle"></a>

The vehicle of a specific type from which IoT FleetWise collect signals.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Vehicle.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.Vehicle(
  scope: Construct,
  id: str,
  props: IVehicle
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.IVehicle">IVehicle</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.IVehicle">IVehicle</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="cdk-aws-iotfleetwise.Vehicle.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="cdk-aws-iotfleetwise.Vehicle.isConstruct"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.Vehicle.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Vehicle.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.vehicleModel">vehicle_model</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.certificateArn">certificate_arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.certificateId">certificate_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.certificatePem">certificate_pem</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.endpointAddress">endpoint_address</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.privateKey">private_key</a></code> | <code>str</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Vehicle.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.Vehicle.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `vehicle_model`<sup>Required</sup> <a name="vehicle_model" id="cdk-aws-iotfleetwise.Vehicle.property.vehicleModel"></a>

```python
vehicle_model: VehicleModel
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a>

---

##### `certificate_arn`<sup>Optional</sup> <a name="certificate_arn" id="cdk-aws-iotfleetwise.Vehicle.property.certificateArn"></a>

```python
certificate_arn: str
```

- *Type:* str

---

##### `certificate_id`<sup>Optional</sup> <a name="certificate_id" id="cdk-aws-iotfleetwise.Vehicle.property.certificateId"></a>

```python
certificate_id: str
```

- *Type:* str

---

##### `certificate_pem`<sup>Optional</sup> <a name="certificate_pem" id="cdk-aws-iotfleetwise.Vehicle.property.certificatePem"></a>

```python
certificate_pem: str
```

- *Type:* str

---

##### `endpoint_address`<sup>Optional</sup> <a name="endpoint_address" id="cdk-aws-iotfleetwise.Vehicle.property.endpointAddress"></a>

```python
endpoint_address: str
```

- *Type:* str

---

##### `private_key`<sup>Optional</sup> <a name="private_key" id="cdk-aws-iotfleetwise.Vehicle.property.privateKey"></a>

```python
private_key: str
```

- *Type:* str

---


### VehicleModel <a name="VehicleModel" id="cdk-aws-iotfleetwise.VehicleModel"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.VehicleModel.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.VehicleModel(
  scope: Construct,
  id: str,
  props: IVehicleModel
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-aws-iotfleetwise.IVehicleModel">IVehicleModel</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.IVehicleModel">IVehicleModel</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="cdk-aws-iotfleetwise.VehicleModel.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="cdk-aws-iotfleetwise.VehicleModel.isConstruct"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.VehicleModel.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.VehicleModel.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.VehicleModel.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.VehicleModel.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.VehicleModel.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.VehicleModel.property.description"></a>

```python
description: str
```

- *Type:* str

---



## Classes <a name="Classes" id="Classes"></a>

### CampaignSignal <a name="CampaignSignal" id="cdk-aws-iotfleetwise.CampaignSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.CampaignSignal(
  name: str,
  max_sample_count: typing.Union[int, float] = None,
  minimum_sampling_interval: Duration = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.maxSampleCount">max_sample_count</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.minimumSamplingInterval">minimum_sampling_interval</a></code> | <code>aws_cdk.Duration</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.name"></a>

- *Type:* str

---

##### `max_sample_count`<sup>Optional</sup> <a name="max_sample_count" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.maxSampleCount"></a>

- *Type:* typing.Union[int, float]

---

##### `minimum_sampling_interval`<sup>Optional</sup> <a name="minimum_sampling_interval" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer.parameter.minimumSamplingInterval"></a>

- *Type:* aws_cdk.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.CampaignSignal.toObject"></a>

```python
def to_object() -> any
```




### CanVehicleInterface <a name="CanVehicleInterface" id="cdk-aws-iotfleetwise.CanVehicleInterface"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.CanVehicleInterface(
  interface_id: str,
  name: str
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.interfaceId"></a>

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.name"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.CanVehicleInterface.toObject"></a>

```python
def to_object() -> any
```




### CanVehicleSignal <a name="CanVehicleSignal" id="cdk-aws-iotfleetwise.CanVehicleSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.CanVehicleSignal(
  name: str,
  fully_qualified_name: str,
  interface_id: str,
  message_id: typing.Union[int, float],
  factor: typing.Union[int, float],
  is_big_endian: bool,
  is_signed: bool,
  length: typing.Union[int, float],
  offset: typing.Union[int, float],
  start_bit: typing.Union[int, float]
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.messageId">message_id</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.factor">factor</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isBigEndian">is_big_endian</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isSigned">is_signed</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.length">length</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.offset">offset</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.startBit">start_bit</a></code> | <code>typing.Union[int, float]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.name"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.interfaceId"></a>

- *Type:* str

---

##### `message_id`<sup>Required</sup> <a name="message_id" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.messageId"></a>

- *Type:* typing.Union[int, float]

---

##### `factor`<sup>Required</sup> <a name="factor" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.factor"></a>

- *Type:* typing.Union[int, float]

---

##### `is_big_endian`<sup>Required</sup> <a name="is_big_endian" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isBigEndian"></a>

- *Type:* bool

---

##### `is_signed`<sup>Required</sup> <a name="is_signed" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isSigned"></a>

- *Type:* bool

---

##### `length`<sup>Required</sup> <a name="length" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.length"></a>

- *Type:* typing.Union[int, float]

---

##### `offset`<sup>Required</sup> <a name="offset" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.offset"></a>

- *Type:* typing.Union[int, float]

---

##### `start_bit`<sup>Required</sup> <a name="start_bit" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.startBit"></a>

- *Type:* typing.Union[int, float]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.CanVehicleSignal.toObject"></a>

```python
def to_object() -> any
```




### CollectionScheme <a name="CollectionScheme" id="cdk-aws-iotfleetwise.CollectionScheme"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CollectionScheme.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.CollectionScheme()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CollectionScheme.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.CollectionScheme.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogBranch <a name="SignalCatalogBranch" id="cdk-aws-iotfleetwise.SignalCatalogBranch"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.SignalCatalogBranch(
  name: str,
  fully_qualified_name: str,
  description: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.name"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.description"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.SignalCatalogBranch.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogNode <a name="SignalCatalogNode" id="cdk-aws-iotfleetwise.SignalCatalogNode"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogNode.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.SignalCatalogNode()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogNode.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.SignalCatalogNode.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogSensor <a name="SignalCatalogSensor" id="cdk-aws-iotfleetwise.SignalCatalogSensor"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.SignalCatalogSensor(
  name: str,
  fully_qualified_name: str,
  data_type: str,
  unit: str = None,
  min: typing.Union[int, float] = None,
  max: typing.Union[int, float] = None,
  description: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.unit">unit</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.name"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.dataType"></a>

- *Type:* str

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.unit"></a>

- *Type:* str

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.min"></a>

- *Type:* typing.Union[int, float]

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.max"></a>

- *Type:* typing.Union[int, float]

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.description"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.SignalCatalogSensor.toObject"></a>

```python
def to_object() -> any
```




### TimeBasedCollectionScheme <a name="TimeBasedCollectionScheme" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.TimeBasedCollectionScheme(
  period: Duration
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.TimeBasedCollectionScheme.Initializer.parameter.period">period</a></code> | <code>aws_cdk.Duration</code> | *No description.* |

---

##### `period`<sup>Required</sup> <a name="period" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme.Initializer.parameter.period"></a>

- *Type:* aws_cdk.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.TimeBasedCollectionScheme.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.TimeBasedCollectionScheme.toObject"></a>

```python
def to_object() -> any
```




### VehicleInterface <a name="VehicleInterface" id="cdk-aws-iotfleetwise.VehicleInterface"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.VehicleInterface.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.VehicleInterface()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleInterface.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.VehicleInterface.toObject"></a>

```python
def to_object() -> any
```




### VehicleSignal <a name="VehicleSignal" id="cdk-aws-iotfleetwise.VehicleSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.VehicleSignal.Initializer"></a>

```python
import cdk-aws-iotfleetwise

cdk-aws-iotfleetwise.VehicleSignal()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.VehicleSignal.toObject"></a>

```python
def to_object() -> any
```




## Protocols <a name="Protocols" id="Protocols"></a>

### ICampaign <a name="ICampaign" id="cdk-aws-iotfleetwise.ICampaign"></a>

- *Implemented By:* <a href="#cdk-aws-iotfleetwise.ICampaign">ICampaign</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.ICampaign.property.collectionScheme">collection_scheme</a></code> | <code><a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.ICampaign.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.ICampaign.property.signals">signals</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.ICampaign.property.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `collection_scheme`<sup>Required</sup> <a name="collection_scheme" id="cdk-aws-iotfleetwise.ICampaign.property.collectionScheme"></a>

```python
collection_scheme: CollectionScheme
```

- *Type:* <a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a>

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.ICampaign.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `signals`<sup>Required</sup> <a name="signals" id="cdk-aws-iotfleetwise.ICampaign.property.signals"></a>

```python
signals: typing.List[CampaignSignal]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>]

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-aws-iotfleetwise.ICampaign.property.target"></a>

```python
target: Vehicle
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>

---

### IServiceCatalogProps <a name="IServiceCatalogProps" id="cdk-aws-iotfleetwise.IServiceCatalogProps"></a>

- *Implemented By:* <a href="#cdk-aws-iotfleetwise.IServiceCatalogProps">IServiceCatalogProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps.property.database">database</a></code> | <code>aws_cdk.aws_timestream.CfnDatabase</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps.property.nodes">nodes</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps.property.role">role</a></code> | <code>aws_cdk.aws_iam.Role</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps.property.table">table</a></code> | <code>aws_cdk.aws_timestream.CfnTable</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IServiceCatalogProps.property.name">name</a></code> | <code>str</code> | *No description.* |

---

##### `database`<sup>Required</sup> <a name="database" id="cdk-aws-iotfleetwise.IServiceCatalogProps.property.database"></a>

```python
database: CfnDatabase
```

- *Type:* aws_cdk.aws_timestream.CfnDatabase

---

##### `nodes`<sup>Required</sup> <a name="nodes" id="cdk-aws-iotfleetwise.IServiceCatalogProps.property.nodes"></a>

```python
nodes: typing.List[SignalCatalogNode]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>]

---

##### `role`<sup>Required</sup> <a name="role" id="cdk-aws-iotfleetwise.IServiceCatalogProps.property.role"></a>

```python
role: Role
```

- *Type:* aws_cdk.aws_iam.Role

---

##### `table`<sup>Required</sup> <a name="table" id="cdk-aws-iotfleetwise.IServiceCatalogProps.property.table"></a>

```python
table: CfnTable
```

- *Type:* aws_cdk.aws_timestream.CfnTable

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.IServiceCatalogProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.IServiceCatalogProps.property.name"></a>

```python
name: str
```

- *Type:* str

---

### IVehicle <a name="IVehicle" id="cdk-aws-iotfleetwise.IVehicle"></a>

- *Implemented By:* <a href="#cdk-aws-iotfleetwise.IVehicle">IVehicle</a>

Interface.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.IVehicle.property.createIotThing">create_iot_thing</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IVehicle.property.vehicleId">vehicle_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IVehicle.property.vehicleModel">vehicle_model</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a></code> | *No description.* |

---

##### `create_iot_thing`<sup>Required</sup> <a name="create_iot_thing" id="cdk-aws-iotfleetwise.IVehicle.property.createIotThing"></a>

```python
create_iot_thing: bool
```

- *Type:* bool

---

##### `vehicle_id`<sup>Required</sup> <a name="vehicle_id" id="cdk-aws-iotfleetwise.IVehicle.property.vehicleId"></a>

```python
vehicle_id: str
```

- *Type:* str

---

##### `vehicle_model`<sup>Required</sup> <a name="vehicle_model" id="cdk-aws-iotfleetwise.IVehicle.property.vehicleModel"></a>

```python
vehicle_model: VehicleModel
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a>

---

### IVehicleModel <a name="IVehicleModel" id="cdk-aws-iotfleetwise.IVehicleModel"></a>

- *Implemented By:* <a href="#cdk-aws-iotfleetwise.IVehicleModel">IVehicleModel</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.IVehicleModel.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IVehicleModel.property.networkInterfaces">network_interfaces</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IVehicleModel.property.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IVehicleModel.property.signals">signals</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.IVehicleModel.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.IVehicleModel.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `network_interfaces`<sup>Required</sup> <a name="network_interfaces" id="cdk-aws-iotfleetwise.IVehicleModel.property.networkInterfaces"></a>

```python
network_interfaces: typing.List[VehicleInterface]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>]

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.IVehicleModel.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `signals`<sup>Required</sup> <a name="signals" id="cdk-aws-iotfleetwise.IVehicleModel.property.signals"></a>

```python
signals: typing.List[VehicleSignal]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>]

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.IVehicleModel.property.description"></a>

```python
description: str
```

- *Type:* str

---

