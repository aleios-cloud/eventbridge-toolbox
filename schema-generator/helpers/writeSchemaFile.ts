import { writeFile } from "fs/promises";
import path from "path";
import { createGenerator } from "ts-json-schema-generator";

export const writeSchemaFile = async (
  pathToContractsFolder: string,
  contractFilenameWithoutExtension: string,
  pathToContractDocumentationFolder: string,
): Promise<void> => {
  const pathToContractFile = path.join(
    pathToContractsFolder,
    contractFilenameWithoutExtension,
  );
  const typeToSchemaConfig = {
    path: pathToContractFile,
    tsconfig: path.join(process.cwd(), "/tsconfig.json"),
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
