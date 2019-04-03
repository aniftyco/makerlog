import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import pkg from '../package.json';
import {Notifications} from './notifications';
import {Products} from './products';
import {Projects} from './projects';
import {Tasks} from './tasks';
import {Users} from './users';

export interface IClient {
  request(method: string, url: string, options: AxiosRequestConfig): Promise<any>;
  notifications: Notifications;
  products: Products;
  projects: Projects;
  tasks: Tasks;
  users: Users;
}

export class Client implements IClient {
  private baseUrl = 'https://api.getmakerlog.com';
  private api: AxiosInstance;
  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'User-Agent': `${pkg.name}/${pkg.version} (https://git.io/makerlog)`,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  public get notifications() {
    return new Notifications(this);
  }

  public get products() {
    return new Products(this);
  }

  public get projects() {
    return new Projects(this);
  }

  public get tasks() {
    return new Tasks(this);
  }

  public get users() {
    return new Users(this);
  }

  public async request(method: string, url: string, options: AxiosRequestConfig = {}): Promise<any> {
    try {
      const {data} = await this.api.request({method, url, ...options});

      return data;
    } catch (err) {
      throw err;
    }
  }
}
