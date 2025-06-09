"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Expense {
  id: number;
  amount: string;
  date: string;
  purpose: string;
  category: string;
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
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(parseFloat(amount));
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm text-muted-foreground">合計金額</p>
        <p className="text-2xl font-bold">{formatCurrency(totalAmount.toString())}</p>
      </div>

      <div className="rounded-lg border">
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
                <TableCell colSpan={5} className="text-center text-muted-foreground">
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
                        <p className="text-sm text-muted-foreground">{expense.note}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={categoryColors[expense.category] || categoryColors.other}
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
    </div>
  );
}