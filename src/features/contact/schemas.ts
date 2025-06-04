import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(100, "名前は100文字以内で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  subject: z
    .string()
    .min(1, "件名は必須です")
    .max(200, "件名は200文字以内で入力してください"),
  message: z
    .string()
    .min(1, "メッセージは必須です")
    .max(2000, "メッセージは2000文字以内で入力してください"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
