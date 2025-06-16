"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseChartData {
  date: string;
  amount: number;
  category: string;
}

interface ExpenseChartProps {
  data: ExpenseChartData[];
  title?: string;
  description?: string;
}

const chartConfig = {
  amount: {
    label: "支出額",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ExpenseChart({ 
  data, 
  title = "月別支出推移",
  description = "過去6ヶ月間の支出額の推移"
}: ExpenseChartProps) {
  // データを日付でグループ化して集計
  const aggregatedData = data.reduce((acc, item) => {
    const month = format(new Date(item.date), "yyyy-MM");
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += item.amount;
    return acc;
  }, {} as Record<string, number>);

  // チャート用データに変換
  const chartData = Object.entries(aggregatedData)
    .map(([month, amount]) => ({
      month: format(new Date(month), "M月", { locale: ja }),
      amount: amount,
    }))
    .sort((a, b) => {
      const aMonth = parseInt(a.month);
      const bMonth = parseInt(b.month);
      return aMonth - bMonth;
    })
    .slice(-6); // 最新6ヶ月分のみ表示

  return (
    <Card className="shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-neutral-700">{title}</CardTitle>
        <CardDescription className="text-neutral-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: "#525252" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "#525252" }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("ja-JP", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(value as number)
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}