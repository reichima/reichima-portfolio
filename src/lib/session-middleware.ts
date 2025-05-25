import "server-only";

import { AUTH_COOKIE } from "@/features/auth/constants";
// import { createSupabaseClient } from "@/lib/supabase"; // Supabaseクライアントは不要
import db from "@/db"; // データベースインスタンスをインポート
import { users } from "@/db/schema"; // usersスキーマをインポート
import { eq } from "drizzle-orm"; // Drizzle ORMのeqをインポート
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// アプリケーション固有のユーザー型を定義（例）
interface AppUser {
  id: string;
  email: string;
  // 他のユーザープロパティ
}

// 拡張コンテキスト
type AuthContext = {
  Variables: {
    user: AppUser; // Supabase User型からAppUser型に変更
    error?: Error;
  };
};

export const sessionMiddleware = createMiddleware<AuthContext>(
  async (c, next) => {
    const authCookie = getCookie(c, AUTH_COOKIE);

    if (!authCookie) {
      return c.json(
        {
          success: false,
          message: "認証されていません",
        },
        401,
      );
    }

    try {
      // CookieからセッションIDやユーザートークンなどを解析
      // ここではauthCookieがユーザーIDを直接含むと仮定
      // TODO: 実際には、セッショントークンを検証し、DBからユーザー情報を取得する処理が必要
      const userId = authCookie; // 仮の処理：authCookieがユーザーIDであるとする

      // データベースからユーザー情報を取得
      const userResult = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (userResult.length === 0) {
        return c.json(
          {
            success: false,
            message: "認証情報が無効です",
          },
          401,
        );
      }

      const user = userResult[0] as AppUser; // 取得したユーザー情報を型アサーション

      // 認証されたユーザー情報をコンテキストに設定
      c.set("user", user);
    } catch (e) {
      // エラー処理
      return c.json(
        {
          success: false,
          message: "認証エラーが発生しました",
        },
        500,
      );
    }

    await next();
  },
);
