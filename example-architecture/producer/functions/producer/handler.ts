import { type PutEventsResponse } from "@aws-sdk/client-eventbridge";
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { Event } from "src/classes/Event";

export const handler = async (): Promise<PutEventsResponse> => {
  const contract: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  const event = new Event("PersonRegisteredContract", contract);

  const EVENT_BUS_ARN = getEnvVariable("EVENT_BUS_ARN");

  return await event.publish(EVENT_BUS_ARN, "lambda.amazonaws.com");
};
