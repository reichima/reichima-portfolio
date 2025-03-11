import { createAdminClient } from "@/lib/appwrite";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.valid("json");
    console.log(email, password);
    return c.json({
      message: "Login successful!",
    });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password } = await c.req.valid("json");
    const { account } = await createAdminClient();
    const user = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
    console.log(name, email, password);
    return c.json({
      message: "Registration successful!",
    });
  });

export default app;
