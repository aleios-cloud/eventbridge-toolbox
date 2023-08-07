import { ExamplePersonContract } from "example-architecture/events/contracts/examplePersonContract";

export const handler = async (): Promise<ExamplePersonContract> => {
  const contractBody: ExamplePersonContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };
  return contractBody;
};
