import { writeFile } from "fs/promises";

import { SchemaDetails } from "./utils.js";

export const writeSchemaFile = async (
  pathToContractDocumentationFolder: string,
  schemaDetails: SchemaDetails,
): Promise<void> => {
  const jsonSchemaWhiteSpace = 2;
  const schemaString = JSON.stringify(
    schemaDetails.schema,
    null,
    jsonSchemaWhiteSpace,
  );

  await writeFile(
    `${pathToContractDocumentationFolder}/schema.json`,
    schemaString,
  );
};
