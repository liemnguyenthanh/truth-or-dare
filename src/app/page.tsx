'use client';

import { Game } from '@game/components/Game';
import { GameProvider } from '@game/hooks/useGameContext';
import * as React from 'react';

export default function HomePage() {
  return (
    <main className='container mx-auto px-4'>
      <GameProvider>
        <Game />
      </GameProvider>
    </main>
  );
}
