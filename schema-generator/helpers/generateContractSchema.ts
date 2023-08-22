import path from "path";
import { createGenerator } from "ts-json-schema-generator";


const isObject = (field: unknown): field is object =>
  typeof field === "object" && field !== null;

const validateContractJsonSchema = (contractSchema: object): boolean => {
  // {
  // "definitions": {
  //   "PersonRegisteredContract": {
  //     "type": "object",
  //     "properties": {
  //       "detail-type": {
  //         "type": "string",
  //         "const": "PersonRegisteredContract"
  //       },
  //       "detail": {
  //         "type": "object",
  //         "properties": {
  //           "detail-version": {
  //             "type": "number",
  //             "const": 1
  //           },
  if ("definitions" in contractSchema && isObject(contractSchema.definitions)) {
    if (
      "PersonRegisteredContract" in contractSchema.definitions &&
      isObject(contractSchema.definitions.PersonRegisteredContract)
    ) {
      if()
    }
  }
};

export const generateContractSchema = async (
  pathToContractsFolder: string,
  contractFilename: string
): Promise<void> => {
  const pathToContractFile = path.join(pathToContractsFolder, contractFilename);

  const typeToSchemaConfig = {
    path: pathToContractFile,
    tsconfig: path.join(process.cwd(), "/tsconfig.json"),
    type: "*",
  };

  const contractSchema = createGenerator(typeToSchemaConfig).createSchema(
    typeToSchemaConfig.type
  );

  validateContractJsonSchema(contractSchema);

  //validate this has consts
};
