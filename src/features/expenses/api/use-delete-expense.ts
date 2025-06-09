import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await client.api.expenses[":id"].$delete({
        param: { id: id.toString() },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("支出を削除しました");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: () => {
      toast.error("支出の削除に失敗しました");
    },
  });
};