import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.string().transform((val) => parseFloat(val)),
  date: z.string(),
  purpose: z.string().min(1, "目的を入力してください"),
  category: z.enum([
    "rent",
    "utilities",
    "entertainment",
    "food",
    "eating_out",
    "daily_necessities",
    "other",
  ]),
  note: z.string(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;