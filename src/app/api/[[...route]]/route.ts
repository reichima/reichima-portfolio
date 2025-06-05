import auth from "@/features/auth/server/route";
import contact from "@/features/contact/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";
const app = new Hono().basePath("/api");

// ルートを正しく初期化
const routes = app
  .route("/auth", auth)
  .route("/contact", contact)
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  });

export const GET = handle(routes);
export const POST = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);

export type AppType = typeof routes;
