import {
  EventBridgeClient,
  PutEventsCommand,
  type PutEventsResponse,
} from "@aws-sdk/client-eventbridge";

export const eventBridge = new EventBridgeClient({});

export class Event<Contract> implements IEvent<Contract> {
  readonly data: Contract;

  constructor(contract: Contract) {
    this.data = contract;
  }

  getData = (): Contract => {
    return this.data;
  };

  publish = async (eventBusArn: string): Promise<PutEventsResponse> => {
    const params = {
      Entries: [
        {
          Detail: JSON.stringify(this.data),
          Source: "lambda.amazonaws.com",
          DetailType: "eventContractData",
          EventBusName: eventBusArn,
        },
      ],
    };

    const eventBridgeResponse = await eventBridge.send(
      new PutEventsCommand(params),
    );
    eventBridgeResponse.Entries?.forEach((entry) => {
      if (entry.ErrorCode !== undefined) {
        console.error("Event failed to publish to event bus.", {
          ErrorCode: entry.ErrorCode,
          ErrorMessage: entry.ErrorMessage,
        });
      }
    });

    return eventBridgeResponse;
  };
}

export interface IEvent<Contract> {
  readonly data: Contract;
}
