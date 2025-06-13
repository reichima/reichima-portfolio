"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const categoryLabels: Record<string, string> = {
  rent: "家賃",
  utilities: "光熱費",
  entertainment: "娯楽",
  food: "食費",
  eating_out: "外食",
  daily_necessities: "日用品",
  other: "その他",
};

const categoryColors: Record<string, string> = {
  rent: "bg-blue-100 text-blue-800",
  utilities: "bg-yellow-100 text-yellow-800",
  entertainment: "bg-purple-100 text-purple-800",
  food: "bg-green-100 text-green-800",
  eating_out: "bg-orange-100 text-orange-800",
  daily_necessities: "bg-pink-100 text-pink-800",
  other: "bg-gray-100 text-gray-800",
};

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(numAmount);
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0,
  );

  return (
    <div className="space-y-4">
      {/* 合計金額カード */}
      <div className="bg-card rounded-lg border p-4 text-center sm:text-left">
        <p className="text-muted-foreground text-sm">合計金額</p>
        <p className="text-xl font-bold sm:text-2xl">
          {formatCurrency(totalAmount.toString())}
        </p>
      </div>

      {/* デスクトップ表示 - テーブル */}
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日付</TableHead>
              <TableHead>目的</TableHead>
              <TableHead>カテゴリ</TableHead>
              <TableHead className="text-right">金額</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground text-center"
                >
                  データがありません
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {format(new Date(expense.date), "PP", { locale: ja })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{expense.purpose}</p>
                      {expense.note && (
                        <p className="text-muted-foreground text-sm">
                          {expense.note}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        categoryColors[expense.category] || categoryColors.other
                      }
                    >
                      {categoryLabels[expense.category] || "その他"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(expense)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* モバイル表示 - カードレイアウト */}
      <div className="md:hidden space-y-3">
        {expenses.length === 0 ? (
          <div className="rounded-lg border p-6 text-center">
            <p className="text-muted-foreground">データがありません</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className={`${
                        categoryColors[expense.category] || categoryColors.other
                      } text-xs`}
                    >
                      {categoryLabels[expense.category] || "その他"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(expense.date), "M/d", { locale: ja })}
                    </span>
                  </div>
                  <p className="font-medium text-sm truncate">{expense.purpose}</p>
                  {expense.note && (
                    <p className="text-muted-foreground text-xs mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {expense.note}
                    </p>
                  )}
                </div>
                <div className="text-right ml-2">
                  <p className="font-bold text-sm">
                    {formatCurrency(expense.amount)}
                  </p>
                  <div className="flex gap-1 mt-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(expense)}
                      className="h-7 w-7 p-0"
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(expense.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
