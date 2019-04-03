import {Client} from './client';
import {IMakerlogProjectResponse, Project} from './project';

export interface IProjects {
  all(): Promise<Project[]>;
  get(id: string): Promise<Project>;
}

export class Projects implements IProjects {
  constructor(private client: Client) {}

  public async all(): Promise<Project[]> {
    const {results} = await this.client.request('GET', '/projects');

    return results.map((project: IMakerlogProjectResponse) => {
      return new Project(this.client, project);
    });
  }

  public async get(id: string): Promise<Project> {
    const project = await this.client.request('GET', `/projects/${id}`);

    return new Project(this.client, project);
  }
}
