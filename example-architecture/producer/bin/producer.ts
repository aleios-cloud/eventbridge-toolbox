#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { ProducerStack } from "../lib/producerStack";

const app = new App();
new ProducerStack(app, "ProducerStack", {
});
