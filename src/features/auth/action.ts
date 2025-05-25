"use server";

import db from "@/db";
import { users } from "@/db/schema"; // profilesからusersに変更
import { AUTH_COOKIE } from "@/features/auth/constants";
// import { createSupabaseClient } from "@/lib/supabase"; // Supabase関連を削除
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

// 独自認証システムから現在のユーザー情報を取得
export const getCurrent = async () => {
  try {
    const cookiesStore = await cookies();
    const authCookie = cookiesStore.get(AUTH_COOKIE);

    if (!authCookie) return null;

    // CookieからユーザーIDを取得し、データベースからユーザー情報を取得
    const userResult = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, authCookie.value))
      .limit(1);

    if (userResult.length === 0) return null;

    return userResult[0];
  } catch (error) {
    console.error("認証エラー:", error);
    return null;
  }
};
