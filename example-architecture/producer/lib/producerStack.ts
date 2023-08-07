import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Producer } from "example-architecture/producer/functions/producer/config";

export class ProducerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Producer(this, "Producer");
  }
}
