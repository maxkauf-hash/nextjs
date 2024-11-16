"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { SessionPayload } from "@/lib/types";
import { prisma } from "@/lib/prismaClient";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export async function createSession(id: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const existingSession = await prisma.session.findFirst({
    where: { userId: id },
  });

  if (existingSession?.id) {
    await prisma.session.delete({ where: { id: existingSession.id } });
  }

  // 1. Create a session in the database
  const data = await prisma.session.create({
    data: {
      expiresAt,
      userId: id,
    },
  });

  const sessionId = data.id;

  // 2. Encrypt the session ID
  const session = await encrypt({ sessionId, expiresAt, userId: data.userId });

  // 3. Store the session in cookies for optimistic auth checks
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return cookieStore;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.sessionId) {
    return { isAuth: false, user: null };
  }

  const user = await prisma.users.findFirst({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      address: true,
      city: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      zip: true,
      _count: true,
    },
  });
  return { isAuth: true, user: user };
};
