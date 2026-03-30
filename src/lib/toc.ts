import type { TocItem } from "@/components/table-of-contents";

/**
 * HTMLコンテンツからh2/h3見出しを抽出し、アンカー用のidを付与する。
 * microCMS等のリッチエディタ出力を想定。
 */
export function extractHeadings(html: string) {
  const tocItems: TocItem[] = [];

  const contentWithIds = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]*>/g, "");
      const id = `toc-${tocItems.length}`;
      const level = Number.parseInt(tag.charAt(1));
      tocItems.push({ id, text, level });
      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, "");
      return `<${tag}${cleanAttrs} id="${id}">${inner}</${tag}>`;
    },
  );

  return { tocItems, contentWithIds };
}
