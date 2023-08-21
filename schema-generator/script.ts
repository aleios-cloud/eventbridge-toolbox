//TODO: absolute path here
import { existsSync } from "fs";
import path from "path";

import { generateDocs } from "./generate-docs.js";

const getValidContractsPath = (): string => {
  if (process.argv[2] === "") {
    throw "Please provide the path to your contracts as the first argument.";
  }
  const pathToContracts = path.join(process.cwd(), process.argv[2]);
  if (!existsSync(pathToContracts)) {
    throw "File path provided for contracts directory is invalid. Directory does not exist.";
  }

  return pathToContracts;
};

const getValidEventFolderPath = (): string => {
  if (process.argv[3] === "") {
    throw "Please provide the path to your event catalog events folder as the second argument.";
  }
  const pathToEventsFolder = path.join(process.cwd(), process.argv[3]);
  if (!existsSync(pathToEventsFolder)) {
    throw "File path provided for documentation directory is invalid. Directory does not exist.";
  }

  return pathToEventsFolder;
};

const main = async () => {
  const pathToContracts = getValidContractsPath();
  const pathToEventsFolder = getValidEventFolderPath();

  await generateDocs(pathToContracts, pathToEventsFolder);

  console.log("Successfully generated docs");
};

await main();
