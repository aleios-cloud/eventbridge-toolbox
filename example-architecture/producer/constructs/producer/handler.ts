import { ExamplePersonContract } from "example-architecture/events";

export const handler = async (): Promise<ExamplePersonContract> => {
  const contractBody: ExamplePersonContract = {
    firstName: "April",
    lastName: "Bates",
  };
  return contractBody;
};
