import { Contract } from "dist/types";
export interface PersonRegisteredContract extends Contract {
  "detail-type": "PersonRegisteredContract";
  detail: {
    "detail-version": 1;
    data: {
      firstName: string;
      lastName: string;
    };
  };
}
