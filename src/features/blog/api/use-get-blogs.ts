import type { Blog, MicroCMSListResponse } from "@/lib/microcms";
import { useQuery } from "@tanstack/react-query";
import type { MicroCMSQueries } from "microcms-js-sdk";

type GetBlogsParams = {
  queries?: MicroCMSQueries;
};

export const useGetBlogs = (params?: GetBlogsParams) => {
  return useQuery<MicroCMSListResponse<Blog>>({
    queryKey: ["blogs", params?.queries],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.queries?.limit) {
        searchParams.set("limit", String(params.queries.limit));
      }
      if (params?.queries?.offset) {
        searchParams.set("offset", String(params.queries.offset));
      }
      if (params?.queries?.orders) {
        searchParams.set("orders", params.queries.orders);
      }
      if (params?.queries?.q) {
        searchParams.set("q", params.queries.q);
      }
      if (params?.queries?.filters) {
        searchParams.set("filters", params.queries.filters);
      }

      const response = await fetch(`/api/blogs?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      return response.json();
    },
  });
};
