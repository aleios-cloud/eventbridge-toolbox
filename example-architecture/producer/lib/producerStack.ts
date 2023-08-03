import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Producer } from "example-architecture/producer/constructs/producer/config";

export class ProducerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Producer(this, "Producer");
  }
}
