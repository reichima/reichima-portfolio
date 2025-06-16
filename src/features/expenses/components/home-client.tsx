"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetExpenses } from "@/features/expenses/api/use-get-expenses";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { ExpenseCategoryChart } from "./expense-category-chart";
import { ExpenseChart } from "./expense-chart";

interface Expense {
  id: number;
  amount: string;
  date: string;
  purpose: string;
  category:
    | "rent"
    | "utilities"
    | "entertainment"
    | "food"
    | "eating_out"
    | "daily_necessities"
    | "other";
  note: string;
}

export function HomeClient() {
  const currentDate = new Date();
  const sixMonthsAgo = subMonths(currentDate, 6);

  // 過去6ヶ月のデータを取得
  const { data: expenses, isLoading } = useGetExpenses({
    from: format(startOfMonth(sixMonthsAgo), "yyyy-MM-dd"),
    to: format(endOfMonth(currentDate), "yyyy-MM-dd"),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="mb-6 text-2xl font-bold text-neutral-700">
            ダッシュボード
          </h1>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // エリアチャート用データ
  const chartData = (expenses || []).map((expense: Expense) => ({
    date: expense.date,
    amount: parseFloat(expense.amount),
    category: expense.category,
  }));

  // カテゴリ別集計（今月のみ）
  const currentMonthExpenses = (expenses || []).filter((expense: Expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const categoryTotals = currentMonthExpenses.reduce(
    (acc: Record<string, number>, expense: Expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += parseFloat(expense.amount);
      return acc;
    },
    {},
  );

  const totalAmount = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + amount,
    0,
  );

  const categoryData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalAmount) * 100,
    }),
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-700">ダッシュボード</h1>

      {/* サマリーカード */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
          <p className="text-sm text-neutral-600">今月の支出合計</p>
          <p className="mt-2 text-2xl font-bold text-neutral-800">
            {new Intl.NumberFormat("ja-JP", {
              style: "currency",
              currency: "JPY",
            }).format(totalAmount)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
          <p className="text-sm text-neutral-600">今月の取引数</p>
          <p className="mt-2 text-2xl font-bold text-neutral-800">
            {currentMonthExpenses.length}件
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
          <p className="text-sm text-neutral-600">平均支出額</p>
          <p className="mt-2 text-2xl font-bold text-neutral-800">
            {currentMonthExpenses.length > 0
              ? new Intl.NumberFormat("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                }).format(totalAmount / currentMonthExpenses.length)
              : "¥0"}
          </p>
        </div>
      </div>

      {/* チャート */}
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseChart data={chartData} />
        <ExpenseCategoryChart data={categoryData} />
      </div>
    </div>
  );
}
