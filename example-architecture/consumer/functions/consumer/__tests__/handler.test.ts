import { isIEventType } from "example-architecture/consumer/functions/consumer/handler";
import { describe, expect, it } from "vitest";

describe("Given a producer handler", () => {
  describe("When IEvent type validation function is called", () => {
    it("Then type validation function returns false if event passed in is undefined", () => {
      expect(isIEventType(undefined)).toStrictEqual(false);
    });

    it("Then type validation function returns false if event passed in is not of type object", () => {
      expect(isIEventType("testString")).toStrictEqual(false);
    });

    it("Then type validation function returns false if event passed doesn't contain detail", () => {
      expect(isIEventType({})).toStrictEqual(false);
    });

    it("Then type validation function returns false if data within event passed is undefined", () => {
      expect(isIEventType({ detail: undefined })).toStrictEqual(false);
    });

    it("Then type validation function returns false if detail passed in is not of type object", () => {
      expect(isIEventType({ detail: 100 })).toStrictEqual(false);
    });

    it("Then type validation function returns true if detail within event passed is an object", () => {
      expect(isIEventType({ detail: {} })).toStrictEqual(true);
    });
  });
});
