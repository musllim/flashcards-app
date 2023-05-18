import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getCards: async () => {
      const cards = await prisma.card.findMany();
      return cards;
    },

    getCard: async (_: any, { id }: { id: string }) => {
      const card = await prisma.card.findFirst({
        where: {
          id,
        },
      });
      return card;
    },
  },
  Mutation: {
    postCard: async (
      _: any,
      { image, title }: { title: string; image: string }
    ) => {
      const createdCard = await prisma.card.create({
        data: {
          image,
          title,
        },
      });

      return createdCard;
    },
  },
};
