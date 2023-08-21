import { mkdirSync, readFileSync } from "fs";
import { readdir, writeFile } from "fs/promises";
import path from "path";
import { createGenerator } from "ts-json-schema-generator";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

//Contract file name must include term 'Contract' to be parsed
const getContractFileNames = async (
  pathToContracts: string,
): Promise<string[]> => {
  const files = await readdir(pathToContracts);

  return files.filter((fileName) => fileName.includes("Contract"));
};

export const generateDocs = async (
  pathToContractsDirectory: string,
  pathToEventsDocumentationDirectory: string,
): Promise<void> => {
  try {
    const contractFileNames = await getContractFileNames(
      pathToContractsDirectory,
    );

    for (const contractFileName of contractFileNames) {
      console.log(`Found ${contractFileName}`);

      const contractFilenameWithoutExtension = contractFileName.split(".")[0];
      const pathToContractFile = path.join(
        pathToContractsDirectory,
        contractFilenameWithoutExtension,
      );

      const pathToEventsDocumentationFile = path.join(
        `${pathToEventsDocumentationDirectory}/${contractFilenameWithoutExtension}`,
      );

      mkdirSync(pathToEventsDocumentationFile, { recursive: true });

      const eventMarkdownTemplate = readFileSync(
        path.join(__dirname, "/doc-template.md"),
        "utf8",
      );
      const markdownWithName = eventMarkdownTemplate.replace(
        "//name//",
        contractFilenameWithoutExtension,
      );
      // TODO: replace with version from contract path once versioning is implemented
      const markdownWithVersion = markdownWithName.replace(
        "//version//",
        "1.0.0",
      );

      await writeFile(
        `${pathToEventsDocumentationFile}/index.md`,
        markdownWithVersion,
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
        `${pathToEventsDocumentationFile}/schema.json`,
        schemaString,
      );

      console.log(`Created docs for ${contractFilenameWithoutExtension}`);
    }
  } catch (error) {
    console.error(error);
  }
};
