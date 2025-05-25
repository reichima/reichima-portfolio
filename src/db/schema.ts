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

// profiles テーブルを users に変更し、email と password フィールドを追加
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // userId を id に変更し、主キーとする
  name: text("name").notNull(),
  email: text("email").unique().notNull(), // email フィールドを追加
  password: text("password").notNull(), // password フィールドを追加（ハッシュ化されたパスワードを保存）
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
  userId: uuid("user_id") // usersテーブルのidを参照するためuuidに変更
    .notNull()
    .references(() => users.id), // usersテーブルのidを参照
  amount: numeric("amount").notNull(),
  date: date("date").notNull(),
  purpose: text("purpose").notNull(),
  category: expensesCategoryEnum("category").notNull().default("other"), // categoryカラム名に変更
  note: text("note").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
