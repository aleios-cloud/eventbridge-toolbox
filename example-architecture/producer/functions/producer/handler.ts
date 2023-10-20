import { type PutEventsResponse } from "@aws-sdk/client-eventbridge";
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContractV1";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { Event } from "dist/classes/Event";

export const handler = async (): Promise<PutEventsResponse> => {
  const contract: PersonRegisteredContract = {
    "detail-type": "PersonRegisteredContract",
    detail: {
      "detail-version": 1,
      data: { firstName: "testFirstName", lastName: "testLastName" },
    },
  };

  const event = new Event(contract);

  const EVENT_BUS_ARN = getEnvVariable("EVENT_BUS_ARN");

  return await event.publish(EVENT_BUS_ARN, "lambda.amazonaws.com");
};
