/* eslint-disable max-depth */
/* eslint-disable complexity */
import path from "path";
import { createGenerator } from "ts-json-schema-generator";

type ContractLike = {
  properties: DetailType & DetailVersion;
};

type DetailType = {
  "detail-type": {
    const: string;
  };
};

type DetailVersion = {
  detail: {
    properties: {
      "detail-version": {
        const: number;
      };
    };
  };
};

const isObject = (field: unknown): field is object =>
  typeof field === "object" && field !== null;

const isString = (field: unknown): field is string => typeof field === "string";

const isNumber = (field: unknown): field is number => typeof field === "number";

const hasDetailTypeConst = (field: object): field is DetailType =>
  "detail-type" in field &&
  isObject(field["detail-type"]) &&
  "const" in field["detail-type"] &&
  isString(field["detail-type"].const);

const hasDetailVersionConst = (field: object): field is DetailVersion => {
  if (hasDetailTypeConst(field)) {
    if ("detail" in field && isObject(field.detail)) {
      if ("properties" in field.detail && isObject(field.detail.properties)) {
        if (
          "detail-version" in field.detail.properties &&
          isObject(field.detail.properties["detail-version"])
        ) {
          if (
            "const" in field.detail.properties["detail-version"] &&
            isNumber(field.detail.properties["detail-version"].const)
          ) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

const validateContractJsonSchema = (
  contractSchema: object
): contractSchema is ContractLike => {
  if ("properties" in contractSchema && isObject(contractSchema.properties)) {
    if (hasDetailTypeConst(contractSchema.properties)) {
      if (hasDetailVersionConst(contractSchema.properties)) {
        return true;
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
