import { mkdirSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";

import { generateSchemaDetails } from "./helpers/generateSchemaDetails.js";
import { writeIndexFile } from "./helpers/writeIndexFile.js";
import { writeSchemaFile } from "./helpers/writeSchemaFile.js";

//Note: contract file name must include term 'Contract' to be parsed
const getContractFileNames = async (
  pathToContracts: string,
): Promise<string[]> => {
  const files = await readdir(pathToContracts);

  return files.filter((fileName) => fileName.includes("Contract"));
};

export const generateDocumentation = async (
  pathToContractsFolder: string,
  pathToDocumentationFolder: string,
): Promise<void> => {
  const contractFileNames = await getContractFileNames(pathToContractsFolder);

  for (const contractFileName of contractFileNames) {
    const { detailType, detailVersion, schema } = generateSchemaDetails(
      pathToContractsFolder,
      contractFileName,
    );
    const contractFilenameWithoutExtension = contractFileName.split(".")[0];

    const pathToContractDocumentationFolder = path.join(
      `${pathToDocumentationFolder}/${contractFilenameWithoutExtension}`,
    );

    mkdirSync(pathToContractDocumentationFolder, { recursive: true });

    await writeIndexFile(
      pathToContractDocumentationFolder,
      detailType,
      detailVersion,
    );

    await writeSchemaFile(pathToContractDocumentationFolder, {
      detailType,
      detailVersion,
      schema,
    });

    console.log(`Created docs for ${contractFilenameWithoutExtension}`);
  }
};
