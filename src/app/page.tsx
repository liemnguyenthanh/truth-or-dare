'use client';

import { Game } from '@game/components/Game';
import { GameProvider } from '@game/context/GameProvider';

// Component to handle navigation visibility based on game state
function GameNavigationWrapper() {
  return (
    <>
      <Game />
    </>
  );
}

export default function HomePage() {
  return (
    <GameProvider>
      <main className='container mx-auto px-4'>
        <GameNavigationWrapper />
      </main>
    </GameProvider>
  );
}
