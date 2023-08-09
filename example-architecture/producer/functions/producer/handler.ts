import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { Event, IEvent } from "src";

export const handler = async (): Promise<IEvent<PersonRegisteredContract>> => {
  const contract: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  const event = new Event(contract);

  const EVENT_BUS_ARN = getEnvVariable("EVENT_BUS_ARN");

  await event.publish(EVENT_BUS_ARN);

  return event;
};
