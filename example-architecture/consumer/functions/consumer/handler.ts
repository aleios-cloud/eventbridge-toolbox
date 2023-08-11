/* eslint-disable @typescript-eslint/require-await */

import { IEvent } from "src/classes/Event";

export const isIEventType = <Contract>(
  event: unknown,
): event is IEvent<Contract> => {
  if (typeof event === "object" && event !== null) {
    if (
      "data" in event &&
      typeof event.data === "object" &&
      event.data !== null
    ) {
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
