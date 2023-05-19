import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        include: {
          category: {
            select: {
              name: true
            }
          },
          user: {
            select: {
              email: true,
              id: true
            }
          }
        }
      });
      return card;
    },
  },
  Mutation: {
    postCard: async (
      _: any,
      {
        image,
        title,
        cardCategory,
      }: { title: string; image: string; cardCategory: string },
      context: { token: string }
    ) => {
      const bearerToken = context.token


      if (!bearerToken?.startsWith('Bearer')) return
      const token = bearerToken.split(" ")[1]

      let user: {
        email: string
      }

      const data = await jwt.verify(token, 'secret')
      if (!data) return
      user = data as typeof user

      const createdCard = await prisma.card.create({
        data: {
          image,
          title,
          category: {
            create: {
              name: cardCategory,
            },
          },
          user: {
            connect: {
              email: user.email
            }
          }
        },
        include: {
          category: {
            select: {
              name: true
            }
          },
          user: {
            select: {
              email: true,
              id: true
            }
          }
        }
      });

      return createdCard;
    },
    createUser: async (
      _: any,
      { email, password }: { password: string; email: string }
    ) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const createdCard = await prisma.user.create({
        data: {
          email,
          password: hash,
        },
      });

      return createdCard;
    },
    loginUser: async (
      _: any,
      { email, password }: { password: string; email: string }
    ) => {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!user) return;

      const result = await bcrypt.compare(password, user.password);
      if (!result) return;

      const token = jwt.sign({ ...user, password: "" }, "secret");

      return {
        token,
      };
    },
  },
};
