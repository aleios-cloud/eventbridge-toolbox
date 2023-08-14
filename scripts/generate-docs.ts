import { existsSync, mkdirSync, readdir, readFileSync, writeFile } from "fs";
import path from "path";
import * as tsj from "ts-json-schema-generator";

const rootPath = path.join(__dirname, "..");

const pathToContracts = path.join(rootPath, process.argv[2]);

const docsFilePath = path.join(rootPath, "/docs");
if (!existsSync(docsFilePath)) {
  mkdirSync(docsFilePath, { recursive: true });
  console.log("Docs directory created");
}

readdir(pathToContracts, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files
      .filter((fileName) => fileName.includes("Contract"))
      .forEach((file) => {
        // TODO: remove console.log once script is more stable
        console.log(file);
        const pathToFile = path.join(pathToContracts, file);
        const filenameWithoutExtension = file.split(".")[0];
        const fileNameWithoutContract = filenameWithoutExtension.endsWith(
          "Contract",
        )
          ? filenameWithoutExtension.replace("Contract", "")
          : filenameWithoutExtension;

        const eventDocsFilePath = path.join(
          rootPath,
          `/docs/${fileNameWithoutContract}`,
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

        writeFile(
          `${eventDocsFilePath}/index.md`,
          markdownWithVersion,
          (error) => {
            if (error) {
              // TODO: log error rather than throw once script is more stable
              throw error;
            }
          },
        );

        const typeToSchemaConfig = {
          path: pathToFile,
          tsconfig: path.join(rootPath, "/tsconfig.json"),
          type: "*",
        };
        const schema = tsj
          .createGenerator(typeToSchemaConfig)
          .createSchema(typeToSchemaConfig.type);
        const schemaString = JSON.stringify(schema, null, 2);

        writeFile(`${eventDocsFilePath}/schema.json`, schemaString, (error) => {
          if (error) {
            // TODO: log error rather than throw once script is more stable
            throw error;
          }
        });
      });
  }
});
