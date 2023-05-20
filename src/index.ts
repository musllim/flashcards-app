import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { schema } from "./schema/flashCard.schema";
import { resolvers } from "./resolvers";

const app = express();
const PORT = parseInt((process.env.PORT || 3000).toString());

app.use(cors());

const main = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  const { url } = await startStandaloneServer<{ token: string }>(server, {
    context: async ({ req }) => ({ token: req.headers.authorization as string }),
    listen: { port: PORT },
  });

  console.log(`Server ready at: ${url}`);
};

main().catch((err) => {
  console.error(err);
});
