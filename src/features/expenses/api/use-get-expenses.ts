import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetExpensesOptions {
  from?: string;
  to?: string;
  category?: string;
}

export const useGetExpenses = ({
  from,
  to,
  category,
}: UseGetExpensesOptions = {}) => {
  return useQuery({
    queryKey: ["expenses", { from, to, category }],
    queryFn: async () => {
      const response = await client.api.expenses.$get({
        query: {
          from,
          to,
          category,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const { data } = await response.json();
      return data;
    },
  });
};