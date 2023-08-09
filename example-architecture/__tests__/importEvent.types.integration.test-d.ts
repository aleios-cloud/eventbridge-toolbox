/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type PutEventsResponse } from "@aws-sdk/client-eventbridge";
import { Lambda } from "@aws-sdk/client-lambda";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { assertType, describe, it } from "vitest";

const lambda = new Lambda({ region: getEnvVariable("AWS_REGION") });

describe("Given a producer lambda that returns a Contract", () => {
  const params = {
    FunctionName: "producer-lambda",
  };
  describe("When that lambda is invoked", async () => {
    const invokedLambda = await lambda.invoke(params);

    it("Event data is returned ", () => {
      const body: PutEventsResponse = JSON.parse(
        Buffer.from(invokedLambda.Payload ?? "").toString(),
      );
      assertType<PutEventsResponse>(body);
    });
  });
});
