"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function WorksSection() {
  const worksRef = useRef<HTMLElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);
  const worksContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    if (worksRef.current && worksTitleRef.current && worksContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: worksRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.fromTo(
        worksTitleRef.current,
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

      // Works cards animation
      const workCards = worksContentRef.current.children;
      tl.fromTo(
        workCards,
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
          stagger: 0.3,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }
  }, []);

  return (
    <section
      id="works"
      ref={worksRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={worksTitleRef}
        className="font-orbitron relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
      >
        Works
      </h2>

      <div ref={worksContentRef} className="mt-12 grid gap-8 lg:grid-cols-3">
        <a
          href="https://denzirou.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-portfolio-primary p-3">
              <Image
                src="/images/portfolio/denzirou.png"
                alt="denzirou logo"
                width={128}
                height={128}
                className="h-48 w-full rounded bg-white object-cover transition-transform duration-300 group-hover:scale-120"
                loading="lazy"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              株式会社藤原伝次郎商店様
            </h3>
            <p className="mb-4 text-white/80">Webサイト構築</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-portfolio-primary/20 px-3 py-1 text-xs text-portfolio-primary-light">
                Next.js
              </span>
              <span className="rounded-full bg-portfolio-primary/20 px-3 py-1 text-xs text-portfolio-primary-light">
                Laravel
              </span>
              <span className="rounded-full bg-portfolio-primary/20 px-3 py-1 text-xs text-portfolio-primary-light">
                TypeScript
              </span>
            </div>
          </div>
        </a>

        <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
          <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-portfolio-primary p-3">
              <Image
                src="/images/portfolio/ogp.png"
                alt="portfolio logo"
                width={128}
                height={128}
                className="h-48 w-full rounded bg-white object-cover transition-transform duration-300 group-hover:scale-120"
                loading="lazy"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              ポートフォリオサイト
            </h3>
            <p className="mb-4 text-white/80">こちらのサイト</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                Next.js
              </span>
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                GSAP
              </span>
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                Hono
              </span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
          <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="relative z-10">
            <div className="mb-4 h-12 w-12 rounded-lg bg-blue-500 p-3">
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
