const fs = require("fs");
const path = require("path");
const tsj = require("ts-json-schema-generator");

const pathToContracts = path.join(
  __dirname,
  "/example-architecture/events/contracts"
);

const docsFilePath = path.join(__dirname, "/docs");
fs.mkdirSync(docsFilePath, { recursive: true });

fs.readdir(pathToContracts, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      console.log(file);
      const pathToFile = path.join(pathToContracts, file);
      const filenameWithoutExtension = file.split(".")[0];
      let fileNameWithoutContract = filenameWithoutExtension;
      if (filenameWithoutExtension.endsWith("Contract")) {
        fileNameWithoutContract = filenameWithoutExtension.replace(
          "Contract",
          ""
        );
      }

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
      const markdownWithVersion = markdownWithName.replace(
        "//version//",
        "1.0.0"
      );

      fs.writeFile(`${newFilePath}/index.md`, markdownWithVersion, (error) => {
        if (error) {
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
          throw error;
        }
      });
    });
  }
});
