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

  async getCharacters({ limit = 20, name }: any) {
    if (!name) {
      return this.get(`/characters?limit=${limit}`);
    }
    return this.get(`/characters?limit=${limit}&name=${name}`);
  }
};

export default Marvel;
