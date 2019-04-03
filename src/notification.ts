import {Client} from './client';

export interface IMakerlogNotificationResponse {
  id: string;
}

export interface INotification {
  id: string;
  markRead(): Promise<void>;
}

export class Notification implements INotification {
  public id: string;

  constructor(private client: Client, notification: IMakerlogNotificationResponse) {
    this.id = notification.id;
  }

  public async markRead(): Promise<void> {
    await this.client.request('GET', `/notifications/${this.id}/mark_read`);
  }
}
