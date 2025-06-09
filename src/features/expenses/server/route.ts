import db from "@/db";
import { expenses } from "@/db/schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { createExpenseSchema, updateExpenseSchema } from "../schemas";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        category: z.string().optional(),
      }),
    ),
    async (c) => {
      const user = c.get("user");
      const { from, to, category } = c.req.valid("query");

      const conditions = [eq(expenses.userId, user.id)];

      if (from) {
        conditions.push(gte(expenses.date, from));
      }

      if (to) {
        conditions.push(lte(expenses.date, to));
      }

      if (category && category !== "all") {
        conditions.push(eq(expenses.category, category as any));
      }

      const data = await db
        .select()
        .from(expenses)
        .where(and(...conditions))
        .orderBy(desc(expenses.date), desc(expenses.createdAt));

      return c.json({ data });
    },
  )
  .get("/:id", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const data = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.id, parseInt(id)), eq(expenses.userId, user.id)))
      .limit(1);

    if (data.length === 0) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data: data[0] });
  })
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createExpenseSchema),
    async (c) => {
      const user = c.get("user");
      const values = c.req.valid("json");

      const [data] = await db
        .insert(expenses)
        .values({
          ...values,
          userId: user.id,
          amount: values.amount.toString(),
        })
        .returning();

      return c.json({ data }, 201);
    },
  )
  .patch(
    "/:id",
    sessionMiddleware,
    zValidator("json", updateExpenseSchema),
    async (c) => {
      const user = c.get("user");
      const id = c.req.param("id");
      const values = c.req.valid("json");

      const [data] = await db
        .update(expenses)
        .set({
          ...values,
          amount: values.amount ? values.amount.toString() : undefined,
          updatedAt: new Date(),
        })
        .where(and(eq(expenses.id, parseInt(id)), eq(expenses.userId, user.id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    },
  )
  .delete("/:id", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");

    const [data] = await db
      .delete(expenses)
      .where(and(eq(expenses.id, parseInt(id)), eq(expenses.userId, user.id)))
      .returning();

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  });

export default app;
