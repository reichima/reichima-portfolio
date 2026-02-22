export type GameRankingItem = {
  id: number;
  rank: number;
  name: string;
  thumbnail: string;
  images: string[];
  description: string;
};

export async function fetchGameRankings(): Promise<GameRankingItem[]> {
  const res = await fetch("https://wakemeup.reichima.com/api/game-rankings", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch game rankings");
  }

  const json = await res.json();
  return (json.data as GameRankingItem[]).sort((a, b) => a.rank - b.rank);
}
