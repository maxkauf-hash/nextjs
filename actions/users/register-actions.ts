"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { RegisterUserSchema } from "@/schemas/register-schemas";

const prisma = new PrismaClient();

const register = async (values: z.infer<typeof RegisterUserSchema>) => {
  const validateFields = RegisterUserSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { firstName, lastName, email, password, address, zip, city, phone } =
    validateFields.data;

  const existingUser = await prisma.users.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      zip,
      city,
      phone,
    },
  });

  if (!user) {
    return { error: "Something went wrong" };
  }

  return { success: "User created successfully" };
};

export default register;
