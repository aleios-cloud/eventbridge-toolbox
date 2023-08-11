/* eslint-disable @typescript-eslint/require-await */

import { IEvent } from "src/classes/Event";

// Note: This is odd validation currently because we have not added metadata.
// Once we have added our own metdaata we can test that it is appearing. At the moment we are just checking that an
// object is attached to our event (this is our contract)
const isNonNullObject = (detail: unknown): detail is object =>
  typeof detail === "object" && detail !== null;

export const isIEventType = <Contract>(
  event: unknown
): event is IEvent<Contract> => {
  if (isNonNullObject(event)) {
    if ("detail" in event && isNonNullObject(event.detail)) {
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
