//TODO: absolute path here
import { existsSync } from "fs";
import path from "path";

import { generateDocumentation } from "./generate-docs.js";

const getValidFolderPath = (
  directoryPath: string,
  directoryName: string,
): string => {
  if (directoryPath === "") {
    throw `Please provide the path to your ${directoryName} as the argument.`;
  }
  const pathToEventsFolder = path.join(process.cwd(), directoryPath);
  if (!existsSync(pathToEventsFolder)) {
    throw `File path provided for ${directoryName} is invalid. Directory does not exist.`;
  }

  return pathToEventsFolder;
};

const main = async () => {
  const pathToContracts = getValidFolderPath(
    process.argv[2],
    "contracts directory",
  );
  const pathToEventDocumentationFolder = getValidFolderPath(
    process.argv[3],
    "documentation directory",
  );

  try {
    await generateDocumentation(
      pathToContracts,
      pathToEventDocumentationFolder,
    );
    console.log("Successfully generated all docs");
  } catch (err) {
    console.error(err);
  }
};

await main();
