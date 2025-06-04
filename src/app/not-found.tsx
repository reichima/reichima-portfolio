"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [showErrorText, setShowErrorText] = useState(false);

  useEffect(() => {
    // エラーテキスト表示: 0.5秒後
    const textTimer = setTimeout(() => {
      setShowErrorText(true);
    }, 500);

    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 背景のグリッドパターン */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center text-center">
        <div>
          {/* エラーテキストアニメーション */}
          <div className="relative">
            {/* 雲のようなバックグラウンド効果 */}
            <div
              className={`absolute inset-0 -m-8 rounded-[50px] bg-gradient-to-r from-red-500/5 via-orange-500/10 to-red-500/5 blur-xl transition-all duration-3000 ease-out ${
                showErrorText ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            ></div>

            <div className="relative z-10 mb-12 space-y-6">
              <h1
                className={`text-8xl font-bold tracking-wider text-white transition-all duration-3000 ease-out lg:text-9xl ${
                  showErrorText
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-12 scale-95 opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(45deg, #ef4444, #f97316, #eab308, #f59e0b, #dc2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "400% 400%",
                  animation: showErrorText
                    ? "gradientShift 4s ease-in-out infinite, cloudFloat 6s ease-in-out infinite"
                    : "none",
                  filter: "drop-shadow(0 0 20px rgba(239,68,68,0.3))",
                }}
              >
                404
              </h1>

              <div
                className={`text-2xl text-slate-300 transition-all delay-300 duration-3000 ease-out ${
                  showErrorText
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
              >
                <div className="mb-3 font-mono text-xl text-red-400">
                  [ PAGE NOT FOUND ]
                </div>
              </div>
            </div>
          </div>

          <p
            className={`mb-16 text-xl text-slate-400 transition-all delay-600 duration-3000 ease-out lg:text-2xl ${
              showErrorText
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            お探しのページは存在しません。
            <br />
          </p>

          <div
            className={`transition-all delay-900 duration-3000 ease-out ${
              showErrorText
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 rounded-2xl border-2 border-amber-400/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-8 py-4 text-lg font-medium text-amber-200 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-amber-300/50 hover:from-amber-400/30 hover:to-orange-400/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              <span className="relative z-10">🏠 Go Home!!</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* 浮遊要素 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-red-400 to-orange-400 blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 blur-sm delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-orange-400 to-red-400 blur-sm delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 blur-sm delay-500"></div>
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
            filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.3));
          }
          50% {
            transform: translateY(-10px) scale(1.02);
            filter: drop-shadow(0 5px 25px rgba(239, 68, 68, 0.4));
          }
        }
      `}</style>
    </div>
  );
}
