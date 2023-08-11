const fs = require("fs");
const path = require("path");
const tsj = require("ts-json-schema-generator");

const pathToContracts = path.join(
  __dirname,
  "/example-architecture/events/contracts"
);

const docsFilePath = path.join(__dirname, "/docs");
if (!fs.existsSync(docsFilePath)) {
  fs.mkdirSync(docsFilePath, { recursive: true });
  console.log("Docs directory created");
}

fs.readdir(pathToContracts, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach((file) => {
      // TODO: remove console.log once script is more stable
      console.log(file);
      const pathToFile = path.join(pathToContracts, file);
      const filenameWithoutExtension = file.split(".")[0];
      const fileNameWithoutContract = filenameWithoutExtension.endsWith(
        "Contract"
      )
        ? filenameWithoutExtension.replace("Contract", "")
        : filenameWithoutExtension;

      const newFilePath = path.join(
        __dirname,
        `/docs/${fileNameWithoutContract}`
      );
      fs.mkdirSync(newFilePath, { recursive: true });

      const eventMarkdownTemplate = fs.readFileSync(
        path.join(__dirname, "/doc-template.md"),
        "utf8"
      );
      const markdownWithName = eventMarkdownTemplate.replace(
        "//name//",
        fileNameWithoutContract
      );
      // TODO: replace with version from contract path once versioning is implemented
      const markdownWithVersion = markdownWithName.replace(
        "//version//",
        "1.0.0"
      );

      fs.writeFile(`${newFilePath}/index.md`, markdownWithVersion, (error) => {
        if (error) {
          // TODO: log error rather than throw once script is more stable
          throw error;
        }
      });

      const typeToSchemaConfig = {
        path: pathToFile,
        tsconfig: path.join(__dirname, "/tsconfig.json"),
        type: "*"
      };
      const schema = tsj
        .createGenerator(typeToSchemaConfig)
        .createSchema(typeToSchemaConfig.type);
      const schemaString = JSON.stringify(schema, null, 2);

      fs.writeFile(`${newFilePath}/schema.json`, schemaString, (error) => {
        if (error) {
          // TODO: log error rather than throw once script is more stable
          throw error;
        }
      });
    });
  }
});
