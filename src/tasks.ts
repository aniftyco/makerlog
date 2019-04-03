import {Client} from './client';
import {IMakerlogTaskResponse, Task} from './task';

export interface ITasks {
  all(): Promise<Task[]>;
  get(id: string): Promise<Task>;
}

export class Tasks implements ITasks {
  constructor(private client: Client) {}

  public async all(): Promise<Task[]> {
    const {results} = await this.client.request('GET', '/tasks');

    return results.map((task: IMakerlogTaskResponse) => {
      return new Task(this.client, task);
    });
  }

  public async get(id: string): Promise<Task> {
    const task = await this.client.request('GET', `/tasks/${id}`);

    return new Task(this.client, task);
  }
}
