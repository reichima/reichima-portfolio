"use client";

import Scroll from "@/components/scroll";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TITLE_CHARS = "Reichima Portfolio".split("");
const SUBTITLE_CHARS = "Creative Developer Online".split("");

function SplitChars({
  chars,
  className,
}: {
  chars: string[];
  className: string;
}) {
  return chars.map((char, i) => (
    <span key={i} className={`${className} inline-block`} style={{ opacity: 0 }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function HomeSection() {
  const homeRef = useRef<HTMLElement>(null);
  const homeTitleRef = useRef<HTMLHeadingElement>(null);
  const homeSubtitleRef = useRef<HTMLParagraphElement>(null);
  const systemTextRef = useRef<HTMLDivElement>(null);

  const [panelStates, setPanelStates] = useState<
    ("ABORT" | "CLEAR" | "FADEOUT")[]
  >(["ABORT", "ABORT", "ABORT"]);
  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [showPortfolioText, setShowPortfolioText] = useState(false);

  // タイトル文字のロケット雲アニメーション
  useGSAP(
    () => {
      if (!showPortfolioText || !homeTitleRef.current) return;

      const chars = homeTitleRef.current.querySelectorAll(".title-char");

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          scale: 0,
          y: () => gsap.utils.random(-15, 15),
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (homeTitleRef.current) {
              homeTitleRef.current.style.animation =
                "cloudFloat 6s ease-in-out infinite";
            }
          },
        },
      );
    },
    { scope: homeRef, dependencies: [showPortfolioText] },
  );

  // SYSTEM INITIALIZED & Creative Developer Online のバチバチ演出
  useGSAP(
    () => {
      if (!showPortfolioText || !systemTextRef.current) return;

      const tl = gsap.timeline({ delay: 1.2 });

      // SYSTEM INITIALIZED - 電気的なフリッカー
      tl.fromTo(
        systemTextRef.current,
        { opacity: 0, scaleX: 0.8 },
        { opacity: 1, scaleX: 1, duration: 0.1, ease: "none" },
      )
        .to(systemTextRef.current, {
          opacity: 0,
          duration: 0.05,
        })
        .to(systemTextRef.current, {
          opacity: 1,
          duration: 0.05,
        })
        .to(systemTextRef.current, {
          opacity: 0.3,
          duration: 0.08,
        })
        .to(systemTextRef.current, {
          opacity: 1,
          textShadow:
            "0 0 10px rgba(52,211,153,0.8), 0 0 20px rgba(52,211,153,0.4), 0 0 40px rgba(52,211,153,0.2)",
          duration: 0.1,
        })
        .to(systemTextRef.current, {
          opacity: 0.6,
          duration: 0.04,
        })
        .to(systemTextRef.current, {
          opacity: 1,
          duration: 0.06,
        });

      // Creative Developer Online - 1文字ずつバチバチ出現
      const subtitleChars = homeSubtitleRef.current?.querySelectorAll(
        ".subtitle-char",
      );
      if (subtitleChars) {
        tl.fromTo(
          subtitleChars,
          {
            opacity: 0,
            textShadow: "none",
          },
          {
            opacity: 1,
            textShadow:
              "0 0 8px rgba(148,163,184,0.6), 0 0 16px rgba(148,163,184,0.3)",
            duration: 0.04,
            stagger: 0.05,
            ease: "none",
            onComplete: () => {
              const flickerTl = gsap.timeline();
              subtitleChars.forEach((char, i) => {
                flickerTl
                  .to(char, { opacity: 0.3, duration: 0.03 }, i * 0.03)
                  .to(char, { opacity: 1, textShadow: "none", duration: 0.05 }, i * 0.03 + 0.03);
              });
              tl.add(flickerTl);
            },
          },
          "+=0.3",
        );
      }
    },
    { scope: homeRef, dependencies: [showPortfolioText] },
  );

  // パネル・ロケットアニメーション (非GSAP)
  useEffect(() => {
    // ハッシュ付きアクセスやスクロール位置が下の場合はアニメーションをスキップ
    const hasHash = window.location.hash && window.location.hash !== "#home";
    const isScrolledDown = window.scrollY > 100;
    if (hasHash || isScrolledDown) {
      setPanelStates(["FADEOUT", "FADEOUT", "FADEOUT"]);
      setShowPortfolioText(true);
      return;
    }

    // KVアニメーション中: ヘッダー非表示 & スクロールロック
    document.body.dataset.kvAnimating = "";

    const timer1 = setTimeout(() => {
      setPanelStates((prev) => ["CLEAR", prev[1], prev[2]]);
    }, 1000);

    const timer2 = setTimeout(() => {
      setPanelStates((prev) => [prev[0], "CLEAR", prev[2]]);
    }, 2000);

    const timer3 = setTimeout(() => {
      setPanelStates((prev) => [prev[0], prev[1], "CLEAR"]);
    }, 3000);

    const rocketTimer = setTimeout(() => {
      setShowRocket(true);
    }, 4000);

    const launchTimer = setTimeout(() => {
      setRocketLaunched(true);
      setPanelStates(["FADEOUT", "FADEOUT", "FADEOUT"]);
    }, 4500);

    const textTimer = setTimeout(() => {
      setShowPortfolioText(true);
      delete document.body.dataset.kvAnimating;
    }, 5800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(rocketTimer);
      clearTimeout(launchTimer);
      clearTimeout(textTimer);
      delete document.body.dataset.kvAnimating;
    };
  }, []);

  return (
    <section
      id="home"
      ref={homeRef}
      className="relative z-10 grid min-h-screen w-full snap-start place-items-center overflow-hidden"
    >
      {/* 背景のグリッドパターン */}
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
                    : "border-emerald-900 shadow-emerald-900/20"
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
              className="absolute inset-0 -m-4 scale-100 rounded-[30px] bg-white/5 opacity-100 blur-lg transition-all duration-3000 ease-out md:-m-6 md:rounded-[40px] md:blur-xl lg:-m-8 lg:rounded-[50px]"
            ></div>

            <div className="relative z-10 mb-8 space-y-3 md:mb-10 md:space-y-4 lg:mb-12 lg:space-y-6">
              <h1
                ref={homeTitleRef}
                className="font-orbitron text-3xl font-bold tracking-wider text-white md:text-5xl lg:text-7xl xl:text-8xl"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
                }}
              >
                <SplitChars chars={TITLE_CHARS} className="title-char" />
              </h1>

              <div
                ref={systemTextRef}
                className="mb-2 font-mono text-sm text-emerald-400 md:mb-3 md:text-base lg:text-xl"
                style={{ opacity: 0 }}
              >
                [ SYSTEM INITIALIZED ]
              </div>
            </div>
          </div>
        )}

        <p
          ref={homeSubtitleRef}
          className="font-orbitron mb-12 text-base text-slate-400 md:mb-12 md:text-lg lg:mb-16 lg:text-xl xl:text-2xl"
        >
          <SplitChars chars={SUBTITLE_CHARS} className="subtitle-char" />
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
