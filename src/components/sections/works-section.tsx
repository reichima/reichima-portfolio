"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { useRef } from "react";

export default function WorksSection() {
  const worksRef = useRef<HTMLElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: worksRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        worksTitleRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      );

      tl.fromTo(
        ".works-card",
        { opacity: 0, y: 100, rotationX: 45 },
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
    },
    { scope: worksRef },
  );

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

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <a
          href="https://reichima.com/blog/omkrvty4lgf"
          target="_blank"
          rel="noopener noreferrer"
          className="works-card group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <div className="relative z-10">
            <div className="bg-portfolio-primary mb-4 flex items-center justify-center overflow-hidden rounded-lg p-3">
              <Image
                src="/images/portfolio/household_budget.png"
                alt="household budget app"
                width={128}
                height={128}
                className="h-48 w-full rounded bg-white object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              家計簿システム
            </h3>
            <p className="mb-4 text-white/80">自宅用</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                Laravel
              </span>
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                Inertia
              </span>
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                React
              </span>
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
                Shadcn
              </span>
            </div>
          </div>
        </a>
        <a
          href="https://denzirou.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="works-card group relative block overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <div className="relative z-10">
            <div className="bg-portfolio-primary mb-4 flex items-center justify-center overflow-hidden rounded-lg p-3">
              <Image
                src="/images/portfolio/denzirou.png"
                alt="denzirou logo"
                width={128}
                height={128}
                className="h-48 w-full rounded bg-white object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              株式会社藤原伝次郎商店様
            </h3>
            <p className="mb-4 text-white/80">Webサイト構築</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-portfolio-primary/20 text-portfolio-primary-light rounded-full px-3 py-1 text-xs">
                Next.js
              </span>
              <span className="bg-portfolio-primary/20 text-portfolio-primary-light rounded-full px-3 py-1 text-xs">
                Laravel
              </span>
              <span className="bg-portfolio-primary/20 text-portfolio-primary-light rounded-full px-3 py-1 text-xs">
                TypeScript
              </span>
            </div>
          </div>
        </a>

        <a
          href="https://menherun.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="works-card group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <div className="relative z-10">
            <div className="bg-portfolio-primary mb-4 flex items-center justify-center overflow-hidden rounded-lg p-3">
              <Image
                src="/images/portfolio/menherun.png"
                alt="Menherun"
                width={128}
                height={128}
                className="h-48 w-full rounded bg-white object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Menherun
            </h3>
            <p className="mb-4 text-white/80">ランゲーム</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-300">
                Phaser.js
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
