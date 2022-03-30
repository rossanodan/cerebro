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

export default typeDefs;
