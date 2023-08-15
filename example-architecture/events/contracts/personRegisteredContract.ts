import { Contract } from "src/classes/types";
export interface PersonRegisteredContract extends Contract {
  version: 1;
  detailType: "PersonRegisteredContract";
  detail: {
    firstName: string;
    lastName: string;
  };
}
