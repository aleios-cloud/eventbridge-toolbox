import { handler } from "example-architecture/producer/functions/producer/handler";
import { describe, expect, it, vi } from "vitest";

const { mockPublish } = vi.hoisted(() => ({
  mockPublish: vi.fn(),
}));

mockPublish.mockReturnValue({
  eventId: "mockEventId",
});

vi.mock("src/classes/Event", () => {
  return {
    Event: vi.fn().mockReturnValue({
      publish: mockPublish,
    }),
  };
});

process.env.EVENT_BUS_ARN = "mockArn";

describe("Given a producer handler", () => {
  describe("When that handler is run", () => {
    it("The handler returns with the output of publish", async () => {
      const result = await handler();
      expect(mockPublish).toBeCalledWith("mockArn", "lambda.amazonaws.com");
      expect(result).toStrictEqual({
        eventId: "mockEventId",
      });
    });
  });
});
