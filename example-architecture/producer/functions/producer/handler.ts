import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { getEnvVariable } from "example-architecture/helpers/getEnvVariable";
import { Event } from "src/classes/Event";

export const handler = async (): Promise<PersonRegisteredContract> => {
  const contract: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  const event = new Event(contract);

  const EVENT_BUS_ARN = getEnvVariable("EVENT_BUS_ARN");

  await event.publish(EVENT_BUS_ARN);

  return event.getData();
};
