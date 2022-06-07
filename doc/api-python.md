# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Campaign <a name="Campaign" id="pahud-iot-demo.Campaign"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.Campaign.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.Campaign(
  scope: Construct,
  id: str,
  props: ICampaign
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.ICampaign">ICampaign</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.Campaign.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.Campaign.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.Campaign.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.ICampaign">ICampaign</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="pahud-iot-demo.Campaign.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="pahud-iot-demo.Campaign.isConstruct"></a>

```python
import pahud_iot_demo

pahud_iot_demo.Campaign.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.Campaign.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Campaign.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.Campaign.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Campaign.property.target">target</a></code> | <code><a href="#pahud-iot-demo.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.Campaign.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="pahud-iot-demo.Campaign.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.Campaign.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `target`<sup>Required</sup> <a name="target" id="pahud-iot-demo.Campaign.property.target"></a>

```python
target: Vehicle
```

- *Type:* <a href="#pahud-iot-demo.Vehicle">Vehicle</a>

---


### SignalCatalog <a name="SignalCatalog" id="pahud-iot-demo.SignalCatalog"></a>

The Signal Catalog represents the list of all signals that you want to collect from all the vehicles.

The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalog.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.SignalCatalog(
  scope: Construct,
  id: str,
  props: IServiceCatalogProps
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.IServiceCatalogProps">IServiceCatalogProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.SignalCatalog.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.SignalCatalog.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.SignalCatalog.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.IServiceCatalogProps">IServiceCatalogProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="pahud-iot-demo.SignalCatalog.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="pahud-iot-demo.SignalCatalog.isConstruct"></a>

```python
import pahud_iot_demo

pahud_iot_demo.SignalCatalog.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.SignalCatalog.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.lambdaLayer">lambda_layer</a></code> | <code>aws_cdk.aws_lambda.LayerVersion</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.lambdaRole">lambda_role</a></code> | <code>aws_cdk.aws_iam.Role</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.name">name</a></code> | <code>str</code> | The name of the signal catalog. |
| <code><a href="#pahud-iot-demo.SignalCatalog.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.SignalCatalog.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="pahud-iot-demo.SignalCatalog.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `lambda_layer`<sup>Required</sup> <a name="lambda_layer" id="pahud-iot-demo.SignalCatalog.property.lambdaLayer"></a>

```python
lambda_layer: LayerVersion
```

- *Type:* aws_cdk.aws_lambda.LayerVersion

---

##### `lambda_role`<sup>Required</sup> <a name="lambda_role" id="pahud-iot-demo.SignalCatalog.property.lambdaRole"></a>

```python
lambda_role: Role
```

- *Type:* aws_cdk.aws_iam.Role

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.SignalCatalog.property.name"></a>

```python
name: str
```

- *Type:* str

The name of the signal catalog.

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.SignalCatalog.property.description"></a>

```python
description: str
```

- *Type:* str

---


### Vehicle <a name="Vehicle" id="pahud-iot-demo.Vehicle"></a>

The vehicle of a specific type from which IoT FleetWise collect signals.

#### Initializers <a name="Initializers" id="pahud-iot-demo.Vehicle.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.Vehicle(
  scope: Construct,
  id: str,
  props: IVehicle
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.IVehicle">IVehicle</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.Vehicle.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.Vehicle.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.Vehicle.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.IVehicle">IVehicle</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="pahud-iot-demo.Vehicle.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="pahud-iot-demo.Vehicle.isConstruct"></a>

```python
import pahud_iot_demo

pahud_iot_demo.Vehicle.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.Vehicle.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.Vehicle.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.Vehicle.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.vehicleModel">vehicle_model</a></code> | <code><a href="#pahud-iot-demo.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.certificateArn">certificate_arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.certificateId">certificate_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.certificatePem">certificate_pem</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.endpointAddress">endpoint_address</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.Vehicle.property.privateKey">private_key</a></code> | <code>str</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.Vehicle.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="pahud-iot-demo.Vehicle.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `vehicle_model`<sup>Required</sup> <a name="vehicle_model" id="pahud-iot-demo.Vehicle.property.vehicleModel"></a>

```python
vehicle_model: VehicleModel
```

- *Type:* <a href="#pahud-iot-demo.VehicleModel">VehicleModel</a>

---

##### `certificate_arn`<sup>Optional</sup> <a name="certificate_arn" id="pahud-iot-demo.Vehicle.property.certificateArn"></a>

```python
certificate_arn: str
```

- *Type:* str

---

##### `certificate_id`<sup>Optional</sup> <a name="certificate_id" id="pahud-iot-demo.Vehicle.property.certificateId"></a>

```python
certificate_id: str
```

- *Type:* str

---

##### `certificate_pem`<sup>Optional</sup> <a name="certificate_pem" id="pahud-iot-demo.Vehicle.property.certificatePem"></a>

```python
certificate_pem: str
```

- *Type:* str

---

##### `endpoint_address`<sup>Optional</sup> <a name="endpoint_address" id="pahud-iot-demo.Vehicle.property.endpointAddress"></a>

```python
endpoint_address: str
```

- *Type:* str

---

##### `private_key`<sup>Optional</sup> <a name="private_key" id="pahud-iot-demo.Vehicle.property.privateKey"></a>

```python
private_key: str
```

- *Type:* str

---


### VehicleModel <a name="VehicleModel" id="pahud-iot-demo.VehicleModel"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.VehicleModel.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.VehicleModel(
  scope: Construct,
  id: str,
  props: IVehicleModel
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.Initializer.parameter.props">props</a></code> | <code><a href="#pahud-iot-demo.IVehicleModel">IVehicleModel</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="pahud-iot-demo.VehicleModel.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="pahud-iot-demo.VehicleModel.Initializer.parameter.id"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="pahud-iot-demo.VehicleModel.Initializer.parameter.props"></a>

- *Type:* <a href="#pahud-iot-demo.IVehicleModel">IVehicleModel</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="pahud-iot-demo.VehicleModel.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="pahud-iot-demo.VehicleModel.isConstruct"></a>

```python
import pahud_iot_demo

