export interface IMakerlogThreadResponse {
  id: string;
}

export interface IThread {
  id: string;
}

export class Thread implements IThread {
  public id: string;

  constructor(thread: IMakerlogThreadResponse) {
    this.id = thread.id;
  }
}
