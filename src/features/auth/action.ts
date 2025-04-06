"use server";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const cookiesStore = await cookies();
    const session = cookiesStore.get(AUTH_COOKIE);

    if (!session) return null;
    const account = new Account(client);

    console.log(account.get());
    return await account.get();
  } catch {
    return null;
  }
};
