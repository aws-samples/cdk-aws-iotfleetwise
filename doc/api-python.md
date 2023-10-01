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

```python
# Example automatically generated from non-compiling source. May contain errors.
from cdk_aws_iotfleetwise import SignalCatalog, VehicleModel, Vehicle, Campaign, CanVehicleInterface, CanVehicleSignal, SignalCatalogBranch, TimeBasedCollectionScheme

signal_catalog = SignalCatalog(stack, "SignalCatalog",
    database=ts_database_construct,
    table=ts_heart_beat_table_construct,
    nodes=[
        SignalCatalogBranch(
            fully_qualified_name="Vehicle"
        ),
        SignalCatalogSensor(
            fully_qualified_name="Vehicle.EngineTorque",
            data_type="DOUBLE"
        )
    ]
)

model_a = VehicleModel(stack, "ModelA",
    signal_catalog=signal_catalog,
    name="modelA",
    description="Model A vehicle",
    network_interfaces=[
        CanVehicleInterface(
            interface_id="1",
            name="vcan0"
        )
    ],
    signals=[
        CanVehicleSignal(
            fully_qualified_name="Vehicle.EngineTorque",
            interface_id="1",
            message_id=401,
            factor=1,
            is_big_endian=True,
            is_signed=False,
            length=8,
            offset=0,
            start_bit=0
        )
    ]
)

vin100 = Vehicle(stack, "vin100",
    vehicle_name="vin100",
    vehicle_model=model_a,
    create_iot_thing=True
)

Campaign(stack, "Campaign",
    name="TimeBasedCampaign",
    target=vin100,
    collection_scheme=TimeBasedCollectionScheme(cdk.Duration.seconds(10)),
    signals=[CampaignSignal("Vehicle.EngineTorque")]
)
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

* Implement updates for all the custom resources
* Conditional campaigns

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

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Campaign(
  scope: Construct,
  id: str,
  campaign_s3arn: str,
  collection_scheme: CollectionScheme,
  fw_timestream_role: str,
  name: str,
  signals: typing.List[CampaignSignal],
  target: Vehicle,
  timestream_arn: str,
  auto_approve: bool = None,
  use_s3: bool = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.campaignS3arn">campaign_s3arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.collectionScheme">collection_scheme</a></code> | <code><a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.fwTimestreamRole">fw_timestream_role</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.signals">signals</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.timestreamArn">timestream_arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.autoApprove">auto_approve</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Campaign.Initializer.parameter.useS3">use_s3</a></code> | <code>bool</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.id"></a>

- *Type:* str

---

##### `campaign_s3arn`<sup>Required</sup> <a name="campaign_s3arn" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.campaignS3arn"></a>

- *Type:* str

---

##### `collection_scheme`<sup>Required</sup> <a name="collection_scheme" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.collectionScheme"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a>

---

##### `fw_timestream_role`<sup>Required</sup> <a name="fw_timestream_role" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.fwTimestreamRole"></a>

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.name"></a>

- *Type:* str

---

##### `signals`<sup>Required</sup> <a name="signals" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.signals"></a>

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>]

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.target"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>

---

##### `timestream_arn`<sup>Required</sup> <a name="timestream_arn" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.timestreamArn"></a>

- *Type:* str

---

##### `auto_approve`<sup>Optional</sup> <a name="auto_approve" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.autoApprove"></a>

- *Type:* bool

---

##### `use_s3`<sup>Optional</sup> <a name="use_s3" id="cdk-aws-iotfleetwise.Campaign.Initializer.parameter.useS3"></a>

- *Type:* bool

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Campaign.is_construct(
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


### Fleet <a name="Fleet" id="cdk-aws-iotfleetwise.Fleet"></a>

The fleet of vehicles.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Fleet.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Fleet(
  scope: Construct,
  id: str,
  fleet_id: str,
  signal_catalog: SignalCatalog,
  description: str = None,
  vehicles: typing.List[Vehicle] = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.fleetId">fleet_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.Initializer.parameter.vehicles">vehicles</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>]</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.id"></a>

- *Type:* str

---

##### `fleet_id`<sup>Required</sup> <a name="fleet_id" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.fleetId"></a>

- *Type:* str

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.signalCatalog"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.description"></a>

- *Type:* str

---

##### `vehicles`<sup>Optional</sup> <a name="vehicles" id="cdk-aws-iotfleetwise.Fleet.Initializer.parameter.vehicles"></a>

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="cdk-aws-iotfleetwise.Fleet.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="cdk-aws-iotfleetwise.Fleet.isConstruct"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Fleet.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Fleet.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.arn">arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.fleetId">fleet_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Fleet.property.vehicles">vehicles</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Fleet.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `arn`<sup>Required</sup> <a name="arn" id="cdk-aws-iotfleetwise.Fleet.property.arn"></a>

```python
arn: str
```

- *Type:* str

---

##### `fleet_id`<sup>Required</sup> <a name="fleet_id" id="cdk-aws-iotfleetwise.Fleet.property.fleetId"></a>

```python
fleet_id: str
```

- *Type:* str

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.Fleet.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `vehicles`<sup>Optional</sup> <a name="vehicles" id="cdk-aws-iotfleetwise.Fleet.property.vehicles"></a>

```python
vehicles: typing.List[Vehicle]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>]

