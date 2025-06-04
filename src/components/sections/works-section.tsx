import Image from "next/image";
import { RefObject } from "react";

interface WorksSectionProps {
  worksRef: RefObject<HTMLElement>;
  worksTitleRef: RefObject<HTMLHeadingElement>;
  worksContentRef: RefObject<HTMLDivElement>;
}

export default function WorksSection({
  worksRef,
  worksTitleRef,
  worksContentRef,
}: WorksSectionProps) {
  return (
    <section
      id="works"
      ref={worksRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={worksTitleRef}
        className="relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
        style={{
          background: "linear-gradient(45deg, #ffffff, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Works
      </h2>

      <div ref={worksContentRef} className="mt-12 grid gap-8 lg:grid-cols-3">
        <a
          href="https://moraibosi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="mb-4 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-3">
              <Image
                src="/images/portfolio/moraiboshi.webp"
                alt="moraiboshi logo"
                width={128}
                height={128}
                className="h-full w-full rounded bg-white transition-transform duration-300 group-hover:scale-120"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              moraiboshi Ltd.
            </h3>
            <p className="mb-4 text-white/80">
              有限会社もらいぼしSE部 Webサイト構築
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                Next.js
              </span>
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                Laravel
              </span>
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                TypeScript
              </span>
            </div>
          </div>
        </a>

        <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 p-3">
              <div className="h-full w-full rounded bg-white"></div>
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Coming Soon</h3>
            <p className="mb-4 text-white/80">準備中</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                Next.js
              </span>
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                Go
              </span>
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                PostgreSQL
              </span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-3">
              <div className="h-full w-full rounded bg-white"></div>
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Coming Soon</h3>
            <p className="mb-4 text-white/80">準備中</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                ReactNative
              </span>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                Go
              </span>
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                PostgreSQL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
