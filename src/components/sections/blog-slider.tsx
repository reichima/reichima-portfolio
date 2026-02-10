"use client";

import type { Blog } from "@/lib/microcms";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";

type BlogSliderProps = {
  blogs: Blog[];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogSlider({ blogs }: BlogSliderProps) {
  return (
    <>
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          gap: "2rem",
          pagination: true,
          arrows: true,
          autoplay: true,
          interval: 4000,
          pauseOnHover: true,
          pauseOnFocus: true,
          speed: 600,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          padding: { left: "3rem", right: "3rem" },
          breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1, padding: { left: "2rem", right: "2rem" } },
          },
        }}
        aria-label="ブログ記事"
        className="blog-splide"
      >
        {blogs.map((blog) => (
          <SplideSlide key={blog.id}>
            <Link
              href={`/blog/${blog.id}`}
              className="group relative block h-full overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/20"
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
                  <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-500">
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
          </SplideSlide>
        ))}
      </Splide>

      <style jsx global>{`
        .blog-splide .splide__arrow {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 3rem;
          height: 3rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .blog-splide .splide__arrow--prev {
          left: 1rem;
        }
        .blog-splide .splide__arrow--next {
          right: 1rem;
        }
        .blog-splide .splide__arrow:hover {
          background: rgba(255, 255, 255, 0.25);
          opacity: 1;
        }
        .blog-splide .splide__arrow svg {
          fill: white;
          width: 1.2rem;
          height: 1.2rem;
        }
        .blog-splide .splide__pagination {
          bottom: -2.5rem;
        }
        .blog-splide .splide__pagination__page {
          background: rgba(255, 255, 255, 0.3);
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .blog-splide .splide__pagination__page.is-active {
          background: rgb(6, 182, 212);
          transform: scale(1.3);
        }
      `}</style>
    </>
  );
}
