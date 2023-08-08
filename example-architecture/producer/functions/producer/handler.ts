import { PersonRegisteredContract } from "example-architecture/events/contracts/personRegisteredContract";

// The lambda documentation recommends making the handler async, although there is nothing to await
// When synchronous this lambda returns null.
// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (): Promise<PersonRegisteredContract> => {
  const contractBody: PersonRegisteredContract = {
    firstName: "testFirstName",
    lastName: "testLastName",
  };

  return contractBody;
};
