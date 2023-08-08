import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { Event, IEvent } from "src";

// The lambda documentation recommends making the handler async, although there is nothing to await
// When synchronous this lambda returns null.
// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (): Promise<IEvent<PersonRegisteredContract>> => {
  const contract: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };
  const event = new Event(contract);

  return event;
};
