import {Client} from './client';
import {IMakerlogProductResponse, Product} from './product';
import {IMakerlogProjectResponse, Project} from './project';
import {IMakerlogReplyResponse, Reply} from './reply';
import {IMakerlogTaskResponse, Task} from './task';
import {IMakerlogThreadResponse, Thread} from './thread';
import {IMakerlogUserResponse, User} from './user';

export interface IMakerlogNotificationResponse {
  id: string;
  key: string;
  read: boolean;
  verb: string;
  recipient: IMakerlogUserResponse;
  actor: IMakerlogUserResponse;
  unread: boolean;
  broadcast_link: string;
  created: string;
  target:
    | IMakerlogProjectResponse
    | IMakerlogUserResponse
    | IMakerlogProductResponse
    | IMakerlogTaskResponse
    | IMakerlogThreadResponse
    | IMakerlogReplyResponse;
}

export interface INotificationTarget {
  id: string;
  slug: string;
  type: string;
  owner: User;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
}

export interface INotification {
  id: string;
  key: string;
  read: boolean;
  verb: string;
  actor: User;
  recipient: User;
  target: Project | User | Product | Task | Thread | Reply;
  markRead(): Promise<void>;
}

export class Notification implements INotification {
  public id: string;
  public key: string;
  public read: boolean;
  public verb: string;
  public actor: User;
  public recipient: User;
  private $target:
    | IMakerlogProjectResponse
    | IMakerlogUserResponse
    | IMakerlogProductResponse
    | IMakerlogTaskResponse
    | IMakerlogThreadResponse
    | IMakerlogReplyResponse;

  constructor(private client: Client, notification: IMakerlogNotificationResponse) {
    this.id = notification.id;
    this.key = notification.key;
    this.read = notification.read;
    this.verb = notification.verb;
    this.actor = new User(this.client, notification.actor);
    this.recipient = new User(this.client, notification.recipient);
    this.$target = notification.target;
  }

  public get target(): Project | User | Product | Task | Thread | Reply {
    let Target: any;

    if (this.key === 'received_praise' || this.key === 'task_commented') {
      Target = Task;
    }

    if (this.key === 'followed' || this.key === 'user_mentioned') {
      Target = User;
    }

    if (this.key === 'thread_created' || this.key === 'mention_discussion') {
      Target = Thread;
    }

    if (this.key === 'thread_replied') {
      Target = Reply;
    }

    if (this.key === 'product_launched' || this.key === 'product_created') {
      Target = Product;
    }

    return new Target(this.client, this.$target);
  }

  public async markRead(): Promise<void> {
    await this.client.request('GET', `/notifications/${this.id}/mark_read`);
  }
}
