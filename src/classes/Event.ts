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

    return await eventBridge.send(new PutEventsCommand(params));
  };
}

export interface IEvent<Contract> {
  readonly data: Contract;
}
