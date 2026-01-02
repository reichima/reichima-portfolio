"use client";

import type { Blog } from "@/lib/microcms";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type BlogSectionProps = {
  blogs: Blog[];
};

export default function BlogSection({ blogs }: BlogSectionProps) {
  const blogRef = useRef<HTMLElement>(null);
  const blogTitleRef = useRef<HTMLHeadingElement>(null);
  const blogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blogRef.current && blogTitleRef.current && blogContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blogRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.fromTo(
        blogTitleRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Blog cards animation
      const blogCards = blogContentRef.current.children;
      tl.fromTo(
        blogCards,
        {
          opacity: 0,
          y: 100,
          rotationX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section
      id="blog"
      ref={blogRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={blogTitleRef}
        className="relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
      >
        Blog
      </h2>

      <div ref={blogContentRef} className="mt-12 grid gap-8 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="group relative block overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            <div className="relative z-10">
              {blog.eyecatch ? (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    width={blog.eyecatch.width}
                    height={blog.eyecatch.height}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                  <span className="text-4xl text-white/80">Blog</span>
                </div>
              )}
              <div className="mb-2 text-sm text-white/60">
                {formatDate(blog.publishedAt)}
              </div>
              <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white">
                {blog.title}
              </h3>
              {blog.category && (
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                    {blog.category.name}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}

        {blogs.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 text-white/60">
            <p className="text-lg">記事がまだありません</p>
          </div>
        )}
      </div>
    </section>
  );
}
