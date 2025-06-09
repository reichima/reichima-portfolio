import * as bcrypt from "bcryptjs";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { expenses, users } from "./schema";

config({ path: ".env" });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // パスワードをハッシュ化
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password456", 10);

    // ユーザーを作成
    const insertedUsers = await db
      .insert(users)
      .values([
        {
          name: "Reichima",
          email: "tanaka@example.com",
          password: hashedPassword1,
        },
        {
          name: "Wake",
          email: "sato@example.com",
          password: hashedPassword2,
        },
      ])
      .returning();

    console.log(`✅ Created ${insertedUsers.length} users`);

    // サンプルの支出データを作成（最初のユーザー用）
    const userId = insertedUsers[0].id;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const sampleExpenses = [
      {
        userId,
        amount: "100000",
        date: new Date(currentYear, currentMonth, 1)
          .toISOString()
          .split("T")[0],
        purpose: "家賃",
        category: "rent" as const,
        note: "今月の家賃",
      },
      {
        userId,
        amount: "15000",
        date: new Date(currentYear, currentMonth, 5)
          .toISOString()
          .split("T")[0],
        purpose: "電気代",
        category: "utilities" as const,
        note: "今月の電気代",
      },
      {
        userId,
        amount: "8000",
        date: new Date(currentYear, currentMonth, 10)
          .toISOString()
          .split("T")[0],
        purpose: "スーパーマーケット",
        category: "food" as const,
        note: "週末の買い物",
      },
      {
        userId,
        amount: "3500",
        date: new Date(currentYear, currentMonth, 15)
          .toISOString()
          .split("T")[0],
        purpose: "レストラン",
        category: "eating_out" as const,
        note: "友人との夕食",
      },
      {
        userId,
        amount: "5000",
        date: new Date(currentYear, currentMonth, 20)
          .toISOString()
          .split("T")[0],
        purpose: "映画とポップコーン",
        category: "entertainment" as const,
        note: "週末の映画鑑賞",
      },
    ];

    const insertedExpenses = await db
      .insert(expenses)
      .values(sampleExpenses)
      .returning();

    console.log(`✅ Created ${insertedExpenses.length} sample expenses`);

    console.log("🎉 Seeding completed successfully!");
    console.log("\n📝 Created users:");
    console.log("1. Email: tanaka@example.com, Password: password123");
    console.log("2. Email: sato@example.com, Password: password456");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await client.end();
    process.exit(0);
  }
}

seed();
