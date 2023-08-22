import { Contract } from "src/types";
export interface PersonRegisteredContract extends Contract {
  "detail-type": "PersonRegisteredContract";
  detail: {
    "detail-version": 2;
    data: {
      firstName: string;
    };
  };
}
