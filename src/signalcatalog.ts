import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { Handler } from './handler';
import { IrawVssNode, VSS } from './parse-vss-file';
import { Provider } from './provider';


export const vssDatatypeMapping = [
  { vssType: 'int8', fleetWiseType: 'INT8' },
  { vssType: 'uint8', fleetWiseType: 'UINT8' },
  { vssType: 'int16', fleetWiseType: 'INT16' },
  { vssType: 'uint16', fleetWiseType: 'UINT16' },
  { vssType: 'int32', fleetWiseType: 'INT32' },
  { vssType: 'uint32', fleetWiseType: 'UINT32' },
  { vssType: 'int64', fleetWiseType: 'INT64' },
  { vssType: 'uint64', fleetWiseType: 'UINT64' },
  { vssType: 'boolean', fleetWiseType: 'BOOLEAN' },
  { vssType: 'float', fleetWiseType: 'FLOAT' },
  { vssType: 'double', fleetWiseType: 'DOUBLE' },
  { vssType: 'string', fleetWiseType: 'STRING' },
  { vssType: 'timestamp?????', fleetWiseType: 'UNIX_TIMESTAMP' },
  { vssType: 'int8[]', fleetWiseType: 'INT8_ARRAY' },
  { vssType: 'uint8[]', fleetWiseType: 'UINT8_ARRAY' },
  { vssType: 'int16[]', fleetWiseType: 'INT16_ARRAY' },
  { vssType: 'uint16[]', fleetWiseType: 'UINT16_ARRAY' },
  { vssType: 'int32[]', fleetWiseType: 'INT32_ARRAY' },
  { vssType: 'uint32[]', fleetWiseType: 'UINT32_ARRAY' },
  { vssType: 'int64[]', fleetWiseType: 'INT64_ARRAY' },
  { vssType: 'uint64[]', fleetWiseType: 'UINT64_ARRAY' },
  { vssType: 'boolean[]', fleetWiseType: 'BOOLEAN_ARRAY' },
  { vssType: 'float[]', fleetWiseType: 'FLOAT_ARRAY' },
  { vssType: 'double[]', fleetWiseType: 'DOUBLE_ARRAY' },
  { vssType: 'string[]', fleetWiseType: 'STRING_ARRAY' },
  { vssType: 'timestamp?????[]', fleetWiseType: 'UNIX_TIMESTAMP_ARRAY' },
  { vssType: '????', fleetWiseType: 'UNKNOWN' },
];

export class SignalCatalogNode {
  protected node: object;

  constructor() {
    this.node = {};
  }

  toObject(): object {
    return (this.node);
  }
}


export interface SignalCatalogBranchProps {
  readonly description?: string;
  readonly fullyQualifiedName: string;
}

export class SignalCatalogBranch extends SignalCatalogNode {
  constructor(props: SignalCatalogBranchProps) {
    super();

    this.node = {
      branch: {
        ...props,
      },
    };
  }
}

export interface SignalCatalogSensorProps {
  readonly allowedValues?: string[];
  readonly dataType: string;
  readonly description?: string;
  readonly fullyQualifiedName: string;
  readonly max?: number;
  readonly min?: number;
  readonly unit?: string;
}
export class SignalCatalogSensor extends SignalCatalogNode {
  constructor(props: SignalCatalogSensorProps) {
    super();

    this.node = {
      sensor: {
        ...props,
      },
    };
  }
}

export interface SignalCatalogActuatorProps {
  readonly allowedValues?: string[];
  readonly assignedValue?: string;
  readonly dataType: string;
  readonly description?: string;
  readonly fullyQualifiedName: string;
  readonly max?: number;
  readonly min?: number;
  readonly unit?: string;
}
export class SignalCatalogActuator extends SignalCatalogNode {
  constructor(props: SignalCatalogActuatorProps) {
    super();

    this.node = {
      actuator: {
        ...props,
      },
    };
  }
}

