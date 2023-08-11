import { Fn } from "aws-cdk-lib";
import { EventBus, Rule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Architecture, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCdkHandlerPath } from "example-architecture/helpers/getCdkHandlerPath";

export class Consumer extends Construct {
  public consumerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.consumerLambda = new NodejsFunction(this, "ConsumerLambda", {
      runtime: Runtime.NODEJS_18_X,
      functionName: "consumerLambda",
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      entry: getCdkHandlerPath(__dirname),
    });

    const eventBusArn: string = Fn.importValue("EventBusARN");

    const eventBus = EventBus.fromEventBusArn(
      this,
      "ExampleArchitectureEventBus",
      eventBusArn,
    );

    const rule = new Rule(this, "rule", {
      eventPattern: {
        detailType: ["eventContractData"],
      },
      eventBus: eventBus,
    });

    rule.addTarget(new LambdaFunction(this.consumerLambda));
  }
}
