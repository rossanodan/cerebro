import { gql } from 'apollo-server-express';

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
  type Comic {
    id: ID!
    title: String!
    description: String
    pageCount: Int
    image: Image
  }
  type Creator {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String
    image: Image
    comics(limit: Int): Response!
  }
  union Result = Character | Comic | Creator
  type Response {
    offset: Int!
    limit: Int!
    total: Int!
    count: Int!
    results: [Result]!
  }
  type Query {
    getCharacters(limit: Int): Response!
    getCharacterById(id: ID!): Response!
    getComics(limit: Int): Response!
    getCreators(firstName: String, lastName: String): Response!
  }
`;

export default typeDefs;
