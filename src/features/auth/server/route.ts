import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
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
		console.log(name, email, password);
		return c.json({
			message: "Registration successful!",
		});
	});

export default app;
