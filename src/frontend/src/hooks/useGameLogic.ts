import { useState, useEffect, useCallback, useRef } from 'react';

type GameState = 'idle' | 'showing' | 'playing';

export function useGameLogic(numberOfColors: number) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [flashingTile, setFlashingTile] = useState<number | null>(null);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateNextSequence = useCallback(() => {
    const newColor = Math.floor(Math.random() * numberOfColors);
    return [...currentSequence, newColor];
  }, [currentSequence, numberOfColors]);

  const playSequence = useCallback(async (sequence: number[]) => {
    setIsShowingSequence(true);
    setGameState('showing');
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(resolve, 200);
      });
      
      setFlashingTile(sequence[i]);
      
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(resolve, 600);
      });
      
      setFlashingTile(null);
    }
    
    setIsShowingSequence(false);
    setGameState('playing');
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setPlayerSequence([]);
    setIsGameOver(false);
    const initialSequence = [Math.floor(Math.random() * numberOfColors)];
    setCurrentSequence(initialSequence);
    playSequence(initialSequence);
  }, [numberOfColors, playSequence]);

  const resetGame = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGameState('idle');
    setCurrentSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setIsGameOver(false);
    setFlashingTile(null);
    setIsShowingSequence(false);
  }, []);

  const handleTileClick = useCallback((tileId: number) => {
    if (gameState !== 'playing' || isShowingSequence) return;

    const newPlayerSequence = [...playerSequence, tileId];
    setPlayerSequence(newPlayerSequence);

    // Flash the clicked tile
    setFlashingTile(tileId);
    setTimeout(() => setFlashingTile(null), 300);

    // Check if the click is correct
    const currentIndex = newPlayerSequence.length - 1;
    if (newPlayerSequence[currentIndex] !== currentSequence[currentIndex]) {
      // Wrong tile clicked - game over
      setIsGameOver(true);
      setGameState('idle');
      return;
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === currentSequence.length) {
      // Correct sequence completed!
      const newScore = score + 1;
      setScore(newScore);
      setPlayerSequence([]);
      
      // Generate and play next sequence
      setTimeout(() => {
        const nextSequence = generateNextSequence();
        setCurrentSequence(nextSequence);
        playSequence(nextSequence);
      }, 1000);
    }
  }, [gameState, isShowingSequence, playerSequence, currentSequence, score, generateNextSequence, playSequence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    gameState,
    score,
    isGameOver,
    isShowingSequence,
    currentSequence,
    playerSequence,
    flashingTile,
    startGame,
    resetGame,
    handleTileClick,
  };
}
