import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrders = async (data: Prisma.OrdersCreateInput) => {
  return prisma.orders.create({
    data,
  });
};

export const getOrders = async (id: string) => {
  return prisma.orders.findUnique({
    where: { id },
  });
};

export const getAllOrderss = async () => {
  return prisma.orders.findMany();
};

export const updateOrders = async (
  id: string,
  data: Prisma.OrdersUpdateInput
) => {
  return prisma.orders.update({
    where: { id },
    data,
  });
};

export const deleteOrders = async (id: string) => {
  return prisma.orders.delete({
    where: { id },
  });
};
