import {
  Stack,
  aws_lambda as lambda,
  aws_logs as logs,
  custom_resources as cr,
  Duration,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Handler } from './handler';

export class Provider extends Construct {
  public static getOrCreate(
    scope: Construct,
    eventHandler: Handler,
    isCompleteHandler?: Handler,
    totalTimeout?: Duration,
  ) {
    const stack = Stack.of(scope);
    const id = `${eventHandler.handler}-provider`;
    return (
      stack.node.tryFindChild(id) as Provider ||
      new Provider(stack, id, eventHandler, isCompleteHandler, totalTimeout)
    );
  }

  public readonly provider: cr.Provider;
  constructor(
    scope: Construct,
    id: string,
    eventHandler: lambda.SingletonFunction,
    isCompleteHandler?: lambda.SingletonFunction,
    totalTimeout?: Duration,
  ) {
    super(scope, id);
    this.provider = new cr.Provider(this, 'Provider', {
      onEventHandler: eventHandler,
      ...isCompleteHandler && ({ isCompleteHandler: isCompleteHandler }),
      ...(totalTimeout && { totalTimeout: totalTimeout }),
      logRetention: logs.RetentionDays.ONE_DAY,
    });
  }
}
