import {
  EventBridgeClient,
  PutEventsCommand,
  type PutEventsResponse,
  type PutEventsResultEntry,
} from "@aws-sdk/client-eventbridge";
import { Contract, Detail } from "src/types/Contract";

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
  readonly data: Record<string, unknown>;
  readonly "detail-version": number;
  readonly "detail-type": string;
  readonly detail: Detail;

  constructor(eventContract: Contract) {
    this.data = eventContract.detail.data;
    this["detail-version"] = eventContract.detail["detail-version"];
    this["detail-type"] = eventContract["detail-type"];
    this.detail = eventContract.detail;
  }

  getData = (): Record<string, unknown> => {
    return this.data;
  };

  getDetailType = (): string => {
    return this["detail-type"];
  };

  getDetailVersion = (): number => {
    return this["detail-version"];
  };

  publish = async (
    eventBusArn: string,
    eventSource: string,
  ): Promise<PutEventsResponse> => {
    const params = {
      Entries: [
        {
          Detail: JSON.stringify(this.detail),
          Source: eventSource,
          DetailType: this["detail-type"],
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
