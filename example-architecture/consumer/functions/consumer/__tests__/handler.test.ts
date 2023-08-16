import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { handler } from "example-architecture/consumer/functions/consumer/handler";
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { describe, expect, it, vi } from "vitest";

process.env.TABLE_NAME = "mockTableName";

const mockParams = {
  TableName: "mockTableName",
  Item: {
    pk: "mockId",
    detailType: "mockDetailType",
    detailVersion: 1,
    firstName: "mockFirstName",
    lastName: "mockLastName",
  },
};

const { mockFrom } = vi.hoisted(() => ({
  mockFrom: vi.fn(),
}));

vi.mock("@aws-sdk/lib-dynamodb", async () => {
  const actualModule = await vi.importActual<object>("@aws-sdk/lib-dynamodb");

  return {
    ...actualModule,
    DynamoDBDocumentClient: vi.fn().mockReturnValue({
      from: mockFrom,
    }),
    PutCommand: vi.fn(),
  };
});

DynamoDBDocumentClient.from = vi.fn();

const mockContract: PersonRegisteredContract = {
  detailVersion: 1,
  detailType: "PersonRegisteredContract",
  data: {
    firstName: "mockFirstName",
    lastName: "mockLastName",
  },
};

const mockEvent = {
  version: "mockdetailVersion",
  id: "mockId",
  "detail-type": "mockDetailType",
  source: "mockSource",
  account: "mockSccount",
  time: "mockTime",
  region: "mockRegion",
  resources: "mockResources",
  detail: mockContract,
};

vi.spyOn(console, "error").mockImplementation(() => {});

describe("Given a producer handler", () => {
  describe("When that handler is run", () => {
    it("The handler returns with the output of publish", async () => {
      await handler(mockEvent);
      expect(PutCommand).toHaveBeenCalledWith(mockParams);
    });
  });
});
