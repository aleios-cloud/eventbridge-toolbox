import {
  EventBridgeClient,
  PutEventsCommand,
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

  publish = async (eventBusArn: string): Promise<void> => {
    const params = {
      Entries: [
        {
          detail: this.data,
          EventBusName: eventBusArn,
        },
      ],
    };
    await eventBridge.send(new PutEventsCommand(params));
  };
}

export interface IEvent<Contract> {
  readonly data: Contract;
}
