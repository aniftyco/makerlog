import {Client} from './client';
import {IMakerlogUserResponse, User} from './user';

export interface IUsers {
  all(): Promise<User[]>;
  get(id: string): Promise<User>;
}

export class Users implements IUsers {
  constructor(private client: Client) {}

  public async all(): Promise<User[]> {
    const {results} = await this.client.request('GET', '/users');

    return results.map((user: IMakerlogUserResponse) => {
      return new User(this.client, user);
    });
  }

  public async get(id: string): Promise<User> {
    const user = await this.client.request('GET', `/users/${id}`);

    return new User(this.client, user);
  }
}
