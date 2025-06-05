import auth from "@/features/auth/server/route";
import contact from "@/features/contact/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/contact", contact);

export const GET = handle(routes);
export const POST = handle(routes);

export type AppType = typeof routes;
