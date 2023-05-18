import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getCards: async () => {
      const cards = await prisma.card.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      });
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
          category: {
            create: {
              name: "biology",
            },
          },
          user: {
            create: {
              email: "uwi@gmail.com",
              password: "123",
            },
          },
        },
      });

      return createdCard;
    },
    createUser: async (
      _: any,
      { email, password }: { password: string; email: string }
    ) => {
      const createdCard = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return createdCard;
    },
  },
};
