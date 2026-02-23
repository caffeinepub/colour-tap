import { cn } from '@/lib/utils';

interface ColorTileProps {
  color: string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function ColorTile({ color, isActive, isDisabled, onClick }: ColorTileProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'aspect-square rounded-3xl transition-all duration-150 transform',
        'shadow-lg hover:shadow-xl',
        'disabled:cursor-not-allowed',
        !isDisabled && 'hover:scale-105 active:scale-95',
        isActive && 'scale-110 shadow-2xl brightness-125'
      )}
      style={{
        backgroundColor: color,
        opacity: isDisabled && !isActive ? 0.6 : 1,
      }}
      aria-label="Color tile"
    />
  );
}
