import db from "@/db";
import { users } from "@/db/schema"; // profilesからusersに変更
import { AUTH_COOKIE } from "@/features/auth/constants";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
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

    // データベースからユーザーを検索
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userResult.length === 0) {
      return c.json(
        {
          success: false,
          message: "ユーザーが見つかりません",
        },
        400,
      );
    }

    const user = userResult[0];

    // パスワード検証
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return c.json(
        {
          success: false,
          message: "パスワードが正しくありません",
        },
        400,
      );
    }

    // CookieにユーザーIDを保存（実際にはセッショントークンを使用することを推奨）
    setCookie(c, AUTH_COOKIE, user.id, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30日
    });

    return c.json({
      success: true,
      data: { id: user.id, email: user.email, name: user.name },
    });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password } = await c.req.valid("json");

    // メールアドレスの重複チェック
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return c.json(
        {
          success: false,
          message: "このメールアドレスは既に使用されています",
        },
        400,
      );
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const newUserResult = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    const newUser = newUserResult[0];

    // CookieにユーザーIDを保存
    setCookie(c, AUTH_COOKIE, newUser.id, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30日
    });

    return c.json({
      success: true,
      data: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  })
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE);

    return c.json({
      success: true,
    });
  });

export default app;
