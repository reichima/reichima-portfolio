"use server";

import db from "@/db";
import { users } from "@/db/schema";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { createSupabaseClient } from "@/lib/supabase";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

// Supabaseから現在のユーザー認証情報を取得
export const getCurrent = async () => {
  try {
    const cookiesStore = await cookies();
    const authCookie = cookiesStore.get(AUTH_COOKIE);

    if (!authCookie) return null;

    // アクセストークンをSupabaseクライアントに渡す
    const supabase = createSupabaseClient(authCookie.value);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    return user;
  } catch (error) {
    console.error("認証エラー:", error);
    return null;
  }
};

// Drizzleからユーザーの詳細情報を取得
export const getUserDetails = async () => {
  try {
    // 現在のユーザーを取得
    const currentUser = await getCurrent();
    if (!currentUser || !currentUser.email) return null;

    // Drizzleを使ってデータベースからユーザー詳細を取得
    const userDetails = await db
      .select()
      .from(users)
      .where(eq(users.email, currentUser.email))
      .limit(1);

    return userDetails[0] || null;
  } catch (error) {
    console.error("ユーザー詳細取得エラー:", error);
    return null;
  }
};

// ユーザー情報の同期（Supabaseユーザーがいるけどデータベースにいない場合）
export const syncUserData = async () => {
  try {
    const currentUser = await getCurrent();
    if (!currentUser || !currentUser.email) return null;

    // Drizzleでユーザーを検索
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, currentUser.email))
      .limit(1);

    // ユーザーが存在しない場合は新規作成
    if (!existingUser[0]) {
      const userData = {
        name:
          currentUser.user_metadata?.name || currentUser.email.split("@")[0],
        email: currentUser.email,
        // passwordはハッシュ化済みのダミー値を入れておく（Supabaseで認証するため）
        password: "SUPABASE_AUTH_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Drizzleでユーザーを作成
      const newUser = await db.insert(users).values(userData).returning();
      return newUser[0];
    }

    return existingUser[0];
  } catch (error) {
    console.error("ユーザー同期エラー:", error);
    return null;
  }
};
