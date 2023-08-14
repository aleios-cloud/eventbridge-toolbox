import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Consumer } from "example-architecture/consumer/functions/consumer/config";

export class ConsumerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Consumer(this, "Consumer");
  }
}
