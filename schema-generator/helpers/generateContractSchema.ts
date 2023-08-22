/* eslint-disable max-depth */
/* eslint-disable complexity */
import path from "path";
import { createGenerator } from "ts-json-schema-generator";

type ContractLike = {
  properties: {
    "detail-type": {
      const: string;
    };
    detail: {
      properties: {
        "detail-version": {
          const: number;
        };
      };
    };
  };
};

const isObject = (field: unknown): field is object =>
  typeof field === "object" && field !== null;

const isString = (field: unknown): field is string => typeof field === "string";

const isNumber = (field: unknown): field is number => typeof field === "number";

const validateContractJsonSchema = (
  contractSchema: object
): contractSchema is ContractLike => {
  if ("properties" in contractSchema && isObject(contractSchema.properties)) {
    console.log("hey");
    if (
      "detail-type" in contractSchema.properties &&
      isObject(contractSchema.properties["detail-type"]) &&
      "const" in contractSchema.properties["detail-type"] &&
      isString(contractSchema.properties["detail-type"].const)
    ) {
      if (
        "detail" in contractSchema.properties &&
        isObject(contractSchema.properties.detail)
      ) {
        if (
          "properties" in contractSchema.properties.detail &&
          isObject(contractSchema.properties.detail.properties)
        ) {
          if (
            "detail-version" in contractSchema.properties.detail.properties &&
            isObject(
              contractSchema.properties.detail.properties["detail-version"]
            )
          ) {
            if (
              "const" in
                contractSchema.properties.detail.properties["detail-version"] &&
              isNumber(
                contractSchema.properties.detail.properties["detail-version"]
                  .const
              )
            ) {
              return true;
            }
          }
        }
      }
    }
  }

  return false;
};

export const generateContractSchema = (
  pathToContractsFolder: string,
  contractFilename: string
): { detailType: string; detailVersion: number } => {
  const pathToContractFile = path.join(pathToContractsFolder, contractFilename);

  const typeToSchemaConfig = {
    path: pathToContractFile,
    tsconfig: path.join(process.cwd(), "/tsconfig.json"),
    topRef: false,
    type: "*",
  };

  const contractSchema = createGenerator(typeToSchemaConfig).createSchema(
    typeToSchemaConfig.type
  );

  if (validateContractJsonSchema(contractSchema)) {
    console.log("it's valid :)");

    return {
      detailType: contractSchema.properties["detail-type"].const,
      detailVersion:
        contractSchema.properties.detail.properties["detail-version"].const,
    };
  } else {
    throw "ghjk";
  }
};
