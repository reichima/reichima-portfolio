"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { GoHistory } from "react-icons/go";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialSection() {
  const specialRef = useRef<HTMLElement>(null);
  const specialTitleRef = useRef<HTMLHeadingElement>(null);
  const specialContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      specialRef.current &&
      specialTitleRef.current &&
      specialContentRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: specialRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        specialTitleRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -45,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
      );

      const specialElements = specialContentRef.current.children;
      tl.fromTo(
        specialElements,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }
  }, []);

  return (
    <section
      id="special"
      ref={specialRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={specialTitleRef}
        className="font-orbitron relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
      >
        Special
      </h2>

      <div
        ref={specialContentRef}
        className="mt-12 flex flex-col items-center justify-center"
      >
        <Link
          href="/game-ranking"
          className="group relative mb-8 block w-full max-w-3xl opacity-0"
        >
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-yellow-500 via-red-500 to-purple-500 opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-75"></div>
          <div className="relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15">
            <div className="mb-4 flex items-center justify-center gap-3">
              <h3 className="font-orbitron text-3xl font-bold text-white">
                Game Ranking
              </h3>
            </div>
            <p className="mb-6 text-center text-lg text-white/80">
              歴代プレイしたゲームの中から圧倒的主観のみでランキング付けしました。
            </p>
            <div className="flex justify-center">
              <span className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-bold text-white transition-all duration-300 group-hover:bg-white/20">
                ランキングを見る →
              </span>
            </div>
          </div>
        </Link>

        <div className="max-w-3xl space-y-6 opacity-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/changelog"
              className="group rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20">
                <GoHistory className="text-2xl text-emerald-300" />
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">変更ログ</h4>
              <p className="text-white/80">ポートフォリオの更新履歴を確認</p>
            </Link>
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
              <Image
                src="/images/portfolio/wait-image.png"
                alt="special content"
                width={600}
                height={600}
                className="relative rounded-2xl border-4 border-white/20 shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
