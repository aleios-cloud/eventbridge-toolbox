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

const hasConst = (field: object, constType: string): boolean =>
  "const" in field && typeof field.const === constType;

const hasDetailTypeConst = (field: object): field is DetailType =>
  "detail-type" in field &&
  isObject(field["detail-type"]) &&
  hasConst(field["detail-type"], "string");

const hasDetailVersionConst = (field: object): field is DetailVersion => {
  if ("detail" in field && isObject(field.detail)) {
    if ("properties" in field.detail && isObject(field.detail.properties)) {
      if (
        "detail-version" in field.detail.properties &&
        isObject(field.detail.properties["detail-version"]) &&
        hasConst(field.detail.properties["detail-version"], "number")
      ) {
        return true;
      }
    }
  }

  return false;
};

const isValidJsonSchemaContract = (
  contractSchema: object
): contractSchema is ContractLike => {
  if ("properties" in contractSchema && isObject(contractSchema.properties)) {
    if (
      !hasDetailTypeConst(contractSchema.properties) ||
      !hasDetailVersionConst(contractSchema.properties)
    ) {
      return false;
    }
  }

  return true;
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

  if (isValidJsonSchemaContract(contractSchema)) {
    return {
      detailType: contractSchema.properties["detail-type"].const,
      detailVersion:
        contractSchema.properties.detail.properties["detail-version"].const,
    };
  } else {
    throw "ghjk";
  }
};
