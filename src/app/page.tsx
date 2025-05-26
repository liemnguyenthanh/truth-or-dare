'use client';

import { Game } from '@game/components/Game';
import { GameProvider } from '@game/hooks/useGameContext';
import Head from 'next/head';
import * as React from 'react';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <GameProvider>
        <Game />
      </GameProvider>
    </main>
  );
}
