import { GameBoard } from './components/GameBoard';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[oklch(0.95_0.02_280)] via-[oklch(0.97_0.015_320)] to-[oklch(0.95_0.02_200)]">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-black text-center bg-gradient-to-r from-[oklch(0.55_0.25_330)] via-[oklch(0.60_0.22_280)] to-[oklch(0.50_0.24_250)] bg-clip-text text-transparent">
            Colour Tap
          </h1>
          <p className="text-center text-[oklch(0.45_0.08_280)] mt-2 font-medium">
            Watch, remember, and tap the sequence!
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <GameBoard />
      </main>

      <footer className="py-6 px-4 border-t border-[oklch(0.85_0.02_280)]">
        <div className="container mx-auto text-center text-sm text-[oklch(0.50_0.05_280)]">
          <p>
            © {new Date().getFullYear()} Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'colour-tap'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-[oklch(0.55_0.25_330)] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;
