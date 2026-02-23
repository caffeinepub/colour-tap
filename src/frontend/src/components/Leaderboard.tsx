import { useLeaderboard } from '../hooks/useLeaderboard';
import { Medal, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Leaderboard() {
  const { data: leaderboard, isLoading, error } = useLeaderboard();

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-2">
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.55_0.20_280)]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl border-2">
        <CardContent className="py-8">
          <p className="text-center text-[oklch(0.50_0.08_0)]">
            Failed to load leaderboard
          </p>
        </CardContent>
      </Card>
    );
  }

  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-[oklch(0.65_0.20_60)]'; // Gold
    if (index === 1) return 'text-[oklch(0.60_0.08_280)]'; // Silver
    if (index === 2) return 'text-[oklch(0.50_0.15_30)]'; // Bronze
    return 'text-[oklch(0.60_0.08_280)]';
  };

  return (
    <Card className="rounded-2xl border-2 border-[oklch(0.90_0.02_280)]">
      <CardHeader>
        <CardTitle className="text-2xl font-black text-center text-[oklch(0.45_0.12_280)]">
          🏆 Top Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!leaderboard || leaderboard.length === 0 ? (
          <p className="text-center text-[oklch(0.55_0.05_280)] py-4">
            No scores yet. Be the first to play!
          </p>
        ) : (
          <div className="space-y-3">
            {leaderboard.slice(0, 10).map(([name, score], index) => (
              <div
                key={`${name}-${score}-${index}`}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-[oklch(0.97_0.01_280)] to-[oklch(0.98_0.01_320)] rounded-xl border border-[oklch(0.92_0.02_280)] transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Medal className={`h-5 w-5 ${getMedalColor(index)}`} />
                  <span className="font-bold text-[oklch(0.40_0.08_280)]">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-[oklch(0.35_0.08_280)]">
                    {name}
                  </span>
                </div>
                <span className="text-xl font-black text-[oklch(0.50_0.15_280)] tabular-nums">
                  {Number(score)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
