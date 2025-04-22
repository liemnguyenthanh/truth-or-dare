'use client';

import Head from 'next/head';
import * as React from 'react';

import { Game } from '@/components/Game';

import { GameProvider } from '@/context/GameContext';
import { ThemeProvider } from '@/context/ThemeContext';

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
