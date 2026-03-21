"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiCrown } from "react-icons/gi";
import GameDetailDialog from "./game-detail-dialog";
import type { GameRankingItem } from "./game-ranking-data";

const top3Styles = [
  {
    border: "border-yellow-500/50",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    bg: "bg-gradient-to-br from-yellow-500/20 to-amber-600/10",
    rankClass: "rank-number-gold",
    crownColor: "text-yellow-400",
  },
  {
    border: "border-gray-300/50",
    glow: "shadow-[0_0_25px_rgba(192,192,192,0.3)]",
    bg: "bg-gradient-to-br from-gray-300/15 to-gray-400/10",
    rankClass: "rank-number-silver",
    crownColor: "text-gray-300",
  },
  {
    border: "border-amber-700/50",
    glow: "shadow-[0_0_25px_rgba(205,127,50,0.3)]",
    bg: "bg-gradient-to-br from-amber-700/20 to-orange-800/10",
    rankClass: "rank-number-bronze",
    crownColor: "text-amber-600",
  },
];

const ITEMS_PER_PAGE = 5;

export default function GameRankingContent({
  games,
}: {
  games: GameRankingItem[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [selectedGame, setSelectedGame] = useState<GameRankingItem | null>(
    null,
  );

  const top3 = games.slice(0, 3);
  const top10Rest = games.slice(3, 10);
  const allExtra = games.slice(10);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleExtra = allExtra.slice(0, visibleCount);
  const hasMore = visibleCount < allExtra.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, allExtra.length));
  }, [allExtra.length]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
      );

      tl.fromTo(
        ".top3-card",
        { opacity: 0, y: 120, scale: 0.6, rotationY: -30 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: "back.out(1.4)",
        },
        "-=0.6",
      );

      tl.fromTo(
        ".ranking-list-item",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      <h1
        ref={titleRef}
        className="font-orbitron mb-12 text-center text-4xl font-bold tracking-wider text-white opacity-0 md:text-6xl"
      >
        Game Ranking
      </h1>

      {/* Top 3 */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {top3.map((game, index) => {
          const style = top3Styles[index];
          return (
            <button
              key={game.rank}
              onClick={() => setSelectedGame(game)}
              className={`top3-card group cursor-pointer rounded-xl border ${style.border} ${style.bg} ${style.glow} p-6 text-left backdrop-blur-md transition-all duration-300 hover:scale-105`}
            >
              <div className="mb-4 flex items-center gap-3">
                <GiCrown className={`text-3xl ${style.crownColor}`} />
                <span
                  className={`font-orbitron text-5xl font-black ${style.rankClass}`}
                >
                  {game.rank}
                </span>
              </div>

              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={game.thumbnail}
                  alt={game.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <h2 className="mb-2 text-xl font-bold text-white">{game.name}</h2>
              <p className="line-clamp-2 text-sm text-white/70">
                {game.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* 4-10位 */}
      <div className="space-y-3">
        {top10Rest.map((game) => (
          <button
            key={game.rank}
            onClick={() => setSelectedGame(game)}
            className="ranking-list-item group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <span className="font-orbitron min-w-[3rem] text-center text-3xl font-black text-white/40">
              {game.rank}
            </span>

            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={game.thumbnail}
                alt={game.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-bold text-white">
                {game.name}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* 11位以降 - 無限スクロール */}
      {visibleExtra.length > 0 && (
        <div className="mt-3 space-y-3">
          {visibleExtra.map((game) => (
            <button
              key={game.rank}
              onClick={() => setSelectedGame(game)}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <span className="font-orbitron min-w-[3rem] text-center text-3xl font-black text-white/40">
                {game.rank}
              </span>

              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={game.thumbnail}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-bold text-white">
                  {game.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <span className="text-sm text-white/30">Loading...</span>
        </div>
      )}

      <GameDetailDialog
        game={selectedGame}
        open={selectedGame !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedGame(null);
        }}
      />
    </div>
  );
}
