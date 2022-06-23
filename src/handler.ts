import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_lambda as lambda,
  aws_logs as logs,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Boto3LayerVersion } from './boto3layerversion';
import { HandlerRole } from './handlerrole';


export interface EventHandlerProps {
  handler: string;
}

export class Handler extends lambda.SingletonFunction {
  public readonly handler: string;
  constructor(scope: Construct, id: string, props: EventHandlerProps) {
    super(scope, id, {
      uuid: `${props.handler}`,
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../src/handlers')),
      handler: props.handler,
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_9,
      layers: [Boto3LayerVersion.getOrCreate(scope).lambdaLayer],
      role: HandlerRole.getOrCreate(scope).role,
      logRetention: logs.RetentionDays.ONE_DAY,
    });
    this.handler = props.handler;
  }
}