import type { Category, MicroCMSListResponse } from "@/lib/microcms";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery<MicroCMSListResponse<Category>>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return response.json();
    },
  });
};
