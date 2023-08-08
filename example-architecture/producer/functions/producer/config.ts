import { Architecture, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCdkHandlerPath } from "example-architecture/helpers/getCdkHandlerPath";
export class Producer extends Construct {
  public producerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.producerLambda = new NodejsFunction(this, "producer-lambda", {
      runtime: Runtime.NODEJS_16_X,
      functionName: "producer-lambda",
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      entry: getCdkHandlerPath(__dirname),
    });
  }
}
