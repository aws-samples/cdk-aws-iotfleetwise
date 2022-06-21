import {
  Stack,
  aws_lambda as lambda,
  aws_logs as logs,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class Provider extends Construct {
  public static getOrCreate(scope: Construct, handler: lambda.SingletonFunction) {
    const stack = Stack.of(scope);
    const id = `${handler.node.id}-provider`;
    return stack.node.tryFindChild(id) as Provider || new Provider(stack, id, handler);
  }
 
  public readonly provider: cr.Provider;
  constructor(scope: Construct, id: string, handler: lambda.SingletonFunction) {
    super(scope, id);
    this.provider = new cr.Provider(this, 'FleetProvider', {
      onEventHandler: handler,
      logRetention: logs.RetentionDays.ONE_DAY,
    })
  }
}
