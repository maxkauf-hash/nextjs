import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createSession = async (data: Prisma.SessionCreateInput) => {
  return prisma.session.create({
    data,
  });
};

export const getSession = async (id: string) => {
  return prisma.session.findUnique({
    where: { id },
  });
};

export const getAllSessions = async () => {
  return prisma.session.findMany();
};

export const updateSession = async (
  id: string,
  data: Prisma.SessionUpdateInput
) => {
  return prisma.session.update({
    where: { id },
    data,
  });
};

export const deleteSession = async (id: string) => {
  return prisma.session.delete({
    where: { id },
  });
};
