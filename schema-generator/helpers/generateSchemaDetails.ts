import path from "path";
import { createGenerator } from "ts-json-schema-generator";

import { isValidJsonSchemaContract, SchemaDetails } from "./utils";

export const generateSchemaDetails = (
  pathToContractsFolder: string,
  contractFilename: string,
): SchemaDetails => {
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

  //TODO: validate that detailType would be a valid filename
  if (isValidJsonSchemaContract(contractSchema)) {
    return {
      detailType: contractSchema.properties["detail-type"].const,
      detailVersion:
        contractSchema.properties.detail.properties[
          "detail-version"
        ].const.toString(),
      schema: contractSchema,
    };
  } else {
    throw "ghjk";
  }
};
