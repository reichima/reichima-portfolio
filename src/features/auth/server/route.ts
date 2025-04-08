import { AUTH_COOKIE } from "@/features/auth/constants";
import { sessionMiddleware } from "@/lib/session-middleware";
import { createServerSupabaseClient } from "@/lib/supabase";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
  .get("/current", sessionMiddleware, async (c) => {
    // sessionMiddlewareで認証済みのユーザー情報を使用
    const user = c.get("user");

    return c.json({
      data: user,
    });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.valid("json");
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        400,
      );
    }

    // Cookieにセッショントークンを保存
    if (data.session) {
      setCookie(c, AUTH_COOKIE, data.session.access_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30日
      });
    }

    return c.json({
      success: true,
      data: data.user,
    });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password } = await c.req.valid("json");
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        400,
      );
    }

    // Cookieにセッショントークンを保存
    if (data.session) {
      setCookie(c, AUTH_COOKIE, data.session.access_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30日
      });
    }

    return c.json({
      success: true,
      data: data.user,
    });
  })
  .post("/logout", async (c) => {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        400,
      );
    }

    deleteCookie(c, AUTH_COOKIE);

    return c.json({
      success: true,
    });
  });

export default app;
