import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

import { Duration } from "aws-cdk-lib";
import { Architecture, Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { getCdkHandlerPath } from "example-architecture/producer/constructs/producer/helpers/getCdkHandlerPath";
export class Producer extends Construct {
  public producerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.producerLambda = new NodejsFunction(this, "producer-lambda", {
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      tracing: Tracing.ACTIVE,
      memorySize: 1024,
      entry: getCdkHandlerPath(__dirname),
      timeout: Duration.seconds(20),
      retryAttempts: 2,
      deadLetterQueueEnabled: true,
    });
  }
}
