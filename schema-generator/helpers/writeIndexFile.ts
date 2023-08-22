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
  pathToContractDocumentationFolder: string,
  detailType: string,
  detailVersion: number,
): Promise<void> => {
  const markdownWithName = eventMarkdownTemplate.replace(
    "//name//",
    detailType,
  );
  const markdownWithVersion = markdownWithName.replace(
    "//version//",
    detailVersion.toString(),
  );

  await writeFile(
    `${pathToContractDocumentationFolder}/index.md`,
    markdownWithVersion,
  );
};
