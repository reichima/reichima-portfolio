import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateExpenseInput } from "../schemas";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateExpenseInput;
    }) => {
      const response = await client.api.expenses[":id"].$patch({
        param: { id: id.toString() },
        json: {
          ...data,
          amount: data.amount ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("支出を更新しました");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: () => {
      toast.error("支出の更新に失敗しました");
    },
  });
};
