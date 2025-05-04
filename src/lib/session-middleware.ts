import "server-only";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { createSupabaseClient } from "@/lib/supabase";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Supabase認証情報を含む拡張コンテキスト
type AuthContext = {
  Variables: {
    user: any; // Supabase User型
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

    // Supabaseクライアントを作成（アクセストークンの値を渡す）
    const supabase = createSupabaseClient(authCookie);

    // アクセストークンを使用して現在のユーザーを取得
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return c.json(
        {
          success: false,
          message: "認証情報が無効です",
        },
        401,
      );
    }

    // 認証されたユーザー情報をコンテキストに設定
    c.set("user", user);

    await next();
  },
);
