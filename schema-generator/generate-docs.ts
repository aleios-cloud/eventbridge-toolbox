import { existsSync, mkdirSync, readdir, readFileSync, writeFile } from "fs";
import path from "path";
import { createGenerator } from "ts-json-schema-generator";

if (process.argv[2] === "") {
  throw "Please provide the path to your contracts as the first argument.";
}
if (process.argv[3] === "") {
  throw "Please provide the path to your event catalog events folder as the second argument.";
}

const pathToContracts = path.join(process.cwd(), process.argv[2]);

readdir(pathToContracts, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files
      .filter((fileName) => fileName.includes("Contract"))
      .forEach((file) => {
        console.log(`Found ${file}`);

        const pathToFile = path.join(pathToContracts, file);
        const filenameWithoutExtension = file.split(".")[0];
        const fileNameWithoutContract = filenameWithoutExtension.endsWith(
          "Contract",
        )
          ? filenameWithoutExtension.replace("Contract", "")
          : filenameWithoutExtension;

        const docsFilePath = path.join(process.cwd(), process.argv[3]);
        if (!existsSync(docsFilePath)) {
          throw "File path provided for documentation directory is invalid. Directory does not exist.";
        }

        const eventDocsFilePath = path.join(
          process.cwd(),
          `/${process.argv[3]}/${fileNameWithoutContract}`,
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
              console.log(error);
            }
          },
        );

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

        writeFile(`${eventDocsFilePath}/schema.json`, schemaString, (error) => {
          if (error) {
            console.log(error);
          }
        });

        console.log(`Created docs for ${fileNameWithoutContract}`);
      });
  }
});
