import path from "path";
import { createGenerator } from "ts-json-schema-generator";

import { ContractSchemaType, isValidJsonSchemaContract } from "./utils.js";

export const generateContractSchema = (
  pathToContractsFolder: string,
  contractFilename: string,
): {
  detailType: string;
  detailVersion: number;
  schema: ContractSchemaType;
} => {
  const pathToContractFile = path.join(pathToContractsFolder, contractFilename);

  const typeToSchemaConfig = {
    path: pathToContractFile,
    tsconfig: path.join(process.cwd(), "/tsconfig.json"),
    topRef: false,
    type: "*",
  };

  const contractSchema = createGenerator(typeToSchemaConfig).createSchema(
    typeToSchemaConfig.type,
  );

  if (isValidJsonSchemaContract(contractSchema)) {
    return {
      detailType: contractSchema.properties["detail-type"].const,
      detailVersion:
        contractSchema.properties.detail.properties["detail-version"].const,
      schema: contractSchema,
    };
  } else {
    throw "ghjk";
  }
};
