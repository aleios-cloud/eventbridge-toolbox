import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { ConsumerEvent } from "src/types/ConsumerEvent";

export const handler = async (
  event: ConsumerEvent<PersonRegisteredContract>,
): Promise<void> => {
  const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient());

  const TABLE_NAME = getEnvVariable("TABLE_NAME");

  const params = {
    TableName: TABLE_NAME,
    Item: {
      pk: event.id,
      detailType: event["detail-type"],
      detailVersion: event.detail.detailVersion,
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
