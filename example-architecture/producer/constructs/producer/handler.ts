import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegistedContract";

export const handler = async (): Promise<PersonRegisteredContract> => {
  const contractBody: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };
  return contractBody;
};
