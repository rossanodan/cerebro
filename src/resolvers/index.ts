import { getImage } from './utils';

const resolvers = {
  Query: {
    getCharacters: async (_: any, args: any, { dataSources }: any) => {
      const response = await dataSources.Marvel.getCharacters(args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(({ id, name, description, thumbnail }: any) => ({
          id,
          name,
          description,
          thumbnail,
        }))
      };
    },
    getCharacterById: async (_: any, { id }: any, { dataSources }: any) => {
      const response = await dataSources.Marvel.getCharacterById(id);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(({ id, name, description, thumbnail }: any) => ({
          id,
          name,
          description,
          thumbnail,
        }))
      };
    },
    getComics: async (_: any, args: any, { dataSources }: any) => {
      const response = await dataSources.Marvel.getComics(args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(({ id, title, description, pageCount, thumbnail }: any) => ({
          id,
          title,
          description,
          pageCount,
          thumbnail,
        }))
      };
    },
  },
  Character: {
    id: ({ id }: any) => id,
    name: ({ name }: any) => name,
    description: ({ description }: any) => description,
    image: ({ thumbnail: { path, extension } }: any) => getImage(path, extension),
  },
  Comic: {
    id: ({ id }: any) => id,
    title: ({ title }: any) => title,
    description: ({ description }: any) => description,
    pageCount: ({ pageCount }: any) => pageCount,
    image: ({ thumbnail: { path, extension } }: any) => getImage(path, extension),
  },
  Result: {
    __resolveType(result: any) {
      if (result.name) {
        return 'Character';
      }

      if (result.pageCount !== undefined) {
        return 'Comic';
      }

      return null;
    },
  }
};

export default resolvers;
