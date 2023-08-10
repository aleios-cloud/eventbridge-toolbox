import { PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { Event } from "src/classes/Event";
import { describe, expect, it, vi } from "vitest";

type MockDataContract = {
  name: string;
  type: string;
};

const mockData: MockDataContract = {
  name: "mockName",
  type: "mockType",
};

const mockParams = {
  Entries: [
    {
      Detail: JSON.stringify(mockData),
      Source: "lambda.amazonaws.com",
      DetailType: "eventContractData",
      EventBusName: "MOCK_EVENT_BUS_ARN",
    },
  ],
};

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));

vi.mock("@aws-sdk/client-eventbridge", async () => {
  const actualModule = await vi.importActual<object>(
    "@aws-sdk/client-eventbridge",
  );

  return {
    ...actualModule,
    EventBridgeClient: vi.fn().mockReturnValue({
      send: mockSend,
    }),
    PutEventsCommand: vi.fn(),
  };
});

describe("Given an Event class", () => {
  const event = new Event(mockData);
  describe("When a user calls publish", () => {
    it("An event is sent to eventBridge", async () => {
      await event.publish("MOCK_EVENT_BUS_ARN");
      expect(PutEventsCommand).toHaveBeenCalledWith(mockParams);
      expect(mockSend).toHaveBeenCalled();
    });
  });
  describe("When a user calls getData", () => {
    it("The event data is returned", () => {
      expect(event.getData()).toStrictEqual(mockData);
    });
  });
});
