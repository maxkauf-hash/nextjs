
import { prisma } from '@/lib/prisma-client';

export const createOrderDetails = async (data: Prisma.OrderDetailsCreateInput) => {
  return prisma.orderDetails.create({
    data,
  });
};

export const getOrderDetails = async (id: string) => {
  return prisma.orderDetails.findUnique({
    where: { id },
  });
};

export const getAllOrderDetailss = async () => {
  return prisma.orderDetails.findMany();
};

export const updateOrderDetails = async (id: string, data: Prisma.OrderDetailsUpdateInput) => {
  return prisma.orderDetails.update({
    where: { id },
    data,
  });
};

export const deleteOrderDetails = async (id: string) => {
  return prisma.orderDetails.delete({
    where: { id },
  });
};