pahud_iot_demo.VehicleModel.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="pahud-iot-demo.VehicleModel.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.VehicleModel.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#pahud-iot-demo.VehicleModel.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.property.signalCatalog">signal_catalog</a></code> | <code><a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.VehicleModel.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="pahud-iot-demo.VehicleModel.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.VehicleModel.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="pahud-iot-demo.VehicleModel.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.VehicleModel.property.description"></a>

```python
description: str
```

- *Type:* str

---



## Classes <a name="Classes" id="Classes"></a>

### CampaignSignal <a name="CampaignSignal" id="pahud-iot-demo.CampaignSignal"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CampaignSignal.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.CampaignSignal(
  name: str,
  max_sample_count: typing.Union[int, float] = None,
  minimum_sampling_interval: Duration = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.CampaignSignal.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CampaignSignal.Initializer.parameter.maxSampleCount">max_sample_count</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CampaignSignal.Initializer.parameter.minimumSamplingInterval">minimum_sampling_interval</a></code> | <code>aws_cdk.Duration</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.CampaignSignal.Initializer.parameter.name"></a>

- *Type:* str

---

##### `max_sample_count`<sup>Optional</sup> <a name="max_sample_count" id="pahud-iot-demo.CampaignSignal.Initializer.parameter.maxSampleCount"></a>

- *Type:* typing.Union[int, float]

---

##### `minimum_sampling_interval`<sup>Optional</sup> <a name="minimum_sampling_interval" id="pahud-iot-demo.CampaignSignal.Initializer.parameter.minimumSamplingInterval"></a>

- *Type:* aws_cdk.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CampaignSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.CampaignSignal.toObject"></a>

```python
def to_object() -> any
```




### CanVehicleInterface <a name="CanVehicleInterface" id="pahud-iot-demo.CanVehicleInterface"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CanVehicleInterface.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.CanVehicleInterface(
  interface_id: str,
  name: str
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleInterface.Initializer.parameter.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleInterface.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="pahud-iot-demo.CanVehicleInterface.Initializer.parameter.interfaceId"></a>

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.CanVehicleInterface.Initializer.parameter.name"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleInterface.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.CanVehicleInterface.toObject"></a>

```python
def to_object() -> any
```




### CanVehicleSignal <a name="CanVehicleSignal" id="pahud-iot-demo.CanVehicleSignal"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CanVehicleSignal.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.CanVehicleSignal(
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
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.messageId">message_id</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.factor">factor</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isBigEndian">is_big_endian</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isSigned">is_signed</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.length">length</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.offset">offset</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.Initializer.parameter.startBit">start_bit</a></code> | <code>typing.Union[int, float]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.name"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.interfaceId"></a>

- *Type:* str

---

##### `message_id`<sup>Required</sup> <a name="message_id" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.messageId"></a>

- *Type:* typing.Union[int, float]

---

##### `factor`<sup>Required</sup> <a name="factor" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.factor"></a>

- *Type:* typing.Union[int, float]

---

##### `is_big_endian`<sup>Required</sup> <a name="is_big_endian" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isBigEndian"></a>

- *Type:* bool

---

##### `is_signed`<sup>Required</sup> <a name="is_signed" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.isSigned"></a>

- *Type:* bool

---

##### `length`<sup>Required</sup> <a name="length" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.length"></a>

- *Type:* typing.Union[int, float]

---

##### `offset`<sup>Required</sup> <a name="offset" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.offset"></a>

- *Type:* typing.Union[int, float]

---

