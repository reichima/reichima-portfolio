"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaFireAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialSection() {
  const specialRef = useRef<HTMLElement>(null);
  const specialTitleRef = useRef<HTMLHeadingElement>(null);
  const specialContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
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
        style={{}}
      >
        Special
      </h2>

      <div
        ref={specialContentRef}
        className="mt-12 flex flex-col items-center justify-center"
      >
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
