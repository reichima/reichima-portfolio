import { getBlogDetail, getBlogs, getCategories } from "@/lib/microcms";
import { Hono } from "hono";

const app = new Hono()
  // ブログ一覧取得
  .get("/", async (c) => {
    const { limit, offset, orders, q, filters } = c.req.query();

    const blogs = await getBlogs({
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orders: orders || undefined,
      q: q || undefined,
      filters: filters || undefined,
    });

    return c.json(blogs);
  })
  // ブログ詳細取得
  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const blog = await getBlogDetail(id);

    return c.json(blog);
  });

export default app;

// カテゴリ用のルート
export const categoriesRoute = new Hono().get("/", async (c) => {
  const categories = await getCategories();

  return c.json(categories);
});
