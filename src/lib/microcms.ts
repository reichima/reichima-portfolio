import { createClient, MicroCMSQueries } from "microcms-js-sdk";

// microCMS client
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const microcmsClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ============================================
// Common Types
// ============================================

/** microCMS共通フィールド */
export type MicroCMSContentBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

/** microCMSリストレスポンス */
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

/** microCMS画像フィールド */
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

// ============================================
// Category Types
// ============================================

/** カテゴリコンテンツ */
export type Category = MicroCMSContentBase & {
  name: string;
};

// ============================================
// Blog Types
// ============================================

/** ブログコンテンツ */
export type Blog = MicroCMSContentBase & {
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
};

// ============================================
// API Functions
// ============================================

/** ブログ一覧を取得 */
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return microcmsClient.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
};

/** ブログ詳細を取得 */
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return microcmsClient.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};

/** カテゴリ一覧を取得 */
export const getCategories = async (queries?: MicroCMSQueries) => {
  return microcmsClient.getList<Category>({
    endpoint: "categories",
    queries,
  });
};

/** カテゴリ詳細を取得 */
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return microcmsClient.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });
};

// Re-export types from microcms-js-sdk
export type { MicroCMSQueries };
