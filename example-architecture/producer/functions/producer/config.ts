import { Fn } from "aws-cdk-lib";
import {
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Architecture, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCdkHandlerPath } from "example-architecture/helpers/getCdkHandlerPath";

export class Producer extends Construct {
  public producerLambda: IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const eventBusArn: string = Fn.importValue("EventBusARN");

    const lambdaRole = new Role(this, "ProducerLambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      description: "Producer lambda role",
    });

    lambdaRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole",
      ),
    );

    lambdaRole.addToPolicy(
      new PolicyStatement({
        actions: ["events:PutEvents"],
        resources: [eventBusArn],
      }),
    );

    this.producerLambda = new NodejsFunction(this, "ProducerLambda", {
      runtime: Runtime.NODEJS_18_X,
      functionName: "producerLambda",
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
