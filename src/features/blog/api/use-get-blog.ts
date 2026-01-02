import type { Blog } from "@/lib/microcms";
import { useQuery } from "@tanstack/react-query";

type GetBlogParams = {
  id: string;
};

export const useGetBlog = ({ id }: GetBlogParams) => {
  return useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      return response.json();
    },
    enabled: !!id,
  });
};
