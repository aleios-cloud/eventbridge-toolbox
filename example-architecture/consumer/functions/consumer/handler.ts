/* eslint-disable @typescript-eslint/require-await */

import { IEvent } from "src/classes/Event";

const isNonNullObject = (data: unknown): data is object =>
  typeof data === "object" && data !== null;

export const isIEventType = <Contract>(
  event: unknown,
): event is IEvent<Contract> => {
  if (isNonNullObject(event)) {
    if ("data" in event && isNonNullObject(event.data)) {
      return true;
    }
  }

  return false;
};

export const handler = async (event: unknown): Promise<void> => {
  if (isIEventType(event)) {
    console.log("Event type is valid!");
  }
};
