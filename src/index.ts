import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import Marvel from './datasources';

const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    description: String
    image: Image
  }
  type Image {
    portraitSmall: String
    portraitMedium: String
    portraitXlarge: String
    portraitFantastic: String
    portraitUncanny: String
    portraitIncredible: String
    standardSmall: String
    standardMedium: String
    standardLarge: String
    standardXlarge: String
    standardFantastic: String
    standardAmazing: String
    landscapeSmall: String
    landscapeMedium: String
    landscapeLarge: String
    landscapeXlarge: String
    landscapeAmazing: String
    landscapeIncredible: String
    detail: String
    fullSizeImage: String
  }
  type GetCharactersResponse {
    offset: Int!
    limit: Int!
    total: Int!
    count: Int!
    results: [Character]!
  }
  type Query {
    getCharacters(limit: Int, name: String, nameStartsWith: String): GetCharactersResponse
  }
`;

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

const listen = async (port: number) => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        Marvel: new Marvel(),
      };
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();

  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject)
  });
};

const main = async () => {
  try {
    await listen(4001)
    console.log('🚀 Server is ready at http://localhost:4001/graphql')
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
};

void main();
