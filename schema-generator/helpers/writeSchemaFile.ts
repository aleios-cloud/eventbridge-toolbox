import { writeFile } from "fs/promises";
import path from "path";
import { createGenerator } from "ts-json-schema-generator";

export const writeSchemaFile = async (
  pathToContractsFolder: string,
  contractFilename: string,
  pathToContractDocumentationFolder: string,
): Promise<void> => {
  const pathToContractFile = path.join(pathToContractsFolder, contractFilename);

  const typeToSchemaConfig = {
    path: pathToContractFile,
    tsconfig: path.join(process.cwd(), "/tsconfig.json"),
    topRef: false,
    type: "*",
  };
  const schema = createGenerator(typeToSchemaConfig).createSchema(
    typeToSchemaConfig.type,
  );
  const jsonSchemaWhiteSpace = 2;
  const schemaString = JSON.stringify(schema, null, jsonSchemaWhiteSpace);

  await writeFile(
    `${pathToContractDocumentationFolder}/schema.json`,
    schemaString,
  );
};
