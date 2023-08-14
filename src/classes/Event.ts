import {
  EventBridgeClient,
  PutEventsCommand,
  type PutEventsResponse,
  type PutEventsResultEntry,
} from "@aws-sdk/client-eventbridge";

export const eventBridge = new EventBridgeClient({});

const logResponseOnPublishFailure = (entry: PutEventsResultEntry): void => {
  if (entry.ErrorCode !== undefined) {
    console.error("Event failed to publish to event bus.", {
      ErrorCode: entry.ErrorCode,
      ErrorMessage: entry.ErrorMessage,
    });
  }
};

export class Event<Contract> implements IEvent<Contract> {
  readonly detail: Contract;
  readonly eventDetailType: string;

  constructor(eventDetailType: string, eventDetail: Contract) {
    this.eventDetailType = eventDetailType;
    this.detail = eventDetail;
  }

  getDetail = (): Contract => {
    return this.detail;
  };

  getDetailType = (): string => {
    return this.eventDetailType;
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
          DetailType: this.eventDetailType,
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

export interface IEvent<Contract> {
  readonly detail: Contract;
}
