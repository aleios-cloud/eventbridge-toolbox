import { IEvent } from "src/classes/Event";

export type PersonRegisteredDetail = {
  firstName: string;
  lastName: string;
};

export interface PersonRegisteredContract
  extends IEvent<PersonRegisteredDetail> {
  metadata: { version: 1; detailType: "PersonRegisteredContract" };
  detail: {
    firstName: string;
    lastName: string;
  };
}
