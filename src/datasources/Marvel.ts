import 'dotenv/config';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import md5 from 'md5';

class Marvel extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://gateway.marvel.com/v1/public';
  }

  willSendRequest(request: RequestOptions) {
    const { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } = process.env;
    const timestamp = Date.now().toString();
    const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

    request.params.set('ts', timestamp);
    request.params.set('apikey', MARVEL_PUBLIC_KEY);
    request.params.set('hash', hash);
  }

  async getCharacters({ limit = 20 }: any) {
    return await this.get(`/characters?limit=${limit}`);
  }

  async getCharacterById(id: number) {
    return await this.get(`/characters/${id}`);
  }

  async getComics({ limit = 20 }: any) {
    return await this.get(`/comics?limit=${limit}`);
  }
};

export default Marvel;
