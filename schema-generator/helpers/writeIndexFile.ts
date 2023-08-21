import { writeFile } from "fs/promises";

const eventMarkdownTemplate =
  "---\n" +
  "name: //name//\n" +
  "version: //version//\n" +
  "summary: |\n" +
  "  A summary\n" +
  "producers:\n" +
  "  - Producer\n" +
  "consumers:\n" +
  "  - Consumer\n" +
  "owners:\n" +
  "  - Name\n" +
  "---\n\n" +
  "<Admonition>Some information</Admonition>\n\n" +
  "### Details\n\n" +
  "Some details...\n\n" +
  "<Schema />";

export const writeIndexFile = async (
  contractFilenameWithoutExtension: string,
  pathToContractDocumentationFolder: string,
): Promise<void> => {
  const markdownWithName = eventMarkdownTemplate.replace(
    "//name//",
    contractFilenameWithoutExtension,
  );
  // TODO: replace with version from contract path once versioning is implemented
  const markdownWithVersion = markdownWithName.replace("//version//", "1.0.0");

  await writeFile(
    `${pathToContractDocumentationFolder}/index.md`,
    markdownWithVersion,
  );
};
