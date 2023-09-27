import {
  Stack,
  aws_iam as iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class HandlerRole extends Construct {
  public static getOrCreate(scope: Construct) {
    const stack = Stack.of(scope);
    const id = 'handler-role';
    return stack.node.tryFindChild(id) as HandlerRole || new HandlerRole(stack, id);
  }

  public readonly role: iam.Role;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    this.role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        's3:*',
        'iam:PutRolePolicy',
        'iam:PassRole',
        'iotfleetwise:*',
        'iot:DescribeThing',
        'iot:CreateThing',
        'iot:CreateKeysAndCertificate',
        'iot:DescribeEndpoint',
        'iot:ListThingPrincipals',
        'iot:DeleteCertificate',
        'iot:DeleteThing',
        'timestream:DescribeEndpoints',
        'timestream:DescribeDatabase',
        'timestream:DescribeTable',
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents',
        'logs:DescribeLogGroups',
        'logs:CreateLogDelivery',
        'logs:GetLogDelivery',
        'logs:UpdateLogDelivery',
        'logs:DeleteLogDelivery',
        'logs:ListLogDeliveries',
        'logs:PutResourcePolicy',
        'logs:DescribeResourcePolicies',
        'logs:DescribeLogGroups',
        'logs:DeleteLogGroup',
      ],
      resources: ['*'],
    }));
  }
}