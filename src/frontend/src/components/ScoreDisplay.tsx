import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-[oklch(0.95_0.03_60)] to-[oklch(0.97_0.02_80)] px-6 py-3 rounded-2xl border-2 border-[oklch(0.85_0.08_60)] shadow-md">
      <Trophy className="h-6 w-6 text-[oklch(0.60_0.20_60)]" />
      <div>
        <p className="text-xs font-semibold text-[oklch(0.50_0.08_60)] uppercase tracking-wide">
          Score
        </p>
        <p className="text-3xl font-black text-[oklch(0.45_0.15_60)] tabular-nums">
          {score}
        </p>
      </div>
    </div>
  );
}
