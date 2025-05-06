"use server";

import db from "@/db";
import { profiles } from "@/db/schema";
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
      .from(profiles)
      .where(eq(profiles.userId, currentUser.id))
      .limit(1);

    return userDetails[0] || null;
  } catch (error) {
    console.error("ユーザー詳細取得エラー:", error);
    return null;
  }
};
