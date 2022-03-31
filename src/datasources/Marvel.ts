import 'dotenv/config';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import md5 from 'md5';

type Args = {
  limit?: number;
  firstName?: string;
  lastName?: string;
};

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

  async getCharacters({ limit = 20 }: Args) {
    return await this.get(`/characters?limit=${limit}`);
  }

  async getCharacterById(id: number) {
    return await this.get(`/characters/${id}`);
  }

  async getComics({ limit = 20 }: Args) {
    return await this.get(`/comics?limit=${limit}`);
  }

  async getCreators({ firstName, lastName }: Args) {
    if (firstName && lastName) {
      return await this.get(
        `/creators?firstName=${firstName}&lastName=${lastName}`
      );
    }
    if (firstName && !lastName) {
      return await this.get(`/creators?firstName=${firstName}`);
    }
    return await this.get(`/creators?lastName=${lastName}`);
  }

  async getComicsByCreatorId(id: number, { limit = 20 }: Args) {
    return await this.get(`/creators/${id}/comics?limit=${limit}`);
  }
}

export default Marvel;
