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
    getCreators: async (_: any, args: any, { dataSources }: any) => {
      const response = await dataSources.Marvel.getCreators(args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(({ id, firstName, lastName, fullName, thumbnail, comics }: any) => ({
          id,
          firstName,
          lastName,
          fullName,
          thumbnail,
          comics,
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
  Creator: {
    id: ({ id }: any) => id,
    firstName: ({ firstName }: any) => firstName,
    lastName: ({ lastName }: any) => lastName,
    fullName: ({ fullName }: any) => fullName,
    image: ({ thumbnail: { path, extension } }: any) => getImage(path, extension),
    comics: async ({ id }: any, args: any, { dataSources }: any): Promise<any> => {
      const response = await dataSources.Marvel.getComicsByCreatorId(id, args);
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
  Result: {
    __resolveType(result: any) {
      if (result.name) {
        return 'Character';
      }

      if (result.pageCount !== undefined) {
        return 'Comic';
      }

      if (result.firstName && result.lastName) {
        return 'Creator';
      }

      return null;
    },
  }
};

export default resolvers;
