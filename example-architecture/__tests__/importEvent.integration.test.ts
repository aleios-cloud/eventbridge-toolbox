/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type PutEventsResponse } from "@aws-sdk/client-eventbridge";
import { Lambda } from "@aws-sdk/client-lambda";
import { describe, expect, it } from "vitest";

const lambda = new Lambda({ region: "eu-west-2" });

describe("Given a producer lambda that returns a Contract", () => {
  const params = {
    FunctionName: "producerLambda",
  };
  describe("When that lambda is invoked", async () => {
    const invokedLambda = await lambda.invoke(params);

    it("Response with an eventId is returned without an error", () => {
      const body: PutEventsResponse = JSON.parse(
        Buffer.from(invokedLambda.Payload ?? "").toString(),
      );
      expect(body.Entries).toEqual([
        expect.objectContaining({ EventId: expect.any(String) }),
      ]);
      expect(body.Entries).toEqual([
        expect.not.objectContaining({
          ErrorCode: expect.any(String),
          ErrorMessage: expect.any(String),
        }),
      ]);
    });
  });
});
