import {
  date,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id").unique().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const expensesCategoryEnum = pgEnum("expensesCategory", [
  "rent",
  "utilities",
  "entertainment",
  "food",
  "eating_out",
  "daily_necessities",
  "other",
]);

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull(),
  amount: numeric("amount").notNull(),
  date: date("date").notNull(),
  purpose: text("purpose").notNull(),
  category: expensesCategoryEnum().notNull().default("other"),
  note: text("note").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
