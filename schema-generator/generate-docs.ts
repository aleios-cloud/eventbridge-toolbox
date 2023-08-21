import { existsSync, mkdirSync, readFileSync } from "fs";
import { readdir, writeFile } from "fs/promises";
import path from "path";
import { createGenerator } from "ts-json-schema-generator";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

//Contract file name must include term 'Contract' to be parsed
const getContractFileNames = async (
  pathToContracts: string
): Promise<string[]> => {
  const files = await readdir(pathToContracts);

  return files.filter((fileName) => fileName.includes("Contract"));
};

export const generateDocs = async (
  pathToContracts: string,
  pathToEventsFolder: string
): Promise<void> => {
  try {
    const contractFileNames = await getContractFileNames(pathToContracts);

    for (const contractFileName of contractFileNames) {
      console.log(`Found ${contractFileName}`);

      const pathToFile = path.join(pathToContracts, contractFileName);
      const filenameWithoutExtension = contractFileName.split(".")[0];

      if (!existsSync(pathToEventsFolder)) {
        throw "File path provided for documentation directory is invalid. Directory does not exist.";
      }

      const eventDocsFilePath = path.join(
        `${pathToEventsFolder}/${filenameWithoutExtension}`
      );

      mkdirSync(eventDocsFilePath, { recursive: true });

      const eventMarkdownTemplate = readFileSync(
        path.join(__dirname, "/doc-template.md"),
        "utf8"
      );
      const markdownWithName = eventMarkdownTemplate.replace(
        "//name//",
        filenameWithoutExtension
      );
      // TODO: replace with version from contract path once versioning is implemented
      const markdownWithVersion = markdownWithName.replace(
        "//version//",
        "1.0.0"
      );

      await writeFile(`${eventDocsFilePath}/index.md`, markdownWithVersion);

      const typeToSchemaConfig = {
        path: pathToFile,
        tsconfig: path.join(process.cwd(), "/tsconfig.json"),
        type: "*",
      };
      const schema = createGenerator(typeToSchemaConfig).createSchema(
        typeToSchemaConfig.type
      );
      const jsonSchemaWhiteSpace = 2;
      const schemaString = JSON.stringify(schema, null, jsonSchemaWhiteSpace);

      await writeFile(`${eventDocsFilePath}/schema.json`, schemaString);

      console.log(`Created docs for ${filenameWithoutExtension}`);
    }
  } catch (error) {
    console.error(error);
  }
};
