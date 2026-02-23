import { useState } from 'react';
import { useSubmitScore } from '../hooks/useLeaderboard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  onClose: () => void;
}

export function GameOverModal({ isOpen, score, onClose }: GameOverModalProps) {
  const [name, setName] = useState('');
  const submitScore = useSubmitScore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      await submitScore.mutateAsync({ name: name.trim(), score });
      toast.success('Score submitted successfully!');
      setName('');
      onClose();
    } catch (error) {
      toast.error('Failed to submit score');
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-2 border-[oklch(0.90_0.02_280)]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-center bg-gradient-to-r from-[oklch(0.55_0.25_330)] to-[oklch(0.50_0.24_250)] bg-clip-text text-transparent">
            Game Over!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-[oklch(0.65_0.20_60)]" />
              <span className="text-4xl font-black text-[oklch(0.45_0.15_60)]">
                {score}
              </span>
            </div>
            <p className="text-[oklch(0.50_0.05_280)]">
              Enter your name to save your score to the leaderboard
            </p>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-[oklch(0.40_0.08_280)]">
                Your Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-xl border-2"
                maxLength={30}
                disabled={submitScore.isPending}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={submitScore.isPending}
              className="rounded-xl font-semibold"
            >
              Skip
            </Button>
            <Button
              type="submit"
              disabled={submitScore.isPending}
              className="bg-gradient-to-r from-[oklch(0.60_0.25_330)] to-[oklch(0.55_0.25_280)] hover:from-[oklch(0.55_0.25_330)] hover:to-[oklch(0.50_0.25_280)] text-white font-bold rounded-xl"
            >
              {submitScore.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Score'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
