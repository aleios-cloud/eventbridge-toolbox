import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";

type ConsumerEvent = {
  version: string;
  id: string;
  "detail-type": string;
  source: string;
  account: string;
  time: string;
  region: string;
  resources: string;
  detail: {
    eventVersion: number;
    firstName: string;
    lastName: string;
  };
};

const TABLE_NAME = getEnvVariable("TABLE_NAME");

export const handler = async (event: ConsumerEvent): Promise<void> => {
  console.log(event);
  const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient());

  const params = {
    TableName: TABLE_NAME,
    Item: {
      pk: event.id,
      detailType: event["detail-type"],
      eventVersion: event.detail.eventVersion,
      firstName: event.detail.firstName,
      lastName: event.detail.lastName,
    },
  };

  try {
    await dynamoDB.send(new PutCommand(params));
  } catch (error) {
    console.log("DynamoDB didn't work :(", error);
  }
};
