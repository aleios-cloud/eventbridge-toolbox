import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";

export const handler = (): PersonRegisteredContract => {
  const contractBody: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  return contractBody;
};
