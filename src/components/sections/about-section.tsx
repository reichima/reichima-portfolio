"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PcCase, Rocket } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GiSkills, GiTalk } from "react-icons/gi";
import AboutCode from "./about-code";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState("view");

  useEffect(() => {
    // GSAP ScrollTrigger animations
    if (
      aboutRef.current &&
      profileImageRef.current &&
      aboutTitleRef.current &&
      aboutTextRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.fromTo(
        aboutTitleRef.current,
        {
          opacity: 0,
          x: -100,
          rotationY: -90,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Profile image animation
      tl.fromTo(
        profileImageRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );

      // Text content animation
      const textElements = aboutTextRef.current.children;
      tl.fromTo(
        textElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={aboutTitleRef}
        className="font-orbitron py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
      >
        About Me
      </h2>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-8 w-full"
      >
        <div className="mb-8 flex justify-center">
          <TabsList className="grid w-[400px] grid-cols-2 bg-white/10 text-white">
            <TabsTrigger value="view" tabIndex={activeTab === "view" ? -1 : 0}>
              View
            </TabsTrigger>
            <TabsTrigger value="code" tabIndex={activeTab === "code" ? -1 : 0}>
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="view" tabIndex={-1}>
          <div className="mt-4 flex flex-col items-center justify-center gap-12 lg:flex-row">
            <div className="relative">
              <div className="bg-portfolio-primary absolute inset-0 animate-pulse rounded-full opacity-75 blur-lg"></div>
              <Image
                ref={profileImageRef}
                src="/images/portfolio/profile.png"
                alt="profile"
                width={280}
                height={280}
                className="relative rounded-full border-4 border-white/20 shadow-2xl"
                loading="lazy"
              />
            </div>

            <div ref={aboutTextRef} className="max-w-lg space-y-6">
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <Rocket className="text-portfolio-primary mr-1 inline h-6 w-6" />
                  栃木でWebエンジニアをしているReichimaです
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <PcCase className="mr-1 inline h-6 w-6 text-yellow-400" />
                  バックエンドが主ですが、フロントエンドやサーバー構築も可能です。
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <GiSkills className="mr-1 inline h-6 w-6 text-yellow-400" />
                  PHP(Laravel)、TypeScript(Next.js、Hono)、Rubyをよく使用します。
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <p className="text-lg leading-relaxed text-white/90">
                  <GiTalk className="mr-1 inline h-6 w-6 text-blue-400" />
                  最近はGoとAI開発にハマっています。
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="flex justify-center" tabIndex={-1}>
          <AboutCode />
        </TabsContent>
      </Tabs>
    </section>
  );
}
