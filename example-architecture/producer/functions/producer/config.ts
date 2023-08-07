import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { getCdkHandlerPath } from "example-architecture/producer/functions/producer/helpers/getCdkHandlerPath";
export class Producer extends Construct {
  public producerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.producerLambda = new NodejsFunction(this, "producer-lambda", {
      runtime: Runtime.NODEJS_18_X,
      functionName: "producer-lambda",
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      entry: getCdkHandlerPath(__dirname),
    });
  }
}
