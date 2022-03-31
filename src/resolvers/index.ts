import Marvel from '../datasources/Marvel';
import { getImage } from './utils/utils';

type Args = {
  limit?: number;
  firstName?: string;
  lastName?: string;
};

type GetCharacterByIdArgs = {
  id: number;
};

type Context = {
  dataSources: {
    Marvel: Marvel;
  };
};

type CharacterResult = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

type ComicResult = {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
};

type CreatorResult = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: ComicResult;
};

type Thumbnail = {
  thumbnail: {
    path: string;
    extension: string;
  };
};

type Result = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicResult[];
};

const resolvers = {
  Query: {
    getCharacters: async (
      _: undefined,
      args: Args,
      { dataSources }: Context
    ) => {
      const response = await dataSources.Marvel.getCharacters(args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(
          ({ id, name, description, thumbnail }: CharacterResult) => ({
            id,
            name,
            description,
            thumbnail
          })
        )
      };
    },
    getCharacterById: async (
      _: undefined,
      { id }: GetCharacterByIdArgs,
      { dataSources }: Context
    ) => {
      const response = await dataSources.Marvel.getCharacterById(id);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(
          ({ id, name, description, thumbnail }: CharacterResult) => ({
            id,
            name,
            description,
            thumbnail
          })
        )
      };
    },
    getComics: async (_: undefined, args: Args, { dataSources }: Context) => {
      const response = await dataSources.Marvel.getComics(args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(
          ({ id, title, description, pageCount, thumbnail }: ComicResult) => ({
            id,
            title,
            description,
            pageCount,
            thumbnail
          })
        )
      };
    },
    getCreators: async (_: undefined, args: Args, { dataSources }: Context) => {
      const response = await dataSources.Marvel.getCreators(args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(
          ({
            id,
            firstName,
            lastName,
            fullName,
            thumbnail,
            comics
          }: CreatorResult) => ({
            id,
            firstName,
            lastName,
            fullName,
            thumbnail,
            comics
          })
        )
      };
    }
  },
  Character: {
    id: ({ id }: { id: number }) => id,
    name: ({ name }: { name: string }) => name,
    description: ({ description }: { description: string }) => description,
    image: ({ thumbnail: { path, extension } }: Thumbnail) =>
      getImage(path, extension)
  },
  Comic: {
    id: ({ id }: { id: number }) => id,
    title: ({ title }: { title: string }) => title,
    description: ({ description }: { description: string }) => description,
    pageCount: ({ pageCount }: { pageCount: number }) => pageCount,
    image: ({ thumbnail: { path, extension } }: Thumbnail) =>
      getImage(path, extension)
  },
  Creator: {
    id: ({ id }: { id: number }) => id,
    firstName: ({ firstName }: { firstName: string }) => firstName,
    lastName: ({ lastName }: { lastName: string }) => lastName,
    fullName: ({ fullName }: { fullName: string }) => fullName,
    image: ({ thumbnail: { path, extension } }: Thumbnail) =>
      getImage(path, extension),
    comics: async (
      { id }: { id: number },
      args: Args,
      { dataSources }: Context
    ): Promise<Result> => {
      const response = await dataSources.Marvel.getComicsByCreatorId(id, args);
      return {
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
        count: response.data.count,
        results: response.data.results.map(
          ({ id, title, description, pageCount, thumbnail }: ComicResult) => ({
            id,
            title,
            description,
            pageCount,
            thumbnail
          })
        )
      };
    }
  },
  Result: {
    __resolveType(result: ResolveTypeResult) {
      if ('name' in result) {
        return 'Character';
      }

      if ('pageCount' in result) {
        return 'Comic';
      }

      if ('firstName' in result && 'lastName' in result) {
        return 'Creator';
      }

      return null;
    }
  }
};

type ResolveTypeResult = CharacterResult | ComicResult | CreatorResult;

export default resolvers;
