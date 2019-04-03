import {Client} from '../src/client';

describe('Client', () => {
  let client: Client;

  beforeAll(() => {
    client = new Client(process.env.MAKERLOG_API_KEY as string);
  });

  it('should return 10 products', async () => {
    const products = await client.products.all();

    expect(products.length).toBe(10);
  });
});
