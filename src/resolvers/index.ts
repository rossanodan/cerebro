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
  },
  Character: {
    id: ({ id }: any) => id,
    name: ({ name }: any) => name,
    description: ({ description }: any) => description,
    image: ({ thumbnail: { path, extension } }: any) => ({
      portraitSmall: `${path}/portrait_small.${extension}`,
      portraitMedium: `${path}/portrait_medium.${extension}`,
      portraitXlarge: `${path}/portrait_xlarge.${extension}`,
      portraitFantastic: `${path}/portrait_fantastic.${extension}`,
      portraitUncanny: `${path}/portrait_uncanny.${extension}`,
      portraitIncredible: `${path}/portrait_incredible.${extension}`,
      standardSmall: `${path}/standard_small.${extension}`,
      standardMedium: `${path}/standard_medium.${extension}`,
      standardLarge: `${path}/standard_large.${extension}`,
      standardXlarge: `${path}/standard_xlarge.${extension}`,
      standardFantastic: `${path}/standard_fantastic.${extension}`,
      standardAmazing: `${path}/standard_amazing.${extension}`,
      landscapeSmall: `${path}/landscape_small.${extension}`,
      landscapeMedium: `${path}/landscape_medium.${extension}`,
      landscapeLarge: `${path}/landscape_large.${extension}`,
      landscapeXlarge: `${path}/landscape_xlarge.${extension}`,
      landscapeAmazing: `${path}/landscape_amazing.${extension}`,
      landscapeIncredible: `${path}/landscape_incredible.${extension}`,
      detail: `${path}/detail.${extension}`,
      fullSizeImage: `${path}.${extension}`,
    }),
  },
};

export default resolvers;
