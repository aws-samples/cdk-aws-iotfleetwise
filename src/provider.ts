import {
  Stack,
  aws_lambda as lambda,
  aws_logs as logs,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';

export class Provider extends Construct {
  public static getOrCreate(
    scope: Construct,
    eventHandler: Handler,
    isCompleteHandler?: Handler,
  ) {
    const stack = Stack.of(scope);
    const id = `${eventHandler.handler}-provider`;
    return stack.node.tryFindChild(id) as Provider || new Provider(stack, id, eventHandler, isCompleteHandler);
  }

  public readonly provider: cr.Provider;
  constructor(
    scope: Construct,
    id: string,
    eventHandler: lambda.SingletonFunction,
    isCompleteHandler?: lambda.SingletonFunction,
  ) {
    super(scope, id);
    this.provider = new cr.Provider(this, 'Provider', {
      onEventHandler: eventHandler,
      ...isCompleteHandler && ({ isCompleteHandler: isCompleteHandler }),
      logRetention: logs.RetentionDays.ONE_DAY,
    });
  }
}
