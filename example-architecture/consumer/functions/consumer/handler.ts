/* eslint-disable @typescript-eslint/require-await */
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { IEvent } from "src/classes/Event";

const validateEventType = (
  event: IEvent<PersonRegisteredContract>
): boolean => {
  console.log(event);

  return true;
};

export const handler = async (
  event: IEvent<PersonRegisteredContract>
): Promise<IEvent<PersonRegisteredContract>> => {
  if (validateEventType(event)) {
    console.log("Event type is valid!");
  }

  return event;
};
