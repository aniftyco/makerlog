import {Client} from './client';

export interface IMakerlogUserResponse {
  id: string;
}

export interface IUser {
  id: string;
  follow(): Promise<void>;
}

export class User implements IUser {
  public id: string;

  constructor(private client: Client, task: IMakerlogUserResponse) {
    this.id = task.id;
  }

  public async follow(): Promise<void> {
    await this.client.request('GET', `/users/${this.id}/follow`);
  }
}
