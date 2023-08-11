import { isConsumerContractType } from "example-architecture/consumer/functions/consumer/handler";
import { describe, expect, it } from "vitest";

describe("Given a producer handler", () => {
  describe("With ConsumerContract type validation function", () => {
    it("Type validation function returns false if event passed in is undefined", () => {
      expect(isConsumerContractType(undefined)).toStrictEqual(false);
    });

    it("Type validation function returns false if event passed in is not of type object", () => {
      expect(isConsumerContractType("testString")).toStrictEqual(false);
    });

    it("Type validation function returns false if event passed doesn't contain detail", () => {
      expect(isConsumerContractType({})).toStrictEqual(false);
    });

    it("Type validation function returns false if data within event passed is undefined", () => {
      expect(isConsumerContractType({ detail: undefined })).toStrictEqual(
        false,
      );
    });

    it("Type validation function returns false if detail passed in is not of type object", () => {
      expect(isConsumerContractType({ detail: 100 })).toStrictEqual(false);
    });

    it("Type validation function returns true if detail within event passed is an object", () => {
      expect(isConsumerContractType({ detail: {} })).toStrictEqual(true);
    });
  });
});
