import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';
import { SignalCatalog } from './signalcatalog';

export class VehicleInterface {
  protected intf: object;

  constructor() {
    this.intf = {};
  }

  toObject(): object {
    return (this.intf);
  }
}

export interface CanVehicleInterfaceProps {
  readonly interfaceId: string;
  readonly name: string;
  readonly protocolName?: string;
  readonly protocolVersion?: string;
}

export class CanVehicleInterface extends VehicleInterface {
  constructor(props: CanVehicleInterfaceProps) {
    super();

    this.intf = {
      type: 'CAN_INTERFACE',
      interfaceId: props.interfaceId,
      canInterface: {
        name: props.name,
        protocolName: props.protocolName || 'CAN',
        protocolVersion: props.protocolVersion || '2.0b',
      },
    };
  }
}

export class VehicleSignal {
  protected signal: object;

  constructor() {
    this.signal = {};
  }

  toObject(): object {
    return (this.signal);
  }
}

export interface CanVehicleSignalProps {
  readonly fullyQualifiedName: string;
  readonly interfaceId: string;
  readonly messageId: number;
  readonly name?: string;
  readonly factor: number;
  readonly isBigEndian: boolean;
  readonly isSigned: boolean;
  readonly length: number;
  readonly offset: number;
  readonly startBit: number;
}


export class CanVehicleSignal extends VehicleSignal {
  constructor(props: CanVehicleSignalProps) {
    super();

    this.signal = {
      type: 'CAN_SIGNAL',
      fullyQualifiedName: props.fullyQualifiedName,
      interfaceId: props.interfaceId,
      canSignal: {
        factor: props.factor,
        isBigEndian: props.isBigEndian,
        isSigned: props.isSigned,
        length: props.length,
        messageId: props.messageId,
        name: props.name || '',
        offset: props.offset,
        startBit: props.startBit,
      },
    };
    if (!props.name) {
      // remove description property if it is not set (FleetWise expects 1 or more characters)
      delete (this.signal as any).canSignal.name;
    }
  }
}


/**
 * Attribute Signal - needed when creating a vehicle with attributes
 */
export interface AttributeVehicleSignalProps {
  readonly fullyQualifiedName: string;
}

export class AttributeVehicleSignal extends VehicleSignal {
  constructor(props: AttributeVehicleSignalProps) {
    super();

    this.signal = {
      type: 'ATTRIBUTE_SIGNAL',
      fullyQualifiedName: props.fullyQualifiedName,
    };
  }
}

export class NetworkFileDefinition {
  protected definition: object;

  constructor() {
    this.definition = {};
  }

  toObject(): object {
    return (this.definition);
  }
}

export class CanDefinition extends NetworkFileDefinition {
  constructor(
    networkInterface: string,
    signalsMap: Record<string, string>,
    canDbcFiles: Array<string>,
  ) {
    super();


    this.definition = {
      canDbc: {
        canDbcFiles: canDbcFiles.map(file => Buffer.from(file).toString('base64')),
        networkInterface,
        signalsMap,
      },
    };
  }
}

export interface VehicleModelProps {
  readonly signalCatalog: SignalCatalog;
  readonly name: string;
  readonly description?: string;
  readonly networkInterfaces: VehicleInterface[];
  readonly signals?: VehicleSignal[];
  readonly networkFileDefinitions?: NetworkFileDefinition[];
}

export class VehicleModel extends Construct {
  readonly name: string = '';
  readonly signalCatalog: SignalCatalog = ({} as SignalCatalog);

  constructor(scope: Construct, id: string, props: VehicleModelProps) {
    super(scope, id);

    (this.name as string) = props.name || '';
    (this.signalCatalog as SignalCatalog) = props.signalCatalog;

    const handler = new Handler(this, 'Handler', {
      handler: 'vehiclemodelhandler.on_event',
    });

    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: Provider.getOrCreate(this, handler).provider.serviceToken,
      properties: {
        name: this.name,
        signal_catalog_arn: props.signalCatalog.arn,
        model_manifest_arn: `arn:aws:iotfleetwise:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:model-manifest/${this.name}`,
        description: props.description,
        network_interfaces: JSON.stringify(props.networkInterfaces.map(i => i.toObject())),
        signals: (props.signals) ? JSON.stringify(props.signals.map(s => s.toObject())) : '{}',
        network_file_definitions: (props.networkFileDefinitions) ? JSON.stringify(props.networkFileDefinitions.map(s => s.toObject())) : '{}',
      },
    });


    resource.node.addDependency(this.signalCatalog);
  }
}
