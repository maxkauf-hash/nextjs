"use server";

import * as z from "zod";
import "server-only";
import bcrypt from "bcryptjs";
import { LoginUserSchema } from "@/schemas/loginSchema";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismaClient";

const login = async (values: z.infer<typeof LoginUserSchema>) => {
  const validateFields = LoginUserSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await prisma.users.findUnique({ where: { email } });

  if (!existingUser) {
    return { error: "Please create an account" };
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return { error: "Invalid credentials" };
  }

  await createSession(existingUser.id);
};

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export default login;
