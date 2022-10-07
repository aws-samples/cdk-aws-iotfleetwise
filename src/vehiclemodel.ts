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

export class CanVehicleInterface extends VehicleInterface {
  constructor(
    interfaceId: string,
    name: string) {
    super();

    this.intf = {
      type: 'CAN_INTERFACE',
      interfaceId,
      canInterface: {
        name: name,
        protocolName: 'CAN',
        protocolVersion: '2.0b',
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

export class CanVehicleSignal extends VehicleSignal {
  constructor(
    fullyQualifiedName: string,
    interfaceId: string,
    messageId: number,
    factor: number,
    isBigEndian: boolean,
    isSigned: boolean,
    length: number,
    offset: number,
    startBit: number) {
    super();

    this.signal = {
      type: 'CAN_SIGNAL',
      fullyQualifiedName,
      interfaceId,
      canSignal: {
        factor,
        isBigEndian,
        isSigned,
        length,
        messageId,
        offset,
        startBit,
      },
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
