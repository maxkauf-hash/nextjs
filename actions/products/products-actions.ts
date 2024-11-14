import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProducts = async (data: Prisma.ProductsCreateInput) => {
  return prisma.products.create({
    data,
  });
};

export const getProducts = async (id: string) => {
  return prisma.products.findFirst({
    where: { id },
  });
};

export const getAllProducts = async () => {
  return prisma.products.findMany();
};

export const updateProducts = async (
  id: string,
  data: Prisma.ProductsUpdateInput
) => {
  return prisma.products.update({
    where: { id },
    data,
  });
};

export const deleteProducts = async (id: string) => {
  return prisma.products.delete({
    where: { id },
  });
};
