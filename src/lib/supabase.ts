// NOTE: 移行して使っていない
import { createClient } from "@supabase/supabase-js";
import "server-only";

// サーバーサイドのみで使用されるクライアント（認証トークン付き）
export const createSupabaseClient = (authToken?: string) => {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_ANON_KEY!;

  const options = {
    auth: {
      persistSession: false,
    },
    global: {
      headers: authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : undefined,
    },
  };

  return createClient(supabaseUrl, supabaseKey, options);
};
