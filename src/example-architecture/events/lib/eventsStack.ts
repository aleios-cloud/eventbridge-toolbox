import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class EventsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const eventBus = new EventBus(this, 'ExampleArchitectureEventBus', {
      eventBusName: 'exampleArchitectureEventBus',
    });

    new CfnOutput(this, 'EventBusARN', {
      value: eventBus.eventBusArn,
      exportName: 'EventBusARN',
    });
  }
}
