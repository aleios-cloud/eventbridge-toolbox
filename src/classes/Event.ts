import {
  EventBridgeClient,
  PutEventsCommand,
  type PutEventsResponse,
  type PutEventsResultEntry,
} from "@aws-sdk/client-eventbridge";
import { Contract } from "src/types/Contract";

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
  readonly detailVersion: number;
  readonly detailType: string;
  readonly eventContract: Contract;

  constructor(eventContract: Contract) {
    this.eventContract = eventContract;
    this.data = eventContract.data;
    this.detailVersion = eventContract.detailVersion;
    this.detailType = eventContract.detailType;
  }

  getData = (): Record<string, unknown> => {
    return this.data;
  };

  getDetailType = (): string => {
    return this.detailType;
  };

  getDetailVersion = (): number => {
    return this.detailVersion;
  };

  publish = async (
    eventBusArn: string,
    eventSource: string,
  ): Promise<PutEventsResponse> => {
    const params = {
      Entries: [
        {
          Detail: JSON.stringify(this.eventContract),
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
