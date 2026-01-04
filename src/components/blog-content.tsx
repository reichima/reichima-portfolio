"use client";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect, useRef } from "react";

type BlogContentProps = {
  content: string;
};

export default function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="blog-content max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
