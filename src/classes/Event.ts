export class Event<contract> {
  private data: contract

  constructor(contract: contract) {
    this.data = contract
  } 

  getData(): contract {
    return this.data
  }
}