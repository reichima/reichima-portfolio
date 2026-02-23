"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import type { GameRankingItem } from "./game-ranking-data";

type GameDetailDialogProps = {
  game: GameRankingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function GameDetailDialog({
  game,
  open,
  onOpenChange,
}: GameDetailDialogProps) {
  if (!game) return null;

  const allImages = [game.thumbnail, ...game.images];
  const hasMultiple = allImages.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-white/20 bg-slate-900/95 text-white backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            <span className="rank-number-gold mr-2 text-3xl font-black">
              #{game.rank}
            </span>
            {game.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          {hasMultiple ? (
            <Splide
              options={{
                type: "fade",
                rewind: true,
                perPage: 1,
                pagination: true,
                arrows: true,
                speed: 500,
                easing: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              aria-label={`${game.name}のスクリーンショット`}
              className="game-splide"
            >
              {allImages.map((image, index) => (
                <SplideSlide key={index}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${game.name} スクリーンショット ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={allImages[0]}
                alt={`${game.name} スクリーンショット`}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
          )}

          <p className="mt-6 leading-relaxed text-white/90">
            {game.description}
          </p>
        </div>

        <style jsx global>{`
          .game-splide .splide__arrow {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            width: 2.5rem;
            height: 2.5rem;
            opacity: 0.7;
            transition: all 0.3s ease;
          }
          .game-splide .splide__arrow:hover {
            background: rgba(255, 255, 255, 0.25);
            opacity: 1;
          }
          .game-splide .splide__arrow svg {
            fill: white;
            width: 1rem;
            height: 1rem;
          }
          .game-splide .splide__pagination {
            bottom: -1.5rem;
          }
          .game-splide .splide__pagination__page {
            background: rgba(255, 255, 255, 0.3);
            width: 8px;
            height: 8px;
          }
          .game-splide .splide__pagination__page.is-active {
            background: rgb(168, 85, 247);
            transform: scale(1.3);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
