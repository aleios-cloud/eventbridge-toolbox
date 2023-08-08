export interface IEvent<Contract> {
  readonly data: Contract;
}

export class Event<Contract> implements IEvent<Contract> {
  readonly data: Contract;

  constructor(contract: Contract) {
    this.data = contract;
  }

  getData = (): Contract => {
    return this.data;
  };
}
