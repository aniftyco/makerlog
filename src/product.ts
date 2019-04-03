import {Client} from './client';

export interface IMakerlogProductResponse {
  id: string;
  name: string;
  slug: string;
  user: number;
  team: number[];
  product_hunt: string;
  website: string;
  projects: number[];
  launched: boolean;
  icon: string;
  description: string;
  created_at: string;
  launched_at: string;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  userId: number;
  productHunt: string;
  url: string;
  icon: string;
  description: string;
  createdAt: string;
  launchedAt?: string;
  leave(): Promise<void>;
}

export class Product implements IProduct {
  public id: string;
  public name: string;
  public slug: string;
  public userId: number;
  public productHunt: string;
  public url: string;
  public icon: string;
  public description: string;
  public createdAt: string;
  public launchedAt?: string;

  constructor(private client: Client, product: IMakerlogProductResponse) {
    this.id = product.id;
    this.name = product.name;
    this.slug = product.slug;
    this.userId = product.user;
    this.productHunt = product.product_hunt;
    this.url = product.website;
    this.icon = product.icon;
    this.description = product.description;
    this.createdAt = product.created_at;
    this.launchedAt = product.launched_at;
  }

  public async leave(): Promise<void> {
    await this.client.request('POST', `/products/${this.slug}/leave`);
  }
}
