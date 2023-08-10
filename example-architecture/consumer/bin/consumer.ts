import { App } from "aws-cdk-lib";

import { ConsumerStack } from "../lib/consumerStack";

const app = new App();
new ConsumerStack(app, "ConsumerStack");
