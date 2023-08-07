import { Lambda } from "@aws-sdk/client-lambda";
import { describe, it, assertType } from "vitest";
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegistedContract";
import { REGION } from "environment";

const lambda = new Lambda({ region: REGION });

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
      assertType<PersonRegisteredContract>(body);
    });
  });
});
