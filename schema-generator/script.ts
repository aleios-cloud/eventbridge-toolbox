//TODO: absolute path here
import path from "path";

import { generateDocs } from "./generate-docs.js";

const main = async () => {
  if (process.argv[2] === "") {
    throw "Please provide the path to your contracts as the first argument.";
  }
  const pathToContracts = path.join(process.cwd(), process.argv[2]);
  if (process.argv[3] === "") {
    throw "Please provide the path to your event catalog events folder as the second argument.";
  }
  const pathToEventsFolder = path.join(process.cwd(), process.argv[3]);

  await generateDocs(pathToContracts, pathToEventsFolder);

  console.log("Successfully generated docs");
};

await main();
