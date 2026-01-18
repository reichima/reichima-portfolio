"use client";

import Scroll from "@/components/scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
  const homeRef = useRef<HTMLElement>(null);
  const homeTitleRef = useRef<HTMLHeadingElement>(null);
  const homeSubtitleRef = useRef<HTMLParagraphElement>(null);

  const [panelStates, setPanelStates] = useState<
    ("ABORT" | "CLEAR" | "FADEOUT")[]
  >(["ABORT", "ABORT", "ABORT"]);
  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [showPortfolioText, setShowPortfolioText] = useState(false);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    if (homeRef.current && homeTitleRef.current && homeSubtitleRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        homeTitleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        homeSubtitleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }

    // パネル1: 1秒後にCLEARに変更
    const timer1 = setTimeout(() => {
      setPanelStates((prev) => ["CLEAR", prev[1], prev[2]]);
    }, 1000);

    // パネル2: 2秒後にCLEARに変更
    const timer2 = setTimeout(() => {
      setPanelStates((prev) => [prev[0], "CLEAR", prev[2]]);
    }, 2000);

    // パネル3: 3秒後にCLEARに変更
    const timer3 = setTimeout(() => {
      setPanelStates((prev) => [prev[0], prev[1], "CLEAR"]);
    }, 3000);

    // ロケット表示: 4秒後
    const rocketTimer = setTimeout(() => {
      setShowRocket(true);
    }, 4000);

    // ロケット発射: 5秒後 & パネルフェードアウト開始
    const launchTimer = setTimeout(() => {
      setRocketLaunched(true);
      // 全パネルを同時にフェードアウト
      setPanelStates(["FADEOUT", "FADEOUT", "FADEOUT"]);
    }, 5000);

    // Portfolioテキスト表示: 7秒後
    const textTimer = setTimeout(() => {
      setShowPortfolioText(true);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(rocketTimer);
      clearTimeout(launchTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <section
      id="home"
      ref={homeRef}
      className="relative z-10 grid min-h-screen w-full snap-start place-items-center overflow-hidden"
    >
      {/* 背景のグリッドパターン */}
      {/* 背景のグリッドパターン - 削除または単色に変更 */}
      <div className="absolute inset-0 bg-[size:24px_24px] opacity-10"></div>

      <div className="relative z-10 text-center">
        {/* パネルアニメーション - レスポンシブ対応 */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4 md:mb-16 md:flex-row md:gap-6 lg:gap-10">
          {panelStates.map((state, index) => (
            <div
              key={index}
              className={`relative duration-1000 ${
                state === "FADEOUT" ? "pointer-events-none" : ""
              }`}
              style={
                {
                  width: "var(--panel-width)",
                  height: "var(--panel-height)",
                  "--panel-width": "160px",
                  "--panel-height": "120px",
                  transform:
                    state === "FADEOUT"
                      ? "scale(1.1) translateY(-100px)"
                      : "scale(1)",
                  opacity: state === "FADEOUT" ? 0 : 1,
                  transition:
                    state === "FADEOUT"
                      ? "transform 1.5s ease-in-out, opacity 1.5s ease-in-out"
                      : "transform 0.3s ease-out",
                } as React.CSSProperties
              }
            >
              {/* Responsive Size Injection via inline styles or media queries in parent. 
                  We used vars above but need detailed media queries to override variables is hard in inline style. 
                  Let's just use Tailwind classes for width/height. 
              */}
              <div
                className={`led-panel-frame flex h-full w-full flex-col justify-between p-2 transition-all duration-500 md:p-3 ${
                  state === "ABORT"
                    ? "border-red-900 shadow-red-900/20"
                    : "border-emerald-900 shadow-emerald-500/30 shadow-emerald-900/20"
                }`}
                style={{
                  boxShadow:
                    state === "CLEAR"
                      ? "0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(16, 185, 129, 0.1)"
                      : state === "ABORT"
                        ? "0 0 10px rgba(239, 68, 68, 0.3)"
                        : "none",
                }}
              >
                {/* Screws */}
                <div className="absolute top-1 left-1 md:top-2 md:left-2">
                  <div className="screw-head"></div>
                </div>
                <div className="absolute top-1 right-1 md:top-2 md:right-2">
                  <div className="screw-head"></div>
                </div>
                <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2">
                  <div className="screw-head"></div>
                </div>
                <div className="absolute right-1 bottom-1 md:right-2 md:bottom-2">
                  <div className="screw-head"></div>
                </div>

                {/* Warning Lights */}
                <div
                  className={`absolute -top-3 left-[20%] h-2 w-4 rounded-t-full border border-b-0 border-black ${state === "ABORT" ? "warning-light-red bg-red-600" : "bg-red-900"}`}
                ></div>
                <div
                  className={`absolute -top-3 right-[20%] h-2 w-4 rounded-t-full border border-b-0 border-black ${state === "ABORT" ? "warning-light-red bg-red-600" : "bg-red-900"}`}
                ></div>

                {/* Main Screen Area */}
                <div
                  className={`led-screen-bg relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-sm border-2 border-black/50 p-1 transition-all duration-500 ${
                    state === "ABORT" ? "bg-red-950/30" : "bg-emerald-950/30"
                  }`}
                >
                  <div className="led-scanlines opacity-50"></div>

                  {/* Content Overlay */}
                  <div className="relative z-20 flex w-full flex-col items-center justify-between gap-1 text-center">
                    {/* Main Text */}
                    <h2
                      className={`led-pixel-font text-3xl font-bold tracking-tighter md:text-5xl ${
                        state === "ABORT"
                          ? "led-glow-text-red"
                          : "led-glow-text-green"
                      }`}
                    >
                      {state === "ABORT" ? "ABORT" : "CLEAR"}
                    </h2>

                    {/* Sub Text / Status Box */}
                    <div className="flex w-full items-center justify-center gap-2">
                      {state === "ABORT" ? (
                        <>
                          <div className="flex h-6 w-6 items-center justify-center border border-red-500/50 bg-red-500/10 md:h-8 md:w-8">
                            <span className="text-lg font-bold text-red-500 md:text-2xl">
                              ×
                            </span>
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="led-pixel-font text-[8px] leading-none text-red-400 md:text-[10px]">
                              CRITICAL
                            </span>
                            <span className="led-pixel-font text-[8px] leading-none text-red-700 md:text-[10px]">
                              FAILURE
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex h-6 w-6 items-center justify-center border border-emerald-500/50 bg-emerald-500/10 md:h-8 md:w-8">
                            <span className="text-lg font-bold text-emerald-500 md:text-2xl">
                              ✓
                            </span>
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="led-pixel-font text-[8px] leading-none text-emerald-400 md:text-[10px]">
                              SYSTEM
                            </span>
                            <span className="led-pixel-font text-[8px] leading-none text-emerald-700 md:text-[10px]">
                              OPTIMAL
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Footer Strip */}
                    <div
                      className={`mt-1 h-1 w-full ${state === "ABORT" ? "hazard-striped-red" : "bg-emerald-900/50"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ロケットアニメーション - レスポンシブ対応 */}
        {showRocket && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-4xl transition-all duration-4000 ease-out md:text-6xl lg:text-9xl"
            style={{
              transform: rocketLaunched
                ? "translateX(150vw) scale(1.25) rotate(12deg)"
                : "translateX(-50vw) scale(1) rotate(0deg)",
              opacity: rocketLaunched ? 0 : 1,
              filter: rocketLaunched ? "blur(3px)" : "blur(0px)",
              textShadow:
                "0 0 15px rgba(255,255,255,0.7), 0 0 25px rgba(255,255,255,0.7)",
            }}
          >
            <Image
              src={"/images/rockets.png"}
              alt="Rocket"
              width={100}
              height={100}
              className="rotate-45"
              loading="lazy"
            />
          </div>
        )}

        {/* Portfolio テキストアニメーション - レスポンシブ対応 */}
        {showPortfolioText && (
          <div className="relative">
            {/* 雲のようなバックグラウンド効果 */}
            <div
              className={`absolute inset-0 -m-4 rounded-[30px] bg-white/5 blur-lg transition-all duration-3000 ease-out md:-m-6 md:rounded-[40px] md:blur-xl lg:-m-8 lg:rounded-[50px] ${
                showPortfolioText
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            ></div>

            <div className="relative z-10 mb-8 space-y-3 md:mb-10 md:space-y-4 lg:mb-12 lg:space-y-6">
              <h1
                ref={homeTitleRef}
                className={`font-orbitron text-3xl font-bold tracking-wider text-white transition-all duration-3000 ease-out md:text-5xl lg:text-7xl xl:text-8xl ${
                  showPortfolioText
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-12 scale-95 opacity-0"
                }`}
                style={{
                  animation: showPortfolioText
                    ? "cloudFloat 6s ease-in-out infinite"
                    : "none",
                  filter:
                    "drop-shadow(0 0 15px rgba(255,255,255,0.3)) md:drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                }}
              >
                Reichima Portfolio
              </h1>

              <div
                className={`text-lg text-slate-300 transition-all delay-700 duration-3000 ease-out md:text-xl lg:text-2xl ${
                  showPortfolioText
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
              >
                <div className="mb-2 font-mono text-sm text-emerald-400 md:mb-3 md:text-base lg:text-xl">
                  [ SYSTEM INITIALIZED ]
                </div>
              </div>
            </div>
          </div>
        )}

        <p
          ref={homeSubtitleRef}
          className={`font-orbitron mb-12 text-base text-slate-400 transition-all delay-1400 duration-3000 ease-out md:mb-12 md:text-lg lg:mb-16 lg:text-xl xl:text-2xl ${
            showPortfolioText
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          Creative Developer Online
        </p>

        <div
          className={`mt-16 transition-all delay-2100 duration-3000 ease-out md:mt-0 ${
            showPortfolioText
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <Scroll />
        </div>
      </div>

      {/* レスポンシブな装飾要素 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full bg-portfolio-primary blur-sm md:h-3 md:w-3"></div>
        <div className="absolute top-3/4 right-1/4 h-2 w-2 animate-pulse rounded-full bg-blue-400 blur-sm delay-1000 md:h-4 md:w-4"></div>
        <div className="absolute top-1/3 right-1/3 h-1 w-1 animate-pulse rounded-full bg-emerald-400 blur-sm delay-2000 md:h-2 md:w-2"></div>
        <div className="absolute bottom-1/4 left-1/3 h-2 w-2 animate-pulse rounded-full bg-yellow-400 blur-sm delay-500 md:h-3 md:w-3"></div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes cloudFloat {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
          }
          50% {
            transform: translateY(-10px) scale(1.02);
            filter: drop-shadow(0 5px 25px rgba(255, 255, 255, 0.4));
          }
        }
      `}</style>
    </section>
  );
}
