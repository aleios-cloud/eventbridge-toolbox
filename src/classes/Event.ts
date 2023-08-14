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
  readonly metadata: MetaData;

  constructor(eventContract: IEvent<Contract>) {
    this.detail = eventContract.detail;
    this.metadata = eventContract.metadata;
  }

  getDetail = (): Contract => {
    return this.detail;
  };

  getDetailType = (): string => {
    return this.metadata.detailType;
  };

  getVersion = (): number => {
    return this.metadata.version;
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
          DetailType: this.metadata.detailType,
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

interface MetaData {
  version: number;
  detailType: string;
}

export interface IEvent<Contract> {
  readonly metadata: MetaData;
  readonly detail: Contract;
}
