import { useState, useEffect } from 'react';
import { ColorTile } from './ColorTile';
import { ScoreDisplay } from './ScoreDisplay';
import { Leaderboard } from './Leaderboard';
import { GameOverModal } from './GameOverModal';
import { useGameLogic } from '../hooks/useGameLogic';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

const GAME_COLORS = [
  { id: 0, color: 'oklch(0.65 0.25 330)', name: 'pink' },
  { id: 1, color: 'oklch(0.70 0.22 120)', name: 'green' },
  { id: 2, color: 'oklch(0.65 0.24 60)', name: 'yellow' },
  { id: 3, color: 'oklch(0.60 0.25 260)', name: 'blue' },
];

export function GameBoard() {
  const {
    gameState,
    score,
    isGameOver,
    isShowingSequence,
    currentSequence,
    playerSequence,
    startGame,
    resetGame,
    handleTileClick,
    flashingTile,
  } = useGameLogic(GAME_COLORS.length);

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-[oklch(0.90_0.02_280)]">
        {/* Score and Controls */}
        <div className="flex items-center justify-between mb-8">
          <ScoreDisplay score={score} />
          
          <div className="flex gap-3">
            {gameState === 'idle' && (
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-[oklch(0.60_0.25_330)] to-[oklch(0.55_0.25_280)] hover:from-[oklch(0.55_0.25_330)] hover:to-[oklch(0.50_0.25_280)] text-white font-bold rounded-2xl shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Game
              </Button>
            )}
            
            {gameState !== 'idle' && (
              <Button
                onClick={resetGame}
                variant="outline"
                size="lg"
                className="rounded-2xl font-semibold border-2 hover:bg-[oklch(0.95_0.02_280)]"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Game Status */}
        {gameState !== 'idle' && (
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-[oklch(0.45_0.08_280)]">
              {isShowingSequence && 'Watch the sequence...'}
              {gameState === 'playing' && !isShowingSequence && `Tap ${currentSequence.length} tile${currentSequence.length > 1 ? 's' : ''}!`}
            </p>
          </div>
        )}

        {/* Color Tiles Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {GAME_COLORS.map((colorData) => (
            <ColorTile
              key={colorData.id}
              color={colorData.color}
              isActive={flashingTile === colorData.id}
              isDisabled={gameState === 'idle' || isShowingSequence}
              onClick={() => handleTileClick(colorData.id)}
            />
          ))}
        </div>

        {/* Leaderboard Toggle */}
        <div className="text-center">
          <Button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            variant="ghost"
            className="text-[oklch(0.50_0.15_280)] hover:text-[oklch(0.45_0.20_280)] font-semibold"
          >
            {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
          </Button>
        </div>

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="mt-6">
            <Leaderboard />
          </div>
        )}
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={isGameOver}
        score={score}
        onClose={resetGame}
      />
    </div>
  );
}
