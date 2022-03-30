import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import http from 'http';
import express from 'express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import dataSources from './datasources';

const listen = async (port: number) => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
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
