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
        className="relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
        style={{}}
      >
        Special
      </h2>

      <div
        ref={specialContentRef}
        className="mt-12 flex flex-col items-center justify-center"
      >
        <div className="relative mb-8 opacity-0">
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-purple-500 opacity-75 blur-lg"></div>
          <Image
            src="/images/portfolio/wait-image.png"
            alt="special content"
            width={600}
            height={600}
            className="relative rounded-2xl border-4 border-white/20 shadow-2xl"
            loading="lazy"
          />
        </div>

        <div className="max-w-3xl space-y-6 opacity-0">
          <div className="rounded-xl border border-white/20 bg-white/10 p-8 text-center shadow-xl backdrop-blur-md">
            <h3 className="mb-4 text-2xl font-bold text-white">
              <FaFireAlt className="mr-1 inline size-6 text-red-400" />
              Coming Soon
              <FaFireAlt className="ml-1 inline size-6 text-red-400" />
            </h3>
            <p className="text-lg leading-relaxed text-white/90"></p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-4 h-12 w-12 rounded-lg bg-purple-500 p-3">
                <div className="h-full w-full rounded bg-white"></div>
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">個人開発</h4>
              <p className="text-white/80">頑張ってます</p>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-4 h-12 w-12 rounded-lg bg-pink-500 p-3">
                <div className="h-full w-full rounded bg-white"></div>
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">副業</h4>
              <p className="text-white/80">
                土日、平日夜稼働での副業案件を募集中
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