export interface SignalCatalogAttributeProps {
  readonly allowedValues?: string[];
  readonly assignedValue?: string;
  readonly dataType: string;
  readonly defaultValue?: string;
  readonly description?: string;
  readonly fullyQualifiedName: string;
  readonly max?: number;
  readonly min?: number;
  readonly unit?: string;
}
export class SignalCatalogAttribute extends SignalCatalogNode {
  constructor(props: SignalCatalogAttributeProps) {
    super();

    this.node = {
      attribute: {
        ...props,
      },
    };
  }
}

/**
 * @summary The properties for the SignalCatalog construct.
 */
export interface SignalCatalogProps {
  /**
   * Name of the Signal Catalog. If not provided, default value is used.
   *
   * @default - default
   */
  readonly name?: string;
  /**
   * Description of the Signal Catalog. If not provided no description is set.
   *
   * @default - None
   */
  readonly description?: string;
  /**
   * Timestream database construct. If the construct is provided along with the `table` value,
   * the stack will attempt to register FleetWise.
   *
   * @default - None
   */
  /**
   * Deregister FleetWise on stack deletion. If set to 'true',  FleetWise will be deregistered from the Timestream
   * destination.
   *
   * @default - false
   */
  readonly deregister?: boolean;
  /**
   * An array of signal nodes. Nodes are a general abstraction of a signal.
   * A node can be specified as an actuator, attribute, branch, or sensor. See `SignalCatalogBranch`,
   * `SignalCatalogSensor`, `SignalCatalogActuator`, or `SignalCatalogAttribute` for creating nodes.
   *
   * @default - []
   */
  readonly nodes?: SignalCatalogNode[];
  /**
   * A YAML file that conforms to the [Vehicle Signal Specification format](https://covesa.github.io/vehicle_signal_specification/) and
   * contains a list of signals. If provided, the contents of the file, along with the `prefix` property will be
   * appended after any `SignalCatalogNode` objects provided.
   *
   * @default - None
   */
  readonly vssFile?: string;
  /**
   * A prefix to prepend to the fully qualified names found in the VSS file. The format of the prefix
   * is in dotted notation, and will be the prepended to all signal names.
   *
   * For instance, with the prefix of `OBD.MyData` and signal names of `PidA` and `PidB` will be combined
   * to create `OBD.MyData.PidA` and `OBD.MyData.PidB`.
   *
   * @default - None
   */
  readonly vssPrefix?: string;
  /**
   * If set to true, this will parse the vssPrefix into branch nodes. For instance if `OBD.MyData` was
   * provided,  the `OBD.MyData` will be parsed into branch nodes of `OBD` and `OBD.MyData`. By default
   * this is set to true. If you define branches in another way such as via `SignalCatalogNode`, set this
   * to false to suppress creation of branch nodes.
   *
   * @default - true
   */
  readonly vssGeneratePrefixBranch?: boolean;
}


/**
 * The Signal Catalog represents the list of all signals that you want to collect from all
 * the vehicles.
 *
 *
 * The AWS IoT Fleetwise preview can only support a single Signal Catalog per account.
 *
 */
export class SignalCatalog extends Construct {
  /**
   * The name of the signal catalog
   */
  readonly name: string;
  readonly description: string;
  private vssFile: string;
  private vssPrefix: string;
  private vssGeneratePrefixBranch: boolean;
  private nodes: SignalCatalogNode[];
  readonly arn: string;

