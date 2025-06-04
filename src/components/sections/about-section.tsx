import Image from "next/image";
import { RefObject } from "react";

interface AboutSectionProps {
  aboutRef: RefObject<HTMLElement>;
  profileImageRef: RefObject<HTMLImageElement>;
  aboutTitleRef: RefObject<HTMLHeadingElement>;
  aboutTextRef: RefObject<HTMLDivElement>;
}

export default function AboutSection({
  aboutRef,
  profileImageRef,
  aboutTitleRef,
  aboutTextRef,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen w-full snap-start overflow-hidden p-8"
    >
      <div className="h-16"></div>
      <h2
        ref={aboutTitleRef}
        className="relative py-6 pl-2 text-6xl font-bold tracking-wider text-white opacity-0"
        style={{
          background: "linear-gradient(45deg, #ffffff, #a855f7, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        About Me
      </h2>

      <div className="mt-12 flex flex-col items-center justify-center gap-12 lg:flex-row">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-lg"></div>
          <Image
            ref={profileImageRef}
            src="/images/portfolio/reichima.png"
            alt="profile"
            width={280}
            height={280}
            className="relative rounded-full border-4 border-white/20 opacity-0 shadow-2xl"
          />
        </div>

        <div ref={aboutTextRef} className="max-w-lg space-y-6">
          <div className="rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md">
            <p className="text-lg leading-relaxed text-white/90">
              🚀
              Webエンジニアとして、最新技術を駆使したモダンな開発を行っています
            </p>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md">
            <p className="text-lg leading-relaxed text-white/90">
              💎 得意言語はRubyで、エレガントなコードを書くことを心がけています
            </p>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 opacity-0 shadow-xl backdrop-blur-md">
            <p className="text-lg leading-relaxed text-white/90">
              ⚡
              サーバー構築からPHPシステム開発まで、フルスタックな技術で課題を解決します
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
