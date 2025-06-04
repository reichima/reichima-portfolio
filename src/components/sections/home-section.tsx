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
    // パネル1: 2秒後にCLEARに変更
    const timer1 = setTimeout(() => {
      setPanelStates((prev) => ["CLEAR", prev[1], prev[2]]);
    }, 1500);

    // パネル2: 3秒後にCLEARに変更
    const timer2 = setTimeout(() => {
      setPanelStates((prev) => [prev[0], "CLEAR", prev[2]]);
    }, 2500);

    // パネル3: 4秒後にCLEARに変更
    const timer3 = setTimeout(() => {
      setPanelStates((prev) => [prev[0], prev[1], "CLEAR"]);
    }, 3500);

    // ロケット表示: 4.5秒後
    const rocketTimer = setTimeout(() => {
      setShowRocket(true);
    }, 4500);

    // ロケット発射: 5秒後 & パネルフェードアウト開始
    const launchTimer = setTimeout(() => {
      setRocketLaunched(true);
      // 全パネルを同時にフェードアウト
      setPanelStates(["FADEOUT", "FADEOUT", "FADEOUT"]);
    }, 5000);

    // Portfolioテキスト表示: 7.5秒後
    const textTimer = setTimeout(() => {
      setShowPortfolioText(true);
    }, 7500);

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
        {/* パネルアニメーション - より大きく */}
        <div className="mb-16 flex justify-center gap-10">
          {panelStates.map((state, index) => (
            <div
              key={index}
              className={`relative h-32 w-48 rounded-2xl border-4 shadow-2xl backdrop-blur-sm transition-all duration-1000 ${
                state === "ABORT"
                  ? "border-red-400 bg-red-500/20 shadow-red-500/30"
                  : state === "CLEAR"
                    ? "border-emerald-400 bg-emerald-500/20 shadow-emerald-500/30"
                    : "border-emerald-400 bg-emerald-500/20 shadow-emerald-500/30"
              } `}
              style={{
                transform:
                  state === "CLEAR"
                    ? "rotateY(360deg) scale(1.1)"
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
                className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${
                  state === "CLEAR" || state === "FADEOUT"
                    ? "opacity-100"
                    : "opacity-0"
                } bg-gradient-to-r from-emerald-400/30 to-green-400/30 blur-md`}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`font-mono text-2xl font-bold tracking-wider transition-all duration-700 ${
                    state === "ABORT"
                      ? "text-red-200 drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]"
                      : "text-emerald-200 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                  } `}
                >
                  {state === "FADEOUT" ? "CLEAR" : state}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ロケットアニメーション - 左から右へ */}
        {showRocket && (
          <div
            className={`text-9xl transition-all duration-4000 ease-out ${
              rocketLaunched ? "absolute mb-0" : "mb-16"
            }`}
            style={{
              transform: rocketLaunched
                ? "translateX(150vw) scale(1.25) rotate(12deg)"
                : "translateX(-50vw) scale(1) rotate(0deg)",
              opacity: rocketLaunched ? 0 : 1,
              filter: rocketLaunched ? "blur(3px)" : "blur(0px)",
              textShadow: "0 0 25px rgba(255,255,255,0.7)",
            }}
          >
            🚀
          </div>
        )}

        {/* Portfolio テキストアニメーション - 雲のような形でフェードイン */}
        {showPortfolioText && (
          <div className="relative">
            {/* 雲のようなバックグラウンド効果 */}
            <div
              className={`absolute inset-0 -m-8 rounded-[50px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-xl transition-all duration-3000 ease-out ${
                showPortfolioText
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            ></div>

            <div className="relative z-10 mb-12 space-y-6">
              <h1
                ref={homeTitleRef}
                className={`text-7xl font-bold tracking-wider text-white transition-all duration-3000 ease-out lg:text-8xl ${
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
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                }}
              >
                Reichima Portfolio
              </h1>

              <div
                className={`text-2xl text-slate-300 transition-all delay-700 duration-3000 ease-out ${
                  showPortfolioText
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
              >
                <div className="mb-3 font-mono text-xl text-emerald-400">
                  [ SYSTEM INITIALIZED ]
                </div>
              </div>
            </div>
          </div>
        )}

        <p
          ref={homeSubtitleRef}
          className={`font-orbitron mb-16 text-xl text-slate-400 transition-all delay-1400 duration-3000 ease-out lg:text-2xl ${
            showPortfolioText
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          Creative Developer Online
        </p>

        <div
          className={`transition-all delay-2100 duration-3000 ease-out ${
            showPortfolioText
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <Scroll />
        </div>
      </div>

      {/* 浮遊要素 - よりモダンに */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-sm delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 blur-sm delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 blur-sm delay-500"></div>
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
