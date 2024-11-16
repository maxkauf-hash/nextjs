import { PrismaClient, Prisma } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export const createUsers = async (data: Prisma.UsersCreateInput) => {
  return prisma.users.create({
    data,
  });
};

export const getUsers = async (id: string) => {
  return prisma.users.findFirst({
    where: { id },
  });
};

export const getAllUserss = async () => {
  return prisma.users.findMany();
};

export const updateUsers = async (
  id: string,
  data: Prisma.UsersUpdateInput
) => {
  return prisma.users.update({
    where: { id },
    data,
  });
};

export const deleteUsers = async (id: string) => {
  return prisma.users.delete({
    where: { id },
  });
};
