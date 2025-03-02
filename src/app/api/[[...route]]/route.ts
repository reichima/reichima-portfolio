import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello/:helloId", (c) => {
	const helloId = c.req.param("helloId");
	return c.json({
		message: `Hello, ${helloId}!`,
	});
});

export const GET = handle(app);
