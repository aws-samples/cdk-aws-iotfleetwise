import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_lambda as lambda,
  aws_logs as logs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';


export interface EventHandlerProps {
  handler: string;
}

export class EventHandler extends Construct {
  public readonly handler: lambda.SingletonFunction;

  constructor(scope: Construct, id: string, props: EventHandlerProps) {
    super(scope, id)

    this.handler = new lambda.SingletonFunction(this, 'Lambda', {
      uuid: `${cdk.Aws.STACK_NAME}-${props.handler}`,
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/handlers')),
      handler: props.handler,
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [this.signalCatalog.lambdaLayer],
      role: this.signalCatalog.lambdaRole,
      logRetention: logs.RetentionDays.ONE_DAY,
    });
  }
}