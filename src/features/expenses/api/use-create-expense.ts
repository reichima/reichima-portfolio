import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { CreateExpenseInput } from "../schemas";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExpenseInput) => {
      const response = await client.api.expenses.$post({
        json: {
          ...data,
          amount: data.amount.toString(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create expense");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("支出を追加しました");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: () => {
      toast.error("支出の追加に失敗しました");
    },
  });
};