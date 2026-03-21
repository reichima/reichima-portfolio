"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { Gamepad2 } from "lucide-react";
import { useRef } from "react";
import {
  GoPackage,
  GoPencil,
  GoPlus,
  GoRocket,
  GoTools,
  GoZap,
} from "react-icons/go";

type ChangeType =
  | "feature"
  | "improvement"
  | "fix"
  | "style"
  | "dependency"
  | "performance"
  | "menherun";

interface ChangelogEntry {
  date: string;
  title: string;
  type: ChangeType;
}

const typeConfig: Record<
  ChangeType,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  feature: {
    icon: GoPlus,
    color: "text-emerald-300",
    bg: "bg-emerald-500/20",
    label: "新機能",
  },
  improvement: {
    icon: GoZap,
    color: "text-cyan-300",
    bg: "bg-cyan-500/20",
    label: "改善",
  },
  fix: {
    icon: GoTools,
    color: "text-amber-300",
    bg: "bg-amber-500/20",
    label: "修正",
  },
  style: {
    icon: GoPencil,
    color: "text-pink-300",
    bg: "bg-pink-500/20",
    label: "デザイン",
  },
  dependency: {
    icon: GoPackage,
    color: "text-purple-300",
    bg: "bg-purple-500/20",
    label: "依存関係",
  },
  performance: {
    icon: GoRocket,
    color: "text-blue-300",
    bg: "bg-blue-500/20",
    label: "パフォーマンス",
  },
  menherun: {
    icon: Gamepad2,
    color: "text-pink-300",
    bg: "bg-pink-500/20",
    label: "Menherun",
  },
};

const changelog: ChangelogEntry[] = [
  {
    date: "2026-03-21",
    title: "新アイテム「Phone」を追加",
    type: "menherun",
  },
  {
    date: "2026-03-14",
    title: "KVアニメーション中のヘッダー非表示・スクロールロックを追加",
    type: "improvement",
  },
  {
    date: "2026-03-08",
    title: "ランゲーム「Menherun」を追加",
    type: "menherun",
  },
  {
    date: "2026-03-04",
    title: "タブ操作時のフォーカス順序・スタイルを調整",
    type: "improvement",
  },
  {
    date: "2026-02-22",
    title: "ゲームランキングページを実装",
    type: "feature",
  },
  {
    date: "2026-02-18",
    title: "変更ログを実装",
    type: "feature",
  },
];

function groupByMonth(entries: ChangelogEntry[]) {
  const groups: Record<string, ChangelogEntry[]> = {};
  for (const entry of entries) {
    const month = entry.date.slice(0, 7);
    if (!groups[month]) groups[month] = [];
    groups[month].push(entry);
  }
  return Object.entries(groups);
}

function formatMonth(ym: string) {
  const [year, month] = ym.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[Number(month) - 1]} ${year}`;
}

export default function ChangelogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header fade in
      gsap.fromTo(
        ".changelog-header-item",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
      );

      // Single continuous line grows with scroll
      gsap.fromTo(
        ".changelog-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 0.3,
          },
        },
      );

      // Each dot: pop in as scroll reaches it
      gsap.utils.toArray<HTMLElement>(".changelog-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Each card: fade in linked to scroll
      gsap.utils.toArray<HTMLElement>(".changelog-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 65%",
              scrub: 0.3,
            },
          },
        );
      });

      // Month headings
      gsap.utils
        .toArray<HTMLElement>(".changelog-heading")
        .forEach((heading) => {
          gsap.fromTo(
            heading,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: heading,
                start: "top 88%",
                end: "top 75%",
                scrub: 0.3,
              },
            },
          );
        });
    },
    { scope: containerRef },
  );

  const grouped = groupByMonth(changelog);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 md:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <div ref={headerRef}>
          <div className="changelog-header-item h-16" />
          <h1 className="changelog-header-item font-orbitron mb-2 text-4xl font-bold tracking-wider text-white opacity-0 md:text-5xl">
            Changelog
          </h1>
          <p className="changelog-header-item mb-12 text-white/60 opacity-0">
            ポートフォリオサイトの更新履歴
          </p>
        </div>

        <div ref={timelineRef} className="relative ml-4 pl-6">
          {/* Single continuous line */}
          <div className="changelog-line absolute top-0 left-0 h-full w-px origin-top scale-y-0 bg-linear-to-b from-white/30 via-white/15 to-white/5" />

          {grouped.map(([month, entries]) => (
            <div key={month} className="mb-10">
              <h2 className="font-orbitron changelog-heading mb-6 text-lg font-semibold text-white/90 opacity-0">
                {formatMonth(month)}
              </h2>

              {entries.map((entry, i) => {
                const config = typeConfig[entry.type];
                const Icon = config.icon;

                return (
                  <div
                    key={`${entry.date}-${i}`}
                    className="relative mb-6 last:mb-0"
                  >
                    {/* Dot */}
                    <div className="changelog-dot absolute top-1/2 -left-[34px] z-10 h-5 w-5 -translate-y-1/2 scale-0 rounded-full border-2 border-white/30 bg-slate-900 opacity-0" />

                    {/* Card */}
                    <div className="changelog-card rounded-lg border border-white/10 bg-white/5 p-4 opacity-0 transition-colors hover:bg-white/[0.07]">
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
                        >
                          <Icon className="h-3 w-3" />
                          {config.label}
                        </span>
                        <time className="text-xs text-white/40">
                          {entry.date}
                        </time>
                      </div>
                      <h3 className="font-semibold text-white">
                        {entry.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-32" />
      </div>
    </main>
  );
}
