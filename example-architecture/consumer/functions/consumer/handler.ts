/* eslint-disable @typescript-eslint/require-await */

export const validateIEventType = (event: unknown): boolean => {
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
  if (validateIEventType(event)) {
    console.log("Event type is valid!");
  }
};
