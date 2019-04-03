import {Client} from './client';

export interface IMakerlogTaskResponse {
  id: string;
}

export interface ITask {
  id: string;
  praise(): Promise<void>;
}

export class Task implements ITask {
  public id: string;

  constructor(private client: Client, task: IMakerlogTaskResponse) {
    this.id = task.id;
  }

  public async praise(): Promise<void> {
    await this.client.request('GET', `/tasks/${this.id}/praise`);
  }
}
