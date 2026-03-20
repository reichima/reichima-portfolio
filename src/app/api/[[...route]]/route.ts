import blogs, { categoriesRoute } from "@/features/blog/server/route";
import contact from "@/features/contact/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app
  .route("/blogs", blogs)
  .route("/categories", categoriesRoute)
  .route("/contact", contact)
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  });

export const GET = handle(routes);
export const POST = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);

export type AppType = typeof routes;
