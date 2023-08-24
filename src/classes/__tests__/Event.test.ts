import { PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { Event } from "src/classes";
import { Contract, Detail } from "src/types";
import { describe, expect, it, vi } from "vitest";

type MockDataDetail = {
  name: string;
  type: string;
};

const mockData: MockDataDetail = {
  name: "mockName",
  type: "mockType",
};

const mockDetail: Detail = {
  "detail-version": 1,
  data: {
    name: "mockName",
    type: "mockType",
  },
};

const mockDataContract: Contract = {
  "detail-type": "MockDataContract",
  detail: {
    "detail-version": 1,
    data: {
      name: "mockName",
      type: "mockType",
    },
  },
};

const mockParams = {
  Entries: [
    {
      Detail: JSON.stringify(mockDetail),
      Source: "mockSource",
      DetailType: "MockDataContract",
      EventBusName: "MOCK_EVENT_BUS_ARN",
    },
  ],
};

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));

vi.mock("@aws-sdk/client-eventbridge", () => {
  return {
    EventBridgeClient: vi.fn().mockReturnValue({
      send: mockSend,
    }),
    PutEventsCommand: vi.fn(),
  };
});

const consoleMock = vi.spyOn(console, "error").mockImplementation(() => {});

describe("Given an Event class", () => {
  const event = new Event(mockDataContract);
  describe("When a user calls publish", () => {
    it("An event is sent to eventBridge", async () => {
      mockSend.mockReturnValueOnce({ Entries: [{ EventId: "mockEventId" }] });
      await event.publish("MOCK_EVENT_BUS_ARN", "mockSource");
      expect(PutEventsCommand).toHaveBeenCalledWith(mockParams);
      expect(mockSend).toHaveBeenCalled();
    });

    it("If publish returns undefined, an error is thrown", async () => {
      mockSend.mockReturnValueOnce({ Entries: undefined });
      await event.publish("MOCK_EVENT_BUS_ARN", "mockSource");
      expect(mockSend).toHaveBeenCalled();
      expect(consoleMock).toHaveBeenCalledWith(
        "Error publishing event to event bus",
      );
    });

    it("If publish returns error response, an error is thrown", async () => {
      mockSend.mockReturnValueOnce({
        Entries: [
          { ErrorCode: "mockErrorCode", ErrorMessage: "mockErrorMessage" },
        ],
      });
      await event.publish("MOCK_EVENT_BUS_ARN", "mockSource");
      expect(mockSend).toHaveBeenCalled();
      expect(consoleMock).toHaveBeenCalledWith(
        "Event failed to publish to event bus.",
        {
          ErrorCode: "mockErrorCode",
          ErrorMessage: "mockErrorMessage",
        },
      );
    });
  });
  describe("When a user calls getData", () => {
    it("The event data is returned", () => {
      expect(event.getData()).toStrictEqual(mockData);
    });
  });
  describe("When a user calls getDetailType", () => {
    it("The event detail type is returned", () => {
      expect(event.getDetailType()).toStrictEqual("MockDataContract");
    });
  });
  describe("When a user calls getVersion", () => {
    it("The detail version is returned", () => {
      expect(event.getDetailVersion()).toStrictEqual(1);
    });
  });
});
