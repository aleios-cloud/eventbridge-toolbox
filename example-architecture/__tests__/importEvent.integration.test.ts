/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  DynamoDBClient,
  GetItemCommand,
  type GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import {
  type PutEventsResponse,
  type PutEventsResultEntry,
} from "@aws-sdk/client-eventbridge";
import { Lambda } from "@aws-sdk/client-lambda";
import { describe, expect, it } from "vitest";

const lambda = new Lambda({ region: "eu-west-2" });
const client = new DynamoDBClient();

const getDynamoDBCommand = (eventId: string): GetItemCommand =>
  new GetItemCommand({
    TableName: "consumerTestTable",
    Key: {
      pk: {
        S: eventId,
      },
    },
  });

const queryDynamodbReturnsItem = async (
  eventId: string,
): Promise<GetItemCommandOutput | undefined> => {
  try {
    const itemResponse = await client.send(getDynamoDBCommand(eventId));

    return "Item" in itemResponse ? itemResponse : undefined;
  } catch (error) {
    console.error("DynamoDB get GetItemCommand didn't work :(", error);

    return undefined;
  }
};

const getEventId = (
  events: PutEventsResultEntry[] | undefined,
): string | undefined =>
  events === undefined || events.length === 0 || events[0].EventId === undefined
    ? undefined
    : events[0].EventId;

const wait = (interval: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, interval);
  });

const pollDynamoDB = async (
  events: PutEventsResultEntry[] | undefined,
): Promise<object> => {
  const eventId = getEventId(events);
  if (eventId === undefined) return {};

  let result = await queryDynamodbReturnsItem(eventId);
  while (result === undefined) {
    await wait(500);
    result = await queryDynamodbReturnsItem(eventId);
  }

  return result;
};

describe("Given a producer lambda that returns a Contract", () => {
  const params = {
    FunctionName: "producerLambda",
  };
  describe("When that lambda is invoked and returns an event response", async () => {
    const invokedLambda = await lambda.invoke(params);
    const body: PutEventsResponse = JSON.parse(
      Buffer.from(invokedLambda.Payload ?? "").toString(),
    );

    it("Response with an eventId is returned without an error", () => {
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

    it("Response event is put into dynamoDB table by the consumer", async () => {
      expect(await pollDynamoDB(body.Entries)).toMatchObject({
        Item: {
          pk: expect.objectContaining({
            S: expect.any(String),
          }),
          detailType: {
            S: "PersonRegisteredContract",
          },
          eventVersion: { N: "1" },
          firstName: {
            S: "testFirstName",
          },
          lastName: {
            S: "testLastName",
          },
        },
      });
    });
  });
});
