import { existsSync, mkdirSync, readFileSync } from "fs";
import { readdir, writeFile } from "fs/promises";
import path from "path";
import { createGenerator } from "ts-json-schema-generator";
import { fileURLToPath } from "url";

export const generateDocs = async (
  pathToContracts: string,
  pathToEventsFolder: string,
): Promise<void> => {
  const __dirname = fileURLToPath(new URL(".", import.meta.url));

  try {
    const files = await readdir(pathToContracts);

    const contractFiles = files.filter((fileName) =>
      fileName.includes("Contract"),
    );

    for (const contractFile of contractFiles) {
      console.log(`Found ${contractFile}`);

      const pathToFile = path.join(pathToContracts, contractFile);
      const filenameWithoutExtension = contractFile.split(".")[0];
      const fileNameWithoutContract = filenameWithoutExtension.endsWith(
        "Contract",
      )
        ? filenameWithoutExtension.replace("Contract", "")
        : filenameWithoutExtension;

      if (!existsSync(pathToEventsFolder)) {
        throw "File path provided for documentation directory is invalid. Directory does not exist.";
      }

      const eventDocsFilePath = path.join(
        `${pathToEventsFolder}/${fileNameWithoutContract}`,
      );

      mkdirSync(eventDocsFilePath, { recursive: true });

      const eventMarkdownTemplate = readFileSync(
        path.join(__dirname, "/doc-template.md"),
        "utf8",
      );
      const markdownWithName = eventMarkdownTemplate.replace(
        "//name//",
        fileNameWithoutContract,
      );
      // TODO: replace with version from contract path once versioning is implemented
      const markdownWithVersion = markdownWithName.replace(
        "//version//",
        "1.0.0",
      );

      await writeFile(`${eventDocsFilePath}/index.md`, markdownWithVersion);

      const typeToSchemaConfig = {
        path: pathToFile,
        tsconfig: path.join(process.cwd(), "/tsconfig.json"),
        type: "*",
      };
      const schema = createGenerator(typeToSchemaConfig).createSchema(
        typeToSchemaConfig.type,
      );
      const jsonSchemaWhiteSpace = 2;
      const schemaString = JSON.stringify(schema, null, jsonSchemaWhiteSpace);

      await writeFile(`${eventDocsFilePath}/schema.json`, schemaString);

      console.log(`Created docs for ${fileNameWithoutContract}`);
    }
  } catch (error) {
    console.error(error);
  }
};
