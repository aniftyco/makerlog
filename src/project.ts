import {Client} from './client';

export interface IMakerlogProjectResponse {
  id: string;
}

export interface IProject {
  id: string;
  related(): Promise<Project[]>;
}

export class Project implements IProject {
  public id: string;

  constructor(private client: Client, project: IMakerlogProjectResponse) {
    this.id = project.id;
  }

  public async related(): Promise<Project[]> {
    const related = await this.client.request('GET', `/projects/${this.id}/related`);

    return related.map((project: IMakerlogProjectResponse) => {
      return new Project(this.client, project);
    });
  }
}
