"use client";

import { useSession } from "@/context/sessionProvider";

export default function Page() {
  const { user } = useSession();
  return <h1>Name : {user?.firstName}</h1>;
}
