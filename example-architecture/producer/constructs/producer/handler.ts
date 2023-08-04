import { ExamplePersonContract } from "example-architecture/events";

export const handler = async (): Promise<ExamplePersonContract> => {
  const contractBody: ExamplePersonContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };
  return contractBody;
};
