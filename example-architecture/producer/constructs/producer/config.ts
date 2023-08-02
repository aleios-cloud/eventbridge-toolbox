import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";

import { Duration } from "aws-cdk-lib";
import { Architecture, Runtime, Tracing } from "aws-cdk-lib/aws-lambda";

export class Lambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    super(scope, id, {
      ...props,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      tracing: Tracing.ACTIVE,
      memorySize: 1024,
      timeout: Duration.seconds(20),
      retryAttempts: 2,
      deadLetterQueueEnabled: true,
    });
  }
}

export class Producer extends Construct {
  public producerLambda: IFunction;


  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.producerLambda = new Lambda(scope, "producer-lambda", {
      entry: "./handler",
    });
  }
}
