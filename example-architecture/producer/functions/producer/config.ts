import { Fn } from "aws-cdk-lib";
import { PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Architecture, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCdkHandlerPath } from "example-architecture/helpers/getCdkHandlerPath";

export class Producer extends Construct {
  public producerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const eventBusArn: string = Fn.importValue("EventBusARN");

    const lambdaRole = new Role(this, "Role", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      description: "Producer lambda role",
    });

    lambdaRole.addToPolicy(
      new PolicyStatement({
        actions: ["events:PutEvents"],
        resources: [eventBusArn],
      }),
    );

    this.producerLambda = new NodejsFunction(this, "producer-lambda", {
      runtime: Runtime.NODEJS_18_X,
      functionName: "producer-lambda",
      architecture: Architecture.ARM_64,
      memorySize: 1024,
      entry: getCdkHandlerPath(__dirname),
      role: lambdaRole,
      environment: {
        EVENT_BUS_ARN: eventBusArn,
      },
    });
  }
}
