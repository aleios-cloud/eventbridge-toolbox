type GetCdkHandlerPathProps = {
  extension?: 'js' | 'ts' | 'cjs' | 'mjs';
  fileName?: string;
};

export const getCdkHandlerPath = (
  directoryPath: string,
  props?: GetCdkHandlerPathProps,
): string => {
  const processRunLocation = process.cwd();

  const fileName = props?.fileName ?? 'handler';
  const extension = props?.extension ?? 'ts';

  return (
    directoryPath.replace(processRunLocation + '/', '') +
    `/${fileName}.${extension}`
  );
};
