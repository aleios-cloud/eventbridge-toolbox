import { describe, expect, it } from "vitest";

import { isValidJsonSchemaContract } from "../../helpers/utils";

const invalidDetailTypeSchema: object = {
  "detail-type": {
    const: 234,
  },
};

const validDetailTypeSchema: object = {
  "detail-type": {
    const: "PersonRegisteredContract",
  },
};

const invalidDetailVersionSchema: object = {
  detail: {
    properties: {
      "detail-version": {
        const: "invalidConst",
      },
    },
  },
};

const validDetailVersionSchema: object = {
  detail: {
    properties: {
      "detail-version": {
        const: 1,
      },
    },
  },
};

export const createJsonObject = (partialData?: object): object => ({
  properties: {
    ...partialData,
  },
});

describe("Given a set of utils functions", () => {
  describe("We can validate a jsonSchema", () => {
    it("Returns true if given a jsonObject contains required fields", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailVersionSchema,
            ...validDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(true);
    });

    it("Returns false if given a jsonObject is missing detailVersion", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject is missing detailType", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailVersionSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject contains invalid detailType", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailVersionSchema,
            ...invalidDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject contains invalid detailVersion", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...invalidDetailVersionSchema,
            ...validDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(false);
    });
  });
});
