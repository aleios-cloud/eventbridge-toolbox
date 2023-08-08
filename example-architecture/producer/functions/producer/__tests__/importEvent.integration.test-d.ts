import { Lambda } from "@aws-sdk/client-lambda";
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { getEnvVariable } from "example-architecture/producer/functions/producer/helpers/getEnvVariable";
import { IEvent } from "src/classes/Event";
import { assertType, describe, it } from "vitest";

const lambda = new Lambda({ region: getEnvVariable("AWS_REGION") });

describe("Given a producer lambda that returns a Contract", () => {
  const params = {
    FunctionName: "producer-lambda",
  };
  describe("When that lambda is invoked", async () => {
    const invokedLambda = await lambda.invoke(params);

    it("An event is returned ", () => {
      const body: IEvent<PersonRegisteredContract> = JSON.parse(
        Buffer.from(invokedLambda.Payload ?? "").toString(),
      ) as IEvent<PersonRegisteredContract>;
      assertType<PersonRegisteredContract>(body.data);
    });
  });
});
