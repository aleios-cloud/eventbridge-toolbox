export class Event<Contract> {
  private data: Contract

  constructor(contract: Contract) {
    this.data = contract
  } 

  getData = (): Contract => {
    return this.data
  }
}