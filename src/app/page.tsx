'use client';

import { Game } from '@/components/Game';
import { GameProvider } from '@/context/GameContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Head from 'next/head';
import * as React from 'react';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <ThemeProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </ThemeProvider>
    </main>
  );
}
