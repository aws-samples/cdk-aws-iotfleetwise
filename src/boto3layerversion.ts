import * as path from 'path';
import {
  Stack,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class Boto3LayerVersion extends Construct {
  public static getOrCreate(scope: Construct) {
    const stack = Stack.of(scope);
    const id = 'iot-fleetwise-layer-version';
    return stack.node.tryFindChild(id) as Boto3LayerVersion || new Boto3LayerVersion(stack, id);
  }

  public readonly lambdaLayer: lambda.LayerVersion;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.lambdaLayer = new lambda.LayerVersion(this, 'Boto3', {
      description: 'Boto3 Library with Iot Fleetwise Support',
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
      code: lambda.AssetCode.fromAsset(path.join(__dirname, '/../layer.zip')),
    });
  }
}