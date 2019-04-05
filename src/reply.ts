export interface IMakerlogReplyResponse {
  id: string;
}

export interface IReply {
  id: string;
}

export class Reply implements IReply {
  public id: string;

  constructor(reply: IMakerlogReplyResponse) {
    this.id = reply.id;
  }
}
