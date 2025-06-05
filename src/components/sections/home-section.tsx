import Scroll from "@/components/scroll";
import { RefObject, useEffect, useState } from "react";

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
  const [panelStates, setPanelStates] = useState<
    ("ABORT" | "CLEAR" | "FADEOUT")[]
  >(["ABORT", "ABORT", "ABORT"]);
  const [showRocket, setShowRocket] = useState(false);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [showPortfolioText, setShowPortfolioText] = useState(false);

  useEffect(() => {
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 text-center">
        {/* パネルアニメーション - レスポンシブ対応 */}
        <div className="mb-8 flex justify-center gap-2 md:mb-16 md:gap-6 lg:gap-10">
          {panelStates.map((state, index) => (
            <div
              key={index}
              className={`relative h-16 w-24 rounded-lg border-2 shadow-lg backdrop-blur-sm transition-all duration-1000 md:h-24 md:w-36 md:rounded-xl md:border-3 md:shadow-xl lg:h-32 lg:w-48 lg:rounded-2xl lg:border-4 lg:shadow-2xl ${
                state === "ABORT"
                  ? "border-red-400 bg-red-500/20 shadow-red-500/30"
                  : state === "CLEAR"
                    ? "border-emerald-400 bg-emerald-500/20 shadow-emerald-500/30"
                    : "border-emerald-400 bg-emerald-500/20 shadow-emerald-500/30"
              } `}
              style={{
                transform:
                  state === "CLEAR"
                    ? "rotateY(360deg)"
                    : state === "FADEOUT"
                      ? "rotateY(360deg) scale(1.1) translateY(-100px)"
                      : "rotateY(0deg) scale(1)",
                opacity: state === "FADEOUT" ? 0 : 1,
                transition:
                  state === "FADEOUT"
                    ? "transform 1.5s ease-in-out, opacity 1.5s ease-in-out"
                    : "transform 1.2s ease-in-out, background-color 0.6s, border-color 0.6s, box-shadow 0.6s",
                transformStyle: "preserve-3d",
              }}
            >
              {/* パネルの光る効果 */}
              <div
                className={`absolute inset-0 rounded-lg transition-opacity duration-700 md:rounded-xl lg:rounded-2xl ${
                  state === "CLEAR" || state === "FADEOUT"
                    ? "opacity-100"
                    : "opacity-0"
                } bg-gradient-to-r from-emerald-400/30 to-green-400/30 blur-md`}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`font-mono text-xs font-bold tracking-wider transition-all duration-700 md:text-lg lg:text-2xl ${
                    state === "ABORT"
                      ? "text-red-200 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)] md:drop-shadow-[0_0_10px_rgba(248,113,113,0.9)] lg:drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]"
                      : "text-emerald-200 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)] md:drop-shadow-[0_0_10px_rgba(52,211,153,0.9)] lg:drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                  } `}
                >
                  {state === "FADEOUT" ? "CLEAR" : state}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ロケットアニメーション - レスポンシブ対応 */}
        {showRocket && (
          <div
            className={`text-4xl transition-all duration-4000 ease-out md:text-6xl lg:text-9xl ${
              rocketLaunched ? "absolute mb-0" : "mb-8 md:mb-12 lg:mb-16"
            }`}
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
            🚀
          </div>
        )}

        {/* Portfolio テキストアニメーション - レスポンシブ対応 */}
        {showPortfolioText && (
          <div className="relative">
            {/* 雲のようなバックグラウンド効果 */}
            <div
              className={`absolute inset-0 -m-4 rounded-[30px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-lg transition-all duration-3000 ease-out md:-m-6 md:rounded-[40px] md:blur-xl lg:-m-8 lg:rounded-[50px] ${
                showPortfolioText
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            ></div>

            <div className="relative z-10 mb-8 space-y-3 md:mb-10 md:space-y-4 lg:mb-12 lg:space-y-6">
              <h1
                ref={homeTitleRef}
                className={`text-3xl font-bold tracking-wider text-white transition-all duration-3000 ease-out md:text-5xl lg:text-7xl xl:text-8xl ${
                  showPortfolioText
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-12 scale-95 opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(45deg, #ffffff, #a855f7, #ec4899, #3b82f6, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "400% 400%",
                  animation: showPortfolioText
                    ? "gradientShift 4s ease-in-out infinite, cloudFloat 6s ease-in-out infinite"
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
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-sm md:h-3 md:w-3"></div>
        <div className="absolute top-3/4 right-1/4 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-sm delay-1000 md:h-4 md:w-4"></div>
        <div className="absolute top-1/3 right-1/3 h-1 w-1 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 blur-sm delay-2000 md:h-2 md:w-2"></div>
        <div className="absolute bottom-1/4 left-1/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 blur-sm delay-500 md:h-3 md:w-3"></div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

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
