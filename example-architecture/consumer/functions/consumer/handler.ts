import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { Contract } from "src/types/Contract";

type EventBridgeConsumerEvent = {
  id: string;
  version: string;
  account: string;
  time: string;
  region: string;
  resources: string[];
  source: string;
} & Contract;

export const handler = async (
  event: EventBridgeConsumerEvent,
): Promise<void> => {
  const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient());

  const TABLE_NAME = getEnvVariable("TABLE_NAME");

  const params = {
    TableName: TABLE_NAME,
    Item: {
      pk: event.id,
      detailType: event["detail-type"],
      "detail-version": event.detail["detail-version"],
      firstName: event.detail.data.firstName,
      lastName: event.detail.data.lastName,
    },
  };

  try {
    const putCommand = new PutCommand(params);
    await dynamoDB.send(putCommand);
  } catch (error) {
    console.error("DynamoDB PutCommand didn't work :(", error);
  }
};
