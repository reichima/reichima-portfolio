import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "8文字以上入力してください" })
		.max(256),
});

export const registerSchema = z.object({
	name: z.string().trim().min(1),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "8文字以上入力してください" })
		.max(256),
});
