import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';
import { Provider } from './provider';

/**
 * FleetWise Logging Properties
 */

export interface LoggingProps {
  /**
   * Name of log group to configure. This can be either single name
   * such as `AWSIoTFleetWiseLogs` or a fully pathed entry such as:
   * `/iot/FleetWiseLogs`
   */
  readonly logGroupName: string;
  readonly enableLogging: 'ERROR' | 'OFF';
  readonly keepLogGroup?: boolean;
}

/**
 * Configures FleetWise logging to CloudWatch logs.
 *
 * If enabled, this will ensure the log group is accessible,
 * or create a new one if it is not.
 */

export class Logging extends Construct {
  constructor(scope: Construct, id: string, props: LoggingProps) {
    super(scope, id);

    const logType: string = props.enableLogging;
    const keepLogGroup: boolean = props.keepLogGroup || false;

    const handler = new Handler(this, 'Handler', {
      handler: 'logginghandler.on_event',
    });

    new cdk.CustomResource(this, 'Resource', {
      serviceToken: Provider.getOrCreate(this, handler).provider.serviceToken,
      properties: {
        cloudwatch_log_group_name: props.logGroupName,
        log_type: logType,
        keep_log_group: keepLogGroup,
      },
    });
  }
}