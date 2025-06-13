"use client";

import { endOfMonth, format, startOfMonth } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { useCreateExpense } from "@/features/expenses/api/use-create-expense";
import { useDeleteExpense } from "@/features/expenses/api/use-delete-expense";
import { useGetExpenses } from "@/features/expenses/api/use-get-expenses";
import { useUpdateExpense } from "@/features/expenses/api/use-update-expense";
import { CreateExpenseInput } from "../schemas";
import { ExpenseForm } from "./expense-form";
import { ExpenseList } from "./expense-list";

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

export function MoneyClient() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<
    | "all"
    | "rent"
    | "utilities"
    | "entertainment"
    | "food"
    | "eating_out"
    | "daily_necessities"
    | "other"
  >("all");

  const startDate = format(startOfMonth(currentDate), "yyyy-MM-dd");
  const endDate = format(endOfMonth(currentDate), "yyyy-MM-dd");

  const { data: expenses, isLoading } = useGetExpenses({
    from: startDate,
    to: endDate,
    category: categoryFilter === "all" ? undefined : categoryFilter,
  });

  const createMutation = useCreateExpense();
  const updateMutation = useUpdateExpense();
  const deleteMutation = useDeleteExpense();

  const handlePreviousMonth = () => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const handleSubmit = (data: CreateExpenseInput) => {
    if (editingExpense) {
      updateMutation.mutate(
        { id: editingExpense.id, data },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingExpense(null);
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("本当に削除しますか？")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingExpense(null);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value as typeof categoryFilter);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* ヘッダー部分 - モバイルでは縦積み、デスクトップでは横並び */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* 月ナビゲーション */}
        <div className="flex items-center justify-center gap-2 lg:justify-start">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold sm:text-2xl">
            {format(currentDate, "yyyy年M月", { locale: ja })}
          </h1>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* フィルター・追加ボタン */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="rent">家賃</SelectItem>
              <SelectItem value="utilities">光熱費</SelectItem>
              <SelectItem value="entertainment">娯楽</SelectItem>
              <SelectItem value="food">食費</SelectItem>
              <SelectItem value="eating_out">外食</SelectItem>
              <SelectItem value="daily_necessities">日用品</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">支出を追加</span>
            <span className="sm:hidden">追加</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <ExpenseList
          expenses={expenses || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-lg mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              {editingExpense ? "支出を編集" : "支出を追加"}
            </DialogTitle>
          </DialogHeader>
          <ExpenseForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isPending={createMutation.isPending || updateMutation.isPending}
            defaultValues={
              editingExpense
                ? {
                    amount: parseFloat(editingExpense.amount),
                    date: editingExpense.date,
                    purpose: editingExpense.purpose,
                    category: editingExpense.category,
                    note: editingExpense.note,
                  }
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
