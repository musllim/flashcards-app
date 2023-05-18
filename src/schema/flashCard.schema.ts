export const schema = `#graphql

type Card {
  title: String!
  image: String!
  id: ID!
  created_at: String!
}

type Query {
  getCard(id: ID!): Card
  getCards: [Card!]
}

type Mutation {
  postCard(title: String!, image: String!): Card!
}

`;
