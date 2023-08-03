import * as AWS from "@aws-sdk/client-lambda";
import { describe, it, assertType } from "vitest";
import { ExamplePersonContract } from "example-architecture/events";
import { REGION } from "example-architecture/producer/constants";

const lambda = new AWS.Lambda({ region: REGION });

describe("Given a producer lambda that returns a Contract", () => {
  const params = {
    FunctionName: "producer-lambda",
  };
  describe("When that lambda is invoked", async () => {
    const invokedLambda = await lambda.invoke(params);

    it("The body returned is of type Contract ", () => {
      const body = JSON.parse(
        Buffer.from(invokedLambda.Payload ?? "").toString()
      );
      assertType<ExamplePersonContract>(body);
    });
  });
});