---


### Logging <a name="Logging" id="cdk-aws-iotfleetwise.Logging"></a>

Configures FleetWise logging to CloudWatch logs.

If enabled, this will ensure the log group is accessible,
or create a new one if it is not.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Logging.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Logging(
  scope: Construct,
  id: str,
  enable_logging: str,
  log_group_name: str,
  keep_log_group: bool = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.enableLogging">enable_logging</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.logGroupName">log_group_name</a></code> | <code>str</code> | Name of log group to configure. |
| <code><a href="#cdk-aws-iotfleetwise.Logging.Initializer.parameter.keepLogGroup">keep_log_group</a></code> | <code>bool</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.id"></a>

- *Type:* str

---

##### `enable_logging`<sup>Required</sup> <a name="enable_logging" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.enableLogging"></a>

- *Type:* str

---

##### `log_group_name`<sup>Required</sup> <a name="log_group_name" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.logGroupName"></a>

- *Type:* str

Name of log group to configure.

This can be either single name
such as `AWSIoTFleetWiseLogs` or a fully pathed entry such as:
`/iot/FleetWiseLogs`

---

##### `keep_log_group`<sup>Optional</sup> <a name="keep_log_group" id="cdk-aws-iotfleetwise.Logging.Initializer.parameter.keepLogGroup"></a>

- *Type:* bool

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="cdk-aws-iotfleetwise.Logging.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="cdk-aws-iotfleetwise.Logging.isConstruct"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Logging.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-aws-iotfleetwise.Logging.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Logging.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-aws-iotfleetwise.Logging.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---


### SignalCatalog <a name="SignalCatalog" id="cdk-aws-iotfleetwise.SignalCatalog"></a>

The Signal Catalog represents the list of all signals that you want to collect from all the vehicles.

The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalog(
  scope: Construct,
  id: str,
  deregister: bool = None,
  description: str = None,
  name: str = None,
  nodes: typing.List[SignalCatalogNode] = None,
  vss_file: str = None,
  vss_generate_prefix_branch: bool = None,
  vss_prefix: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.deregister">deregister</a></code> | <code>bool</code> | Deregister FleetWise on stack deletion. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.description">description</a></code> | <code>str</code> | Description of the Signal Catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.name">name</a></code> | <code>str</code> | Name of the Signal Catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.nodes">nodes</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>]</code> | An array of signal nodes. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.vssFile">vss_file</a></code> | <code>str</code> | A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be appended after any `SignalCatalogNode` objects provided. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.vssGeneratePrefixBranch">vss_generate_prefix_branch</a></code> | <code>bool</code> | If set to true, this will parse the vssPrefix into branch nodes. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.vssPrefix">vss_prefix</a></code> | <code>str</code> | A prefix to prepend to the fully qualified names found in the VSS file. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.id"></a>

- *Type:* str

---

##### `deregister`<sup>Optional</sup> <a name="deregister" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.deregister"></a>

- *Type:* bool
- *Default:* false

Deregister FleetWise on stack deletion.

If set to 'true',  FleetWise will be deregistered from the Timestream
destination.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.description"></a>

- *Type:* str
- *Default:* None

Description of the Signal Catalog.

If not provided no description is set.

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.name"></a>

- *Type:* str
- *Default:* default

Name of the Signal Catalog.

If not provided, default value is used.

---

##### `nodes`<sup>Optional</sup> <a name="nodes" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.nodes"></a>

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>]
- *Default:* []

An array of signal nodes.

Nodes are a general abstraction of a signal.
A node can be specified as an actuator, attribute, branch, or sensor. See `SignalCatalogBranch`,
`SignalCatalogSensor`, `SignalCatalogActuator`, or `SignalCatalogAttribute` for creating nodes.

---

##### `vss_file`<sup>Optional</sup> <a name="vss_file" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.vssFile"></a>

- *Type:* str
- *Default:* None

A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be appended after any `SignalCatalogNode` objects provided.

---

##### `vss_generate_prefix_branch`<sup>Optional</sup> <a name="vss_generate_prefix_branch" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.vssGeneratePrefixBranch"></a>

- *Type:* bool
- *Default:* true

If set to true, this will parse the vssPrefix into branch nodes.

For instance if `OBD.MyData` was
provided,  the `OBD.MyData` will be parsed into branch nodes of `OBD` and `OBD.MyData`. By default
this is set to true. If you define branches in another way such as via `SignalCatalogNode`, set this
to false to suppress creation of branch nodes.

---

##### `vss_prefix`<sup>Optional</sup> <a name="vss_prefix" id="cdk-aws-iotfleetwise.SignalCatalog.Initializer.parameter.vssPrefix"></a>

- *Type:* str
- *Default:* None

A prefix to prepend to the fully qualified names found in the VSS file.

The format of the prefix
is in dotted notation, and will be the prepended to all signal names.

