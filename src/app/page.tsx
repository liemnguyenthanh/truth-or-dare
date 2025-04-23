'use client';

import Head from 'next/head';
import * as React from 'react';

import { Game } from '@game/components/Game';
import { GameProvider } from '@game/hooks/useGameContext';

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
