import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegistedContract";

export const handler = (): PersonRegisteredContract => {
  const contractBody: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  return contractBody;
};
