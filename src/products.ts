import {Client} from './client';
import {IMakerlogProductResponse, Product} from './product';

export interface IProducts {
  all(limit?: number, offset?: number): Promise<Product[]>;
  get(slug: string): Promise<Product>;
}

export class Products implements IProducts {
  constructor(private client: Client) {}

  public async all(limit: number = 10, offset: number = 0): Promise<Product[]> {
    const {results} = await this.client.request('GET', '/products', {params: {limit, offset}});

    return results.map((product: IMakerlogProductResponse) => {
      return new Product(this.client, product);
    });
  }

  public async get(slug: string): Promise<Product> {
    const product = await this.client.request('GET', `/products/${slug}`);

    return new Product(this.client, product);
  }
}
