import GameRankingContent from "@/components/game-ranking/game-ranking-content";
import { fetchGameRankings } from "@/components/game-ranking/game-ranking-data";

export default async function GameRankingPage() {
  const games = await fetchGameRankings();

  return (
    <main className="min-h-screen w-full bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="h-16" />

        <GameRankingContent games={games} />
      </div>
    </main>
  );
}
