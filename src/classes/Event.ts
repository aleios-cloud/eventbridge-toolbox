import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { EventBus } from "aws-cdk-lib/aws-events";
export interface IEvent<Contract> {
  readonly data: Contract;
}

// Create an Amazon EventBridge service client object.
export const eventBridge = new EventBridgeClient({});

export class Event<Contract> implements IEvent<Contract> {
  readonly data: Contract;

  constructor(contract: Contract) {
    this.data = contract;
  }

  getData = (): Contract => {
    return this.data;
  };

  publish = async (eventBus: EventBus): Promise<void> => {
    const params = {
      Entries: [
        {
          detail: this.data,
          DetailType: "NEED TO PASS THIS IN AS A PARAM",
          eventBus: eventBus.eventBusArn,
        },
      ],
    };
    await eventBridge.send(new PutEventsCommand(params));
  };
}
