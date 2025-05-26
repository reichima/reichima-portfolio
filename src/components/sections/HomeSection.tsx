import Scroll from "@/components/scroll";
import { RefObject } from "react";

interface HomeSectionProps {
  homeRef: RefObject<HTMLElement>;
  homeTitleRef: RefObject<HTMLHeadingElement>;
  homeSubtitleRef: RefObject<HTMLParagraphElement>;
}

export default function HomeSection({
  homeRef,
  homeTitleRef,
  homeSubtitleRef,
}: HomeSectionProps) {
  return (
    <section
      id="home"
      ref={homeRef}
      className="relative z-10 grid min-h-screen w-full snap-start place-items-center overflow-hidden"
    >
      <div className="relative z-10 text-center">
        <h1
          ref={homeTitleRef}
          className="mb-8 text-7xl font-bold tracking-wider text-white opacity-0 lg:text-8xl"
          style={{
            background: "linear-gradient(45deg, #ffffff, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Portfolio
        </h1>
        <p
          ref={homeSubtitleRef}
          className="mb-12 text-xl text-white/80 opacity-0 lg:text-2xl"
        >
          Modern Web Development & Creative Solutions
        </p>
        <div
          className="opacity-0"
          style={{ animation: "fadeInUp 1s ease-out 2s forwards" }}
        >
          <Scroll />
        </div>
      </div>

      {/* Floating elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-4 w-4 animate-bounce rounded-full bg-purple-400/30 delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 h-6 w-6 animate-bounce rounded-full bg-pink-400/30 delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 h-3 w-3 animate-bounce rounded-full bg-blue-400/30 delay-500"></div>
      </div>
    </section>
  );
}
