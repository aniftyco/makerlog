import {Client} from './client';
import {IMakerlogNotificationResponse, Notification} from './notification';

export interface INotifications {
  all(): Promise<Notification[]>;
  get(id: string): Promise<Notification>;
}

export class Notifications implements INotifications {
  constructor(private client: Client) {}

  public async all(): Promise<Notification[]> {
    const {results} = await this.client.request('GET', '/notifications');

    return results.map((notification: IMakerlogNotificationResponse) => {
      return new Notification(this.client, notification);
    });
  }

  public async get(id: string): Promise<Notification> {
    const notification = await this.client.request('GET', `/notifications/${id}`);

    return new Notification(this.client, notification);
  }
}
