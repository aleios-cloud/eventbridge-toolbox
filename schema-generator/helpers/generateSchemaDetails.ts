import path from "path";
import { createGenerator } from "ts-json-schema-generator";

//TODO: We have to use relative paths here as apparently ts-node doesn't support esm :(
// I think we should investigate a proper fix for this.
import { isValidJsonSchemaContract } from "./utils.js";
import { SchemaDetails } from "../types.js";

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
    throw "Contracts types are incorrect. A const value much be set for 'detail-type' and 'detail-version'.";
  }
};
