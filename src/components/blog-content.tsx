"use client";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    iframely?: { load: () => void };
  }
}

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

    // iframelyの処理
    if (window.iframely) {
      window.iframely.load();
    } else {
      const script = document.createElement("script");
      script.src = "//cdn.iframe.ly/embed.js";
      document.body.appendChild(script);
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
