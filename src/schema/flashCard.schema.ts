export const schema = `#graphql

type Card {
  id: ID!
  title: String!
  image: String!
  user: User!
  category: Category!
  created_at: String!
}

type Category {
  id: ID!
  name: String!
  created_at: String!
  Card: [Card!]
}

type User {
  id: ID!
  email: String!
  password: String!
  Card: [Card!]
  created_at: String!
}

type Query {
  getCard(id: ID!): Card
  getCards: [Card!]
}

type Mutation {
  postCard(title: String!, image: String!): Card!
  createUser(email: String!, password: String!): User!
}

`;
