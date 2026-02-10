"use client";

import type { Blog } from "@/lib/microcms";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const BlogSlider = dynamic(() => import("./blog-slider"), { ssr: false });

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

      tl.fromTo(
        blogTitleRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      );

      tl.fromTo(
        blogContentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );
    }
  }, []);

  return (
    <section
      id="blog"
      ref={blogRef}
      className="relative min-h-screen w-full snap-start overflow-hidden py-8"
    >
      <div className="h-16" />
      <div className="px-8">
        <h2
          ref={blogTitleRef}
          className="font-orbitron relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
        >
          Blog
        </h2>
      </div>

      <div ref={blogContentRef} className="mt-12 opacity-0">
        {blogs.length > 0 ? (
          <BlogSlider blogs={blogs} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-white/60">
            <p className="text-lg">記事がまだありません</p>
          </div>
        )}
      </div>
    </section>
  );
}
