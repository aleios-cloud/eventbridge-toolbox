import { describe, expect, it } from "vitest";

import { isIEventType } from "../handler";

describe("Given a producer handler", () => {
  describe("With IEvent type validation function", () => {
    it("IEvent returns false if event passed in is undefined", () => {
      expect(isIEventType(undefined)).toStrictEqual(false);
    });

    it("IEvent returns false if event passed in is not of type object", () => {
      expect(isIEventType("testString")).toStrictEqual(false);
    });

    it("IEvent returns false if event passed doesn't contain data", () => {
      expect(isIEventType({})).toStrictEqual(false);
    });

    it("IEvent returns false if data within event passed is undefined", () => {
      expect(isIEventType({ data: undefined })).toStrictEqual(false);
    });

    it("IEvent returns false if data passed in is not of type object", () => {
      expect(isIEventType({ data: 100 })).toStrictEqual(false);
    });

    it("IEvent returns true if data within event passed is an object", () => {
      expect(isIEventType({ data: {} })).toStrictEqual(true);
    });
  });
});