For instance, with the prefix of `OBD.MyData` and signal names of `PidA` and `PidB` will be combined
to create `OBD.MyData.PidA` and `OBD.MyData.PidB`.

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalog.is_construct(
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
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalog.property.name">name</a></code> | <code>str</code> | The name of the signal catalog. |

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

##### `description`<sup>Required</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalog.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalog.property.name"></a>

```python
name: str
```

- *Type:* str

The name of the signal catalog.

---


### Vehicle <a name="Vehicle" id="cdk-aws-iotfleetwise.Vehicle"></a>

The vehicle of a specific type from which IoT FleetWise collect signals.

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.Vehicle.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Vehicle(
  scope: Construct,
  id: str,
  create_iot_thing: bool,
  vehicle_model: VehicleModel,
  vehicle_name: str,
  attributes: typing.Mapping[str] = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.createIotThing">create_iot_thing</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.vehicleModel">vehicle_model</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.vehicleName">vehicle_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.attributes">attributes</a></code> | <code>typing.Mapping[str]</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.id"></a>

- *Type:* str

---

##### `create_iot_thing`<sup>Required</sup> <a name="create_iot_thing" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.createIotThing"></a>

- *Type:* bool

---

##### `vehicle_model`<sup>Required</sup> <a name="vehicle_model" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.vehicleModel"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a>

---

##### `vehicle_name`<sup>Required</sup> <a name="vehicle_name" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.vehicleName"></a>

- *Type:* str

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="cdk-aws-iotfleetwise.Vehicle.Initializer.parameter.attributes"></a>

- *Type:* typing.Mapping[str]

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.Vehicle.is_construct(
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
| <code><a href="#cdk-aws-iotfleetwise.Vehicle.property.vehicleName">vehicle_name</a></code> | <code>str</code> | *No description.* |
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

##### `vehicle_name`<sup>Required</sup> <a name="vehicle_name" id="cdk-aws-iotfleetwise.Vehicle.property.vehicleName"></a>

```python
vehicle_name: str
```

- *Type:* str

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.VehicleModel(
  scope: Construct,
  id: str,
  name: str,
  network_interfaces: typing.List[VehicleInterface],
  signal_catalog: SignalCatalog,
  description: str = None,
  network_file_definitions: typing.List[NetworkFileDefinition] = None,
  signals: typing.List[VehicleSignal] = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.id">id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.networkInterfaces">network_interfaces</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.networkFileDefinitions">network_file_definitions</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.NetworkFileDefinition">NetworkFileDefinition</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.signals">signals</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>]</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.id"></a>

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.name"></a>

- *Type:* str

---

##### `network_interfaces`<sup>Required</sup> <a name="network_interfaces" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.networkInterfaces"></a>

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>]

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.signalCatalog"></a>

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.description"></a>

- *Type:* str

---

##### `network_file_definitions`<sup>Optional</sup> <a name="network_file_definitions" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.networkFileDefinitions"></a>

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.NetworkFileDefinition">NetworkFileDefinition</a>]

---

##### `signals`<sup>Optional</sup> <a name="signals" id="cdk-aws-iotfleetwise.VehicleModel.Initializer.parameter.signals"></a>

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>]

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.VehicleModel.is_construct(
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


## Structs <a name="Structs" id="Structs"></a>

### AttributeVehicleSignalProps <a name="AttributeVehicleSignalProps" id="cdk-aws-iotfleetwise.AttributeVehicleSignalProps"></a>

Attribute Signal - needed when creating a vehicle with attributes.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.AttributeVehicleSignalProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.AttributeVehicleSignalProps(
  fully_qualified_name: str
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignalProps.property.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.AttributeVehicleSignalProps.property.fullyQualifiedName"></a>

```python
fully_qualified_name: str
```

- *Type:* str

---

### CampaignProps <a name="CampaignProps" id="cdk-aws-iotfleetwise.CampaignProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CampaignProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CampaignProps(
  campaign_s3arn: str,
  collection_scheme: CollectionScheme,
  fw_timestream_role: str,
  name: str,
  signals: typing.List[CampaignSignal],
  target: Vehicle,
  timestream_arn: str,
  auto_approve: bool = None,
  use_s3: bool = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.campaignS3arn">campaign_s3arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.collectionScheme">collection_scheme</a></code> | <code><a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.fwTimestreamRole">fw_timestream_role</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.signals">signals</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.target">target</a></code> | <code><a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.timestreamArn">timestream_arn</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.autoApprove">auto_approve</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CampaignProps.property.useS3">use_s3</a></code> | <code>bool</code> | *No description.* |

---

##### `campaign_s3arn`<sup>Required</sup> <a name="campaign_s3arn" id="cdk-aws-iotfleetwise.CampaignProps.property.campaignS3arn"></a>

```python
campaign_s3arn: str
```

- *Type:* str

---

##### `collection_scheme`<sup>Required</sup> <a name="collection_scheme" id="cdk-aws-iotfleetwise.CampaignProps.property.collectionScheme"></a>

```python
collection_scheme: CollectionScheme
```

- *Type:* <a href="#cdk-aws-iotfleetwise.CollectionScheme">CollectionScheme</a>

---

##### `fw_timestream_role`<sup>Required</sup> <a name="fw_timestream_role" id="cdk-aws-iotfleetwise.CampaignProps.property.fwTimestreamRole"></a>

```python
fw_timestream_role: str
```

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CampaignProps.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `signals`<sup>Required</sup> <a name="signals" id="cdk-aws-iotfleetwise.CampaignProps.property.signals"></a>

```python
signals: typing.List[CampaignSignal]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.CampaignSignal">CampaignSignal</a>]

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-aws-iotfleetwise.CampaignProps.property.target"></a>

```python
target: Vehicle
```

- *Type:* <a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>

---

##### `timestream_arn`<sup>Required</sup> <a name="timestream_arn" id="cdk-aws-iotfleetwise.CampaignProps.property.timestreamArn"></a>

```python
timestream_arn: str
```

- *Type:* str

---

##### `auto_approve`<sup>Optional</sup> <a name="auto_approve" id="cdk-aws-iotfleetwise.CampaignProps.property.autoApprove"></a>

```python
auto_approve: bool
```

- *Type:* bool

---

##### `use_s3`<sup>Optional</sup> <a name="use_s3" id="cdk-aws-iotfleetwise.CampaignProps.property.useS3"></a>

```python
use_s3: bool
```

- *Type:* bool

---

### CanVehicleInterfaceProps <a name="CanVehicleInterfaceProps" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CanVehicleInterfaceProps(
  interface_id: str,
  name: str,
  protocol_name: str = None,
  protocol_version: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolName">protocol_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolVersion">protocol_version</a></code> | <code>str</code> | *No description.* |

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.interfaceId"></a>

```python
interface_id: str
```

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `protocol_name`<sup>Optional</sup> <a name="protocol_name" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolName"></a>

```python
protocol_name: str
```

- *Type:* str

---

##### `protocol_version`<sup>Optional</sup> <a name="protocol_version" id="cdk-aws-iotfleetwise.CanVehicleInterfaceProps.property.protocolVersion"></a>

```python
protocol_version: str
```

- *Type:* str

---

### CanVehicleSignalProps <a name="CanVehicleSignalProps" id="cdk-aws-iotfleetwise.CanVehicleSignalProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CanVehicleSignalProps(
  factor: typing.Union[int, float],
  fully_qualified_name: str,
  interface_id: str,
  is_big_endian: bool,
  is_signed: bool,
  length: typing.Union[int, float],
  message_id: typing.Union[int, float],
  offset: typing.Union[int, float],
  start_bit: typing.Union[int, float],
  name: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.factor">factor</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isBigEndian">is_big_endian</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isSigned">is_signed</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.length">length</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.messageId">message_id</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.offset">offset</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.startBit">start_bit</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignalProps.property.name">name</a></code> | <code>str</code> | *No description.* |

---

##### `factor`<sup>Required</sup> <a name="factor" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.factor"></a>

```python
factor: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.fullyQualifiedName"></a>

```python
fully_qualified_name: str
```

- *Type:* str

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.interfaceId"></a>

```python
interface_id: str
```

- *Type:* str

---

##### `is_big_endian`<sup>Required</sup> <a name="is_big_endian" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isBigEndian"></a>

```python
is_big_endian: bool
```

- *Type:* bool

---

##### `is_signed`<sup>Required</sup> <a name="is_signed" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.isSigned"></a>

```python
is_signed: bool
```

- *Type:* bool

---

##### `length`<sup>Required</sup> <a name="length" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.length"></a>

```python
length: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `message_id`<sup>Required</sup> <a name="message_id" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.messageId"></a>

```python
message_id: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `offset`<sup>Required</sup> <a name="offset" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.offset"></a>

```python
offset: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `start_bit`<sup>Required</sup> <a name="start_bit" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.startBit"></a>

```python
start_bit: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleSignalProps.property.name"></a>

```python
name: str
```

- *Type:* str

---

### FleetProps <a name="FleetProps" id="cdk-aws-iotfleetwise.FleetProps"></a>

Interface.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.FleetProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.FleetProps(
  fleet_id: str,
  signal_catalog: SignalCatalog,
  description: str = None,
  vehicles: typing.List[Vehicle] = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.fleetId">fleet_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.FleetProps.property.vehicles">vehicles</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>]</code> | *No description.* |

---

##### `fleet_id`<sup>Required</sup> <a name="fleet_id" id="cdk-aws-iotfleetwise.FleetProps.property.fleetId"></a>

```python
fleet_id: str
```

- *Type:* str

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.FleetProps.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.FleetProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `vehicles`<sup>Optional</sup> <a name="vehicles" id="cdk-aws-iotfleetwise.FleetProps.property.vehicles"></a>

```python
vehicles: typing.List[Vehicle]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.Vehicle">Vehicle</a>]

---

### LoggingProps <a name="LoggingProps" id="cdk-aws-iotfleetwise.LoggingProps"></a>

FleetWise Logging Properties.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.LoggingProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.LoggingProps(
  enable_logging: str,
  log_group_name: str,
  keep_log_group: bool = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.LoggingProps.property.enableLogging">enable_logging</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.LoggingProps.property.logGroupName">log_group_name</a></code> | <code>str</code> | Name of log group to configure. |
| <code><a href="#cdk-aws-iotfleetwise.LoggingProps.property.keepLogGroup">keep_log_group</a></code> | <code>bool</code> | *No description.* |

---

##### `enable_logging`<sup>Required</sup> <a name="enable_logging" id="cdk-aws-iotfleetwise.LoggingProps.property.enableLogging"></a>

```python
enable_logging: str
```

- *Type:* str

---

##### `log_group_name`<sup>Required</sup> <a name="log_group_name" id="cdk-aws-iotfleetwise.LoggingProps.property.logGroupName"></a>

```python
log_group_name: str
```

- *Type:* str

Name of log group to configure.

This can be either single name
such as `AWSIoTFleetWiseLogs` or a fully pathed entry such as:
`/iot/FleetWiseLogs`

---

##### `keep_log_group`<sup>Optional</sup> <a name="keep_log_group" id="cdk-aws-iotfleetwise.LoggingProps.property.keepLogGroup"></a>

```python
keep_log_group: bool
```

- *Type:* bool

---

### SignalCatalogActuatorProps <a name="SignalCatalogActuatorProps" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogActuatorProps(
  data_type: str,
  fully_qualified_name: str,
  allowed_values: typing.List[str] = None,
  assigned_value: str = None,
  description: str = None,
  max: typing.Union[int, float] = None,
  min: typing.Union[int, float] = None,
  unit: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.allowedValues">allowed_values</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.assignedValue">assigned_value</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.unit">unit</a></code> | <code>str</code> | *No description.* |

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.dataType"></a>

```python
data_type: str
```

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.fullyQualifiedName"></a>

```python
fully_qualified_name: str
```

- *Type:* str

---

##### `allowed_values`<sup>Optional</sup> <a name="allowed_values" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.allowedValues"></a>

```python
allowed_values: typing.List[str]
```

- *Type:* typing.List[str]

---

##### `assigned_value`<sup>Optional</sup> <a name="assigned_value" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.assignedValue"></a>

```python
assigned_value: str
```

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.max"></a>

```python
max: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.min"></a>

```python
min: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogActuatorProps.property.unit"></a>

```python
unit: str
```

- *Type:* str

---

### SignalCatalogAttributeProps <a name="SignalCatalogAttributeProps" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogAttributeProps(
  data_type: str,
  fully_qualified_name: str,
  allowed_values: typing.List[str] = None,
  assigned_value: str = None,
  default_value: str = None,
  description: str = None,
  max: typing.Union[int, float] = None,
  min: typing.Union[int, float] = None,
  unit: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.allowedValues">allowed_values</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.assignedValue">assigned_value</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.defaultValue">default_value</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.unit">unit</a></code> | <code>str</code> | *No description.* |

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.dataType"></a>

```python
data_type: str
```

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.fullyQualifiedName"></a>

```python
fully_qualified_name: str
```

- *Type:* str

---

##### `allowed_values`<sup>Optional</sup> <a name="allowed_values" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.allowedValues"></a>

```python
allowed_values: typing.List[str]
```

- *Type:* typing.List[str]

---

##### `assigned_value`<sup>Optional</sup> <a name="assigned_value" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.assignedValue"></a>

```python
assigned_value: str
```

- *Type:* str

---

##### `default_value`<sup>Optional</sup> <a name="default_value" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.defaultValue"></a>

```python
default_value: str
```

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.max"></a>

```python
max: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.min"></a>

```python
min: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogAttributeProps.property.unit"></a>

```python
unit: str
```

- *Type:* str

---

### SignalCatalogBranchProps <a name="SignalCatalogBranchProps" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogBranchProps(
  fully_qualified_name: str,
  description: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.description">description</a></code> | <code>str</code> | *No description.* |

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.fullyQualifiedName"></a>

```python
fully_qualified_name: str
```

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogBranchProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

### SignalCatalogProps <a name="SignalCatalogProps" id="cdk-aws-iotfleetwise.SignalCatalogProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogProps(
  deregister: bool = None,
  description: str = None,
  name: str = None,
  nodes: typing.List[SignalCatalogNode] = None,
  vss_file: str = None,
  vss_generate_prefix_branch: bool = None,
  vss_prefix: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.deregister">deregister</a></code> | <code>bool</code> | Deregister FleetWise on stack deletion. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.description">description</a></code> | <code>str</code> | Description of the Signal Catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.name">name</a></code> | <code>str</code> | Name of the Signal Catalog. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.nodes">nodes</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>]</code> | An array of signal nodes. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.vssFile">vss_file</a></code> | <code>str</code> | A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be appended after any `SignalCatalogNode` objects provided. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.vssGeneratePrefixBranch">vss_generate_prefix_branch</a></code> | <code>bool</code> | If set to true, this will parse the vssPrefix into branch nodes. |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogProps.property.vssPrefix">vss_prefix</a></code> | <code>str</code> | A prefix to prepend to the fully qualified names found in the VSS file. |

---

##### `deregister`<sup>Optional</sup> <a name="deregister" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.deregister"></a>

```python
deregister: bool
```

- *Type:* bool
- *Default:* false

Deregister FleetWise on stack deletion.

If set to 'true',  FleetWise will be deregistered from the Timestream
destination.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.description"></a>

```python
description: str
```

- *Type:* str
- *Default:* None

Description of the Signal Catalog.

If not provided no description is set.

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.name"></a>

```python
name: str
```

- *Type:* str
- *Default:* default

Name of the Signal Catalog.

If not provided, default value is used.

---

##### `nodes`<sup>Optional</sup> <a name="nodes" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.nodes"></a>

```python
nodes: typing.List[SignalCatalogNode]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.SignalCatalogNode">SignalCatalogNode</a>]
- *Default:* []

An array of signal nodes.

Nodes are a general abstraction of a signal.
A node can be specified as an actuator, attribute, branch, or sensor. See `SignalCatalogBranch`,
`SignalCatalogSensor`, `SignalCatalogActuator`, or `SignalCatalogAttribute` for creating nodes.

---

##### `vss_file`<sup>Optional</sup> <a name="vss_file" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.vssFile"></a>

```python
vss_file: str
```

- *Type:* str
- *Default:* None

A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be appended after any `SignalCatalogNode` objects provided.

---

##### `vss_generate_prefix_branch`<sup>Optional</sup> <a name="vss_generate_prefix_branch" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.vssGeneratePrefixBranch"></a>

```python
vss_generate_prefix_branch: bool
```

- *Type:* bool
- *Default:* true

If set to true, this will parse the vssPrefix into branch nodes.

For instance if `OBD.MyData` was
provided,  the `OBD.MyData` will be parsed into branch nodes of `OBD` and `OBD.MyData`. By default
this is set to true. If you define branches in another way such as via `SignalCatalogNode`, set this
to false to suppress creation of branch nodes.

---

##### `vss_prefix`<sup>Optional</sup> <a name="vss_prefix" id="cdk-aws-iotfleetwise.SignalCatalogProps.property.vssPrefix"></a>

```python
vss_prefix: str
```

- *Type:* str
- *Default:* None

A prefix to prepend to the fully qualified names found in the VSS file.

The format of the prefix
is in dotted notation, and will be the prepended to all signal names.

For instance, with the prefix of `OBD.MyData` and signal names of `PidA` and `PidB` will be combined
to create `OBD.MyData.PidA` and `OBD.MyData.PidB`.

---

### SignalCatalogSensorProps <a name="SignalCatalogSensorProps" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogSensorProps(
  data_type: str,
  fully_qualified_name: str,
  allowed_values: typing.List[str] = None,
  description: str = None,
  max: typing.Union[int, float] = None,
  min: typing.Union[int, float] = None,
  unit: str = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.allowedValues">allowed_values</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.unit">unit</a></code> | <code>str</code> | *No description.* |

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.dataType"></a>

```python
data_type: str
```

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.fullyQualifiedName"></a>

```python
fully_qualified_name: str
```

- *Type:* str

---

##### `allowed_values`<sup>Optional</sup> <a name="allowed_values" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.allowedValues"></a>

```python
allowed_values: typing.List[str]
```

- *Type:* typing.List[str]

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.max"></a>

```python
max: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.min"></a>

```python
min: typing.Union[int, float]
```

- *Type:* typing.Union[int, float]

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogSensorProps.property.unit"></a>

```python
unit: str
```

- *Type:* str

---

### VehicleModelProps <a name="VehicleModelProps" id="cdk-aws-iotfleetwise.VehicleModelProps"></a>

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.VehicleModelProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.VehicleModelProps(
  name: str,
  network_interfaces: typing.List[VehicleInterface],
  signal_catalog: SignalCatalog,
  description: str = None,
  network_file_definitions: typing.List[NetworkFileDefinition] = None,
  signals: typing.List[VehicleSignal] = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.networkInterfaces">network_interfaces</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.signalCatalog">signal_catalog</a></code> | <code><a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.networkFileDefinitions">network_file_definitions</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.NetworkFileDefinition">NetworkFileDefinition</a>]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleModelProps.property.signals">signals</a></code> | <code>typing.List[<a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.VehicleModelProps.property.name"></a>

```python
name: str
```

- *Type:* str

---

##### `network_interfaces`<sup>Required</sup> <a name="network_interfaces" id="cdk-aws-iotfleetwise.VehicleModelProps.property.networkInterfaces"></a>

```python
network_interfaces: typing.List[VehicleInterface]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.VehicleInterface">VehicleInterface</a>]

---

##### `signal_catalog`<sup>Required</sup> <a name="signal_catalog" id="cdk-aws-iotfleetwise.VehicleModelProps.property.signalCatalog"></a>

```python
signal_catalog: SignalCatalog
```

- *Type:* <a href="#cdk-aws-iotfleetwise.SignalCatalog">SignalCatalog</a>

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.VehicleModelProps.property.description"></a>

```python
description: str
```

- *Type:* str

---

##### `network_file_definitions`<sup>Optional</sup> <a name="network_file_definitions" id="cdk-aws-iotfleetwise.VehicleModelProps.property.networkFileDefinitions"></a>

```python
network_file_definitions: typing.List[NetworkFileDefinition]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.NetworkFileDefinition">NetworkFileDefinition</a>]

---

##### `signals`<sup>Optional</sup> <a name="signals" id="cdk-aws-iotfleetwise.VehicleModelProps.property.signals"></a>

```python
signals: typing.List[VehicleSignal]
```

- *Type:* typing.List[<a href="#cdk-aws-iotfleetwise.VehicleSignal">VehicleSignal</a>]

---

### VehicleProps <a name="VehicleProps" id="cdk-aws-iotfleetwise.VehicleProps"></a>

Interface.

#### Initializer <a name="Initializer" id="cdk-aws-iotfleetwise.VehicleProps.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.VehicleProps(
  create_iot_thing: bool,
  vehicle_model: VehicleModel,
  vehicle_name: str,
  attributes: typing.Mapping[str] = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.createIotThing">create_iot_thing</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.vehicleModel">vehicle_model</a></code> | <code><a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a></code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.vehicleName">vehicle_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.VehicleProps.property.attributes">attributes</a></code> | <code>typing.Mapping[str]</code> | *No description.* |

---

##### `create_iot_thing`<sup>Required</sup> <a name="create_iot_thing" id="cdk-aws-iotfleetwise.VehicleProps.property.createIotThing"></a>

```python
create_iot_thing: bool
```

- *Type:* bool

---

##### `vehicle_model`<sup>Required</sup> <a name="vehicle_model" id="cdk-aws-iotfleetwise.VehicleProps.property.vehicleModel"></a>

```python
vehicle_model: VehicleModel
```

- *Type:* <a href="#cdk-aws-iotfleetwise.VehicleModel">VehicleModel</a>

---

##### `vehicle_name`<sup>Required</sup> <a name="vehicle_name" id="cdk-aws-iotfleetwise.VehicleProps.property.vehicleName"></a>

```python
vehicle_name: str
```

- *Type:* str

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="cdk-aws-iotfleetwise.VehicleProps.property.attributes"></a>

```python
attributes: typing.Mapping[str]
```

- *Type:* typing.Mapping[str]

---

## Classes <a name="Classes" id="Classes"></a>

### AttributeVehicleSignal <a name="AttributeVehicleSignal" id="cdk-aws-iotfleetwise.AttributeVehicleSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.AttributeVehicleSignal.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.AttributeVehicleSignal(
  fully_qualified_name: str
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignal.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.AttributeVehicleSignal.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.AttributeVehicleSignal.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.AttributeVehicleSignal.toObject"></a>

```python
def to_object() -> any
```




### CampaignSignal <a name="CampaignSignal" id="cdk-aws-iotfleetwise.CampaignSignal"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CampaignSignal.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CampaignSignal(
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




### CanDefinition <a name="CanDefinition" id="cdk-aws-iotfleetwise.CanDefinition"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanDefinition.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CanDefinition(
  network_interface: str,
  signals_map: typing.Mapping[str],
  can_dbc_files: typing.List[str]
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.networkInterface">network_interface</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.signalsMap">signals_map</a></code> | <code>typing.Mapping[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.canDbcFiles">can_dbc_files</a></code> | <code>typing.List[str]</code> | *No description.* |

---

##### `network_interface`<sup>Required</sup> <a name="network_interface" id="cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.networkInterface"></a>

- *Type:* str

---

##### `signals_map`<sup>Required</sup> <a name="signals_map" id="cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.signalsMap"></a>

- *Type:* typing.Mapping[str]

---

##### `can_dbc_files`<sup>Required</sup> <a name="can_dbc_files" id="cdk-aws-iotfleetwise.CanDefinition.Initializer.parameter.canDbcFiles"></a>

- *Type:* typing.List[str]

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanDefinition.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.CanDefinition.toObject"></a>

```python
def to_object() -> any
```




### CanVehicleInterface <a name="CanVehicleInterface" id="cdk-aws-iotfleetwise.CanVehicleInterface"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CanVehicleInterface(
  interface_id: str,
  name: str,
  protocol_name: str = None,
  protocol_version: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.protocolName">protocol_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.protocolVersion">protocol_version</a></code> | <code>str</code> | *No description.* |

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.interfaceId"></a>

- *Type:* str

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.name"></a>

- *Type:* str

---

##### `protocol_name`<sup>Optional</sup> <a name="protocol_name" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.protocolName"></a>

- *Type:* str

---

##### `protocol_version`<sup>Optional</sup> <a name="protocol_version" id="cdk-aws-iotfleetwise.CanVehicleInterface.Initializer.parameter.protocolVersion"></a>

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CanVehicleSignal(
  factor: typing.Union[int, float],
  fully_qualified_name: str,
  interface_id: str,
  is_big_endian: bool,
  is_signed: bool,
  length: typing.Union[int, float],
  message_id: typing.Union[int, float],
  offset: typing.Union[int, float],
  start_bit: typing.Union[int, float],
  name: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.factor">factor</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.interfaceId">interface_id</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isBigEndian">is_big_endian</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.isSigned">is_signed</a></code> | <code>bool</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.length">length</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.messageId">message_id</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.offset">offset</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.startBit">start_bit</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.name">name</a></code> | <code>str</code> | *No description.* |

---

##### `factor`<sup>Required</sup> <a name="factor" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.factor"></a>

- *Type:* typing.Union[int, float]

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `interface_id`<sup>Required</sup> <a name="interface_id" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.interfaceId"></a>

- *Type:* str

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

##### `message_id`<sup>Required</sup> <a name="message_id" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.messageId"></a>

- *Type:* typing.Union[int, float]

---

##### `offset`<sup>Required</sup> <a name="offset" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.offset"></a>

- *Type:* typing.Union[int, float]

---

##### `start_bit`<sup>Required</sup> <a name="start_bit" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.startBit"></a>

- *Type:* typing.Union[int, float]

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-aws-iotfleetwise.CanVehicleSignal.Initializer.parameter.name"></a>

- *Type:* str

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.CollectionScheme()
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




### NetworkFileDefinition <a name="NetworkFileDefinition" id="cdk-aws-iotfleetwise.NetworkFileDefinition"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.NetworkFileDefinition.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.NetworkFileDefinition()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.NetworkFileDefinition.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.NetworkFileDefinition.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogActuator <a name="SignalCatalogActuator" id="cdk-aws-iotfleetwise.SignalCatalogActuator"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogActuator(
  data_type: str,
  fully_qualified_name: str,
  allowed_values: typing.List[str] = None,
  assigned_value: str = None,
  description: str = None,
  max: typing.Union[int, float] = None,
  min: typing.Union[int, float] = None,
  unit: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.allowedValues">allowed_values</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.assignedValue">assigned_value</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.unit">unit</a></code> | <code>str</code> | *No description.* |

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.dataType"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `allowed_values`<sup>Optional</sup> <a name="allowed_values" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.allowedValues"></a>

- *Type:* typing.List[str]

---

##### `assigned_value`<sup>Optional</sup> <a name="assigned_value" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.assignedValue"></a>

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.description"></a>

- *Type:* str

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.max"></a>

- *Type:* typing.Union[int, float]

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.min"></a>

- *Type:* typing.Union[int, float]

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogActuator.Initializer.parameter.unit"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogActuator.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.SignalCatalogActuator.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogAttribute <a name="SignalCatalogAttribute" id="cdk-aws-iotfleetwise.SignalCatalogAttribute"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogAttribute(
  data_type: str,
  fully_qualified_name: str,
  allowed_values: typing.List[str] = None,
  assigned_value: str = None,
  default_value: str = None,
  description: str = None,
  max: typing.Union[int, float] = None,
  min: typing.Union[int, float] = None,
  unit: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.allowedValues">allowed_values</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.assignedValue">assigned_value</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.defaultValue">default_value</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.unit">unit</a></code> | <code>str</code> | *No description.* |

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.dataType"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `allowed_values`<sup>Optional</sup> <a name="allowed_values" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.allowedValues"></a>

- *Type:* typing.List[str]

---

##### `assigned_value`<sup>Optional</sup> <a name="assigned_value" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.assignedValue"></a>

- *Type:* str

---

##### `default_value`<sup>Optional</sup> <a name="default_value" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.defaultValue"></a>

- *Type:* str

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.description"></a>

- *Type:* str

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.max"></a>

- *Type:* typing.Union[int, float]

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.min"></a>

- *Type:* typing.Union[int, float]

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.Initializer.parameter.unit"></a>

- *Type:* str

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogAttribute.toObject">to_object</a></code> | *No description.* |

---

##### `to_object` <a name="to_object" id="cdk-aws-iotfleetwise.SignalCatalogAttribute.toObject"></a>

```python
def to_object() -> any
```




### SignalCatalogBranch <a name="SignalCatalogBranch" id="cdk-aws-iotfleetwise.SignalCatalogBranch"></a>

#### Initializers <a name="Initializers" id="cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer"></a>

```python
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogBranch(
  fully_qualified_name: str,
  description: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogBranch.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogNode()
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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.SignalCatalogSensor(
  data_type: str,
  fully_qualified_name: str,
  allowed_values: typing.List[str] = None,
  description: str = None,
  max: typing.Union[int, float] = None,
  min: typing.Union[int, float] = None,
  unit: str = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.dataType">data_type</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName">fully_qualified_name</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.allowedValues">allowed_values</a></code> | <code>typing.List[str]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.description">description</a></code> | <code>str</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.max">max</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.min">min</a></code> | <code>typing.Union[int, float]</code> | *No description.* |
| <code><a href="#cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.unit">unit</a></code> | <code>str</code> | *No description.* |

---

##### `data_type`<sup>Required</sup> <a name="data_type" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.dataType"></a>

- *Type:* str

---

##### `fully_qualified_name`<sup>Required</sup> <a name="fully_qualified_name" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.fullyQualifiedName"></a>

- *Type:* str

---

##### `allowed_values`<sup>Optional</sup> <a name="allowed_values" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.allowedValues"></a>

- *Type:* typing.List[str]

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.description"></a>

- *Type:* str

---

##### `max`<sup>Optional</sup> <a name="max" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.max"></a>

- *Type:* typing.Union[int, float]

---

##### `min`<sup>Optional</sup> <a name="min" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.min"></a>

- *Type:* typing.Union[int, float]

---

##### `unit`<sup>Optional</sup> <a name="unit" id="cdk-aws-iotfleetwise.SignalCatalogSensor.Initializer.parameter.unit"></a>

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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.TimeBasedCollectionScheme(
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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.VehicleInterface()
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
import cdk_aws_iotfleetwise

cdk_aws_iotfleetwise.VehicleSignal()
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





