import { createClient } from "@supabase/supabase-js";
import "server-only";

// クライアントサイドとサーバーサイドの両方で使用できるクライアント
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY!;

  return createClient(supabaseUrl, supabaseKey);
};

// サーバーサイドのみで使用されるクライアント（認証トークン付き）
export const createServerSupabaseClient = (authToken?: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY!;

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
