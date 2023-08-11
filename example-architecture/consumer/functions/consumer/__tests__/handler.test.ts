import { describe, expect, it } from "vitest";

import { validateIEventType } from "../handler";

describe("Given a producer handler", () => {
  describe("With IEvent type validation function", () => {
    it("IEvent returns false if event passed in is undefined", () => {
      expect(validateIEventType(undefined)).toStrictEqual(false);
    });

    it("IEvent returns false if event passed in is not of type object", () => {
      expect(validateIEventType("testString")).toStrictEqual(false);
    });

    it("IEvent returns false if event passed doesn't contain data", () => {
      expect(validateIEventType({})).toStrictEqual(false);
    });

    it("IEvent returns false if data within event passed is undefined", () => {
      expect(validateIEventType({ data: undefined })).toStrictEqual(false);
    });

    it("IEvent returns true if data within event passed is an object", () => {
      expect(validateIEventType({ data: {} })).toStrictEqual(true);
    });
  });
});
