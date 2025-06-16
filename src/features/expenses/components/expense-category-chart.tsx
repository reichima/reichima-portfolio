"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

interface ExpenseCategoryChartProps {
  data: CategoryData[];
}

const categoryLabels: Record<string, string> = {
  rent: "家賃",
  utilities: "光熱費",
  entertainment: "娯楽",
  food: "食費",
  eating_out: "外食",
  daily_necessities: "日用品",
  other: "その他",
};

const COLORS = {
  rent: "#3b82f6",
  utilities: "#f59e0b",
  entertainment: "#8b5cf6",
  food: "#10b981",
  eating_out: "#f97316",
  daily_necessities: "#ec4899",
  other: "#6b7280",
};

const chartConfig = {
  amount: {
    label: "支出額",
  },
  rent: {
    label: "家賃",
    color: COLORS.rent,
  },
  utilities: {
    label: "光熱費",
    color: COLORS.utilities,
  },
  entertainment: {
    label: "娯楽",
    color: COLORS.entertainment,
  },
  food: {
    label: "食費",
    color: COLORS.food,
  },
  eating_out: {
    label: "外食",
    color: COLORS.eating_out,
  },
  daily_necessities: {
    label: "日用品",
    color: COLORS.daily_necessities,
  },
  other: {
    label: "その他",
    color: COLORS.other,
  },
} satisfies ChartConfig;

export function ExpenseCategoryChart({ data }: ExpenseCategoryChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    label: categoryLabels[item.category] || item.category,
    fill: COLORS[item.category as keyof typeof COLORS] || COLORS.other,
  }));

  return (
    <Card className="shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-neutral-700">カテゴリ別支出</CardTitle>
        <CardDescription className="text-neutral-600">今月の支出内訳</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <div className="flex items-center justify-between gap-2">
                        <span>{name}</span>
                        <span className="font-mono font-medium">
                          {new Intl.NumberFormat("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                          }).format(value as number)}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage.toFixed(0)}%`}
                outerRadius={80}
                dataKey="amount"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-neutral-600">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}