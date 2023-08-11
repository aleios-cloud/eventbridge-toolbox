/* eslint-disable @typescript-eslint/require-await */
import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";
import { IEvent } from "src/classes/Event";

export const handler = async (
  event: IEvent<PersonRegisteredContract>
): Promise<IEvent<PersonRegisteredContract>> => {
  return event;
};
