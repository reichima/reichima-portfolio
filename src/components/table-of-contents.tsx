"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  items: TocItem[];
  variant?: "default" | "sidebar";
};

export default function TableOfContents({
  items,
  variant = "default",
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );

    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    for (const el of targets) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  if (variant === "sidebar") {
    return (
      <nav className="toc">
        <p className="toc-label px-4 pt-4 pb-2">目次</p>
        <ol className="toc-list toc-list--sidebar">
          {items.map((item) => (
            <li
              key={item.id}
              className={`toc-item ${item.level === 3 ? "toc-item--nested" : ""} ${activeId === item.id ? "toc-item--active" : ""}`}
            >
              <a href={`#${item.id}`} className="toc-link">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav className="toc my-8">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="toc-toggle"
      >
        <span className="toc-label">目次</span>
        <svg
          className={`toc-chevron ${isOpen ? "toc-chevron--open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <ol className="toc-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`toc-item ${item.level === 3 ? "toc-item--nested" : ""} ${activeId === item.id ? "toc-item--active" : ""}`}
            >
              <a href={`#${item.id}`} className="toc-link">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