  constructor(scope: Construct, id: string, props: SignalCatalogProps) {
    super(scope, id);

    this.name = props.name || 'default';
    this.arn = `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:signal-catalog/${this.name}`;
    this.description = props.description || 'Catalog generated by CDK';
    // this.deregister = props.deregister || false;
    this.vssFile = props.vssFile || '';
    this.vssPrefix = props.vssPrefix || '';
    this.vssGeneratePrefixBranch = props.vssGeneratePrefixBranch ? true : false;
    this.nodes = props.nodes || [];
    if (!this.vssFile && this.nodes.length == 0) {
      throw new Error(
        'Either a VSS file or signal catalog nodes must be provided.',
      );
    }

    const handler = new Handler(this, 'Handler', {
      handler: 'servicehandler.on_event',
    });

    const isCompleteHandler = new Handler(this, 'IsCompleteHandler', {
      handler: 'servicehandler.is_complete',
    });

    const provider = Provider.getOrCreate(
      this,
      handler,
      isCompleteHandler,
      cdk.Duration.minutes(5),
    );

    const serviceResource = new cdk.CustomResource(this, 'ServiceResource', {
      serviceToken: provider.provider.serviceToken,
    });

    const serviceCatalogHandler = new Handler(this, 'ServiceCatalogHandler', {
      handler: 'signalcataloghandler.on_event',
    });

    // Create catalog from provided nodes. If VSS file provided, parse entries
    // and append to nodes.
    if (this.vssFile !== '') {
      const vssSignals = parseVss(
        this.vssFile,
        this.vssPrefix,
        this.vssGeneratePrefixBranch,
      );
      this.nodes = this.nodes.concat(vssSignals);
    }
    const resourceCatalog = new cdk.CustomResource(this, 'CatalogResource', {
      serviceToken: Provider.getOrCreate(this, serviceCatalogHandler).provider
        .serviceToken,
      properties: {
        name: this.name,
        description: this.description,
        nodes: JSON.stringify(this.nodes.map((node) => node.toObject())),
      },
    });

    resourceCatalog.node.addDependency(serviceResource);

    function parseVss(
      vssFile: string,
      vssPrefix: string,
      vssGeneratePrefixBranch: boolean,
    ): SignalCatalogNode[] {
      let signals: SignalCatalogNode[] = [];

      // parse all nodes and general signals/branches/sensor for FleetWise
      // get in parsed VSS format first
      const vssNodes = new VSS({
        vssFile: vssFile,
        prefix: vssPrefix ? vssPrefix : '',
        generatePrefixBranch: vssGeneratePrefixBranch,
      });

      // Create FleetWise nodes from VSS nodes

      for (const node in vssNodes.nodes) {
        // Convert VSS spec signal object to FleetWise one (but without the signal type)
        let vssSignal: any = vssDatatypeToFleetwise(vssNodes.nodes[node]);
        switch (vssNodes.nodes[node].type) {
          case 'sensor':
            signals.push(
              new SignalCatalogSensor({
                ...vssSignal,
              }),
            );
            break;
          case 'actuator':
            signals.push(
              new SignalCatalogActuator({
                ...vssSignal,
              }),
            );
            break;
          case 'attribute':
            signals.push(
              new SignalCatalogAttribute({
                ...vssSignal,
              }),
            );
            break;
          case 'branch':
            signals.push(
              new SignalCatalogBranch({
                ...vssSignal,
              }),
            );
            break;
          default:
            throw new Error(
              'Error, invalid object: ' + vssNodes.nodes[node].type,
            );
        }
      }

      return signals;
    }

    function vssDatatypeToFleetwise(
      vssSignal: IrawVssNode,
    ):
      | SignalCatalogActuator
      | SignalCatalogAttribute
      | SignalCatalogBranch
      | SignalCatalogSensor {
      // Accepts a VSS definition and returns a transformed FleetWise object
      // for the different types (sensor, actuator, branch, attribute)
      // This takes in a non-typed object and returns a non-typed object

      // Build FleetWise formatted signal (without the signal type)
      var fleetWiseSignal: any = { fullyQualifiedName: vssSignal.name };

      // Iterate all keys, convert names as needed, drop 'type'
      // and add all the other key/values as-is
      for (const [key, value] of Object.entries(vssSignal.contents)) {
        switch (key) {
          case 'type':
            break;
          case 'datatype':
            fleetWiseSignal.dataType = vssDatatypeMapping.find(
              (el) => el.vssType === value,
            )!.fleetWiseType;
            break;
          case 'allowed':
            // TODO - check for single value or array of string values and convert to string
            fleetWiseSignal.allowedValues = value;
            break;
          case 'default':
            fleetWiseSignal.assignedValue = value.toString();
            break;
          default:
            fleetWiseSignal[key] = value;
            break;
        }
      }
      return fleetWiseSignal;
    }
  }
}
