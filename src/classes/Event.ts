import {
  EventBridgeClient,
  PutEventsCommand,
  type PutEventsResponse,
  type PutEventsResultEntry,
} from "@aws-sdk/client-eventbridge";
import { Contract } from "src/classes/types";

export const eventBridge = new EventBridgeClient({});

const logResponseOnPublishFailure = (entry: PutEventsResultEntry): void => {
  if (entry.ErrorCode !== undefined) {
    console.error("Event failed to publish to event bus.", {
      ErrorCode: entry.ErrorCode,
      ErrorMessage: entry.ErrorMessage,
    });
  }
};

export class Event implements Contract {
  readonly detail: object;
  readonly version: number;
  readonly detailType: string;

  constructor(eventContract: Contract) {
    this.detail = eventContract.detail;
    this.version = eventContract.version;
    this.detailType = eventContract.detailType;
  }

  getDetail = (): object => {
    return this.detail;
  };

  getDetailType = (): string => {
    return this.detailType;
  };

  getVersion = (): number => {
    return this.version;
  };

  publish = async (
    eventBusArn: string,
    eventSource: string,
  ): Promise<PutEventsResponse> => {
    const params = {
      Entries: [
        {
          Detail: JSON.stringify({
            eventVersion: this.version,
            ...this.detail,
          }),
          Source: eventSource,
          DetailType: this.detailType,
          EventBusName: eventBusArn,
        },
      ],
    };

    const eventBridgeResponse = await eventBridge.send(
      new PutEventsCommand(params),
    );
    if (eventBridgeResponse.Entries === undefined) {
      console.error("Error publishing event to event bus");
    } else {
      eventBridgeResponse.Entries.forEach((entry) =>
        logResponseOnPublishFailure(entry),
      );
    }

    return eventBridgeResponse;
  };
}
