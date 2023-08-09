import { describe, expect, it, vi } from "vitest";

import { handler } from "../handler";

const { mockPublish } = vi.hoisted(() => ({
  mockPublish: vi.fn(),
}));

const { mockGetData } = vi.hoisted(() => ({
  mockGetData: vi.fn(),
}));

mockGetData.mockReturnValue({ mockKey: "mockValue" });

vi.mock("src/classes/Event", async () => {
  const actualModule = await vi.importActual<object>("src/classes/Event");

  return {
    ...actualModule,
    Event: vi.fn().mockReturnValue({
      publish: mockPublish,
      getData: mockGetData,
    }),
  };
});

process.env.EVENT_BUS_ARN = "mockArn";

describe("Given a producer handler", () => {
  describe("When that handler is run", () => {
    it("An event publish function is called with an event bus ARN", async () => {
      await handler();
      expect(mockPublish).toBeCalledWith("mockArn");
    });

    it("The handler returns with the output of getData", async () => {
      const result = await handler();
      expect(result).toStrictEqual({ mockKey: "mockValue" });
    });
  });
});
