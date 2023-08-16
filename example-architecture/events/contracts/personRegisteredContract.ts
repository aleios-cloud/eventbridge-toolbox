import { Contract } from "src/classes/types";
export interface PersonRegisteredContract extends Contract {
  detailVersion: 1;
  detailType: "PersonRegisteredContract";
  data: {
    firstName: string;
    lastName: string;
  };
}