##### `start_bit`<sup>Required</sup> <a name="start_bit" id="pahud-iot-demo.CanVehicleSignal.Initializer.parameter.startBit"></a>

- *Type:* typing.Union[int, float]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CanVehicleSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.CanVehicleSignal.toObject"></a>

```python
def to_object() -> any
```




### CollectionScheme <a name="CollectionScheme" id="pahud-iot-demo.CollectionScheme"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.CollectionScheme.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.CollectionScheme()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.CollectionScheme.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.CollectionScheme.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogBranch <a name="SignalCatalogBranch" id="pahud-iot-demo.SignalCatalogBranch"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalogBranch.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.SignalCatalogBranch(
  name: str,
  fully_qualified_name: str,
  description: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.name"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.SignalCatalogBranch.Initializer.parameter.description"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogBranch.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.SignalCatalogBranch.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogNode <a name="SignalCatalogNode" id="pahud-iot-demo.SignalCatalogNode"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalogNode.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.SignalCatalogNode()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogNode.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.SignalCatalogNode.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogSensor <a name="SignalCatalogSensor" id="pahud-iot-demo.SignalCatalogSensor"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.SignalCatalogSensor.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.SignalCatalogSensor(
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
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.unit">unit</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.name"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.dataType"></a>

- *Type:* str

---

##### `unit`<sup>Optional</sup> <a name="unit" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.unit"></a>

- *Type:* str

---

##### `min`<sup>Optional</sup> <a name="min" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.min"></a>

- *Type:* typing.Union[int, float]

---

##### `max`<sup>Optional</sup> <a name="max" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.max"></a>

- *Type:* typing.Union[int, float]

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.SignalCatalogSensor.Initializer.parameter.description"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.SignalCatalogSensor.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.SignalCatalogSensor.toObject"></a>

```python
def to_object() -> any
```




### TimeBasedCollectionScheme <a name="TimeBasedCollectionScheme" id="pahud-iot-demo.TimeBasedCollectionScheme"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.TimeBasedCollectionScheme.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.TimeBasedCollectionScheme(
  period: Duration
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.TimeBasedCollectionScheme.Initializer.parameter.period">period</a></code> | <code>aws_cdk.Duration</code> | *No description.* |

---

##### `period`<sup>Required</sup> <a name="period" id="pahud-iot-demo.TimeBasedCollectionScheme.Initializer.parameter.period"></a>

- *Type:* aws_cdk.Duration

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.TimeBasedCollectionScheme.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.TimeBasedCollectionScheme.toObject"></a>

```python
def to_object() -> any
```




### VehicleInterface <a name="VehicleInterface" id="pahud-iot-demo.VehicleInterface"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.VehicleInterface.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.VehicleInterface()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleInterface.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.VehicleInterface.toObject"></a>

```python
def to_object() -> any
```




### VehicleSignal <a name="VehicleSignal" id="pahud-iot-demo.VehicleSignal"></a>

#### Initializers <a name="Initializers" id="pahud-iot-demo.VehicleSignal.Initializer"></a>

```python
import pahud_iot_demo

pahud_iot_demo.VehicleSignal()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#pahud-iot-demo.VehicleSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="pahud-iot-demo.VehicleSignal.toObject"></a>

```python
def to_object() -> any
```




## Protocols <a name="Protocols" id="Protocols"></a>

### ICampaign <a name="ICampaign" id="pahud-iot-demo.ICampaign"></a>

- *Implemented By:* <a href="#pahud-iot-demo.ICampaign">ICampaign</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.ICampaign.property.collectionScheme">collection_scheme</a></code> | <code><a href="#pahud-iot-demo.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.ICampaign.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.ICampaign.property.signals">signals</a></code> | <code>typing.List[<a href="#pahud-iot-demo.CampaignSignal">CampaignSignal</a>]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.ICampaign.property.target">target</a></code> | <code><a href="#pahud-iot-demo.Vehicle">Vehicle</a></code> | *No description.* |

---

##### `collection_scheme`<sup>Required</sup> <a name="collection_scheme" id="pahud-iot-demo.ICampaign.property.collectionScheme"></a>

```python
collection_scheme: CollectionScheme
```

- *Type:* <a href="#pahud-iot-demo.CollectionScheme">CollectionScheme</a>

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.ICampaign.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `signals`<sup>Required</sup> <a name="signals" id="pahud-iot-demo.ICampaign.property.signals"></a>

```python
signals: typing.List[CampaignSignal]
```

- *Type:* typing.List[<a href="#pahud-iot-demo.CampaignSignal">CampaignSignal</a>]

---

##### `target`<sup>Required</sup> <a name="target" id="pahud-iot-demo.ICampaign.property.target"></a>

```python
target: Vehicle
```

- *Type:* <a href="#pahud-iot-demo.Vehicle">Vehicle</a>

---

### IServiceCatalogProps <a name="IServiceCatalogProps" id="pahud-iot-demo.IServiceCatalogProps"></a>

- *Implemented By:* <a href="#pahud-iot-demo.IServiceCatalogProps">IServiceCatalogProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.database">database</a></code> | <code>aws_cdk.aws_timestream.CfnDatabase</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.nodes">nodes</a></code> | <code>typing.List[<a href="#pahud-iot-demo.SignalCatalogNode">SignalCatalogNode</a>]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.role">role</a></code> | <code>aws_cdk.aws_iam.Role</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.table">table</a></code> | <code>aws_cdk.aws_timestream.CfnTable</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IServiceCatalogProps.property.name">name</a></code> | <code>str</code> | *No description.* |

---

##### `database`<sup>Required</sup> <a name="database" id="pahud-iot-demo.IServiceCatalogProps.property.database"></a>

```python
database: CfnDatabase
```

- *Type:* aws_cdk.aws_timestream.CfnDatabase

---

##### `nodes`<sup>Required</sup> <a name="nodes" id="pahud-iot-demo.IServiceCatalogProps.property.nodes"></a>

```python
nodes: typing.List[SignalCatalogNode]
```

- *Type:* typing.List[<a href="#pahud-iot-demo.SignalCatalogNode">SignalCatalogNode</a>]

---

##### `role`<sup>Required</sup> <a name="role" id="pahud-iot-demo.IServiceCatalogProps.property.role"></a>

```python
role: Role
```

- *Type:* aws_cdk.aws_iam.Role

---

##### `table`<sup>Required</sup> <a name="table" id="pahud-iot-demo.IServiceCatalogProps.property.table"></a>

```python
table: CfnTable
```

- *Type:* aws_cdk.aws_timestream.CfnTable

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.IServiceCatalogProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `name`<sup>Optional</sup> <a name="name" id="pahud-iot-demo.IServiceCatalogProps.property.name"></a>

```python
name: str
```

- *Type:* str

---

### IVehicle <a name="IVehicle" id="pahud-iot-demo.IVehicle"></a>

- *Implemented By:* <a href="#pahud-iot-demo.IVehicle">IVehicle</a>

Interface.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.IVehicle.property.createIotThing">create_iot_thing</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicle.property.vehicleId">vehicle_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicle.property.vehicleModel">vehicle_model</a></code> | <code><a href="#pahud-iot-demo.VehicleModel">VehicleModel</a></code> | *No description.* |

---

##### `create_iot_thing`<sup>Required</sup> <a name="create_iot_thing" id="pahud-iot-demo.IVehicle.property.createIotThing"></a>

```python
create_iot_thing: bool
```

- *Type:* bool

---

##### `vehicle_id`<sup>Required</sup> <a name="vehicle_id" id="pahud-iot-demo.IVehicle.property.vehicleId"></a>

```python
vehicle_id: str
```

- *Type:* str

---

##### `vehicle_model`<sup>Required</sup> <a name="vehicle_model" id="pahud-iot-demo.IVehicle.property.vehicleModel"></a>

```python
vehicle_model: VehicleModel
```

- *Type:* <a href="#pahud-iot-demo.VehicleModel">VehicleModel</a>

---

### IVehicleModel <a name="IVehicleModel" id="pahud-iot-demo.IVehicleModel"></a>

- *Implemented By:* <a href="#pahud-iot-demo.IVehicleModel">IVehicleModel</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.networkInterfaces">network_interfaces</a></code> | <code>typing.List[<a href="#pahud-iot-demo.VehicleInterface">VehicleInterface</a>]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.signalCatalog">signal_catalog</a></code> | <code><a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.signals">signals</a></code> | <code>typing.List[<a href="#pahud-iot-demo.VehicleSignal">VehicleSignal</a>]</code> | *No description.* |
| <code><a href="#pahud-iot-demo.IVehicleModel.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="pahud-iot-demo.IVehicleModel.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `network_interfaces`<sup>Required</sup> <a name="network_interfaces" id="pahud-iot-demo.IVehicleModel.property.networkInterfaces"></a>

```python
network_interfaces: typing.List[VehicleInterface]
```

- *Type:* typing.List[<a href="#pahud-iot-demo.VehicleInterface">VehicleInterface</a>]

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="pahud-iot-demo.IVehicleModel.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#pahud-iot-demo.SignalCatalog">SignalCatalog</a>

---

##### `signals`<sup>Required</sup> <a name="signals" id="pahud-iot-demo.IVehicleModel.property.signals"></a>

```python
signals: typing.List[VehicleSignal]
```

- *Type:* typing.List[<a href="#pahud-iot-demo.VehicleSignal">VehicleSignal</a>]

---

##### `description`<sup>Optional</sup> <a name="description" id="pahud-iot-demo.IVehicleModel.property.description"></a>

```python
description: str
```

- *Type:* str

---

