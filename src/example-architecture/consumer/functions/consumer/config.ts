import { Fn } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { EventBus, Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import {
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Architecture, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { getCdkHandlerPath } from 'example-architecture/helpers/getCdkHandlerPath';

export class Consumer extends Construct {
  public consumerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const lambdaRole = new Role(this, 'ConsumerLambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      description: 'DynamoDB Consumer Role',
    });

    lambdaRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AWSLambdaBasicExecutionRole',
      ),
    );

    const dynamoDBTable = new Table(scope, 'consumerTestTable', {
      tableName: 'consumerTestTable',
      partitionKey: { name: 'pk', type: AttributeType.STRING },
    });

    lambdaRole.addToPolicy(
      new PolicyStatement({
        actions: ['dynamodb:PutItem'],
        resources: [dynamoDBTable.tableArn],
      }),
    );

    this.consumerLambda = new NodejsFunction(this, 'ConsumerLambda', {
      runtime: Runtime.NODEJS_18_X,
      functionName: 'consumerLambda',
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      entry: getCdkHandlerPath(__dirname),
      environment: { TABLE_NAME: dynamoDBTable.tableName },
      role: lambdaRole,
    });

    const eventBusArn: string = Fn.importValue('EventBusARN');

    const eventBus = EventBus.fromEventBusArn(
      this,
      'ExampleArchitectureEventBus',
      eventBusArn,
    );

    const rule = new Rule(this, 'rule', {
      eventPattern: {
        detailType: ['PersonRegisteredContract'],
      },
      eventBus: eventBus,
    });

    rule.addTarget(new LambdaFunction(this.consumerLambda));
  }
}
