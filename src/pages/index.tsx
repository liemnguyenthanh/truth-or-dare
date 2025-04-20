import React from 'react';
import Head from 'next/head';
import { GameProvider } from '../context/GameContext';
import { Game } from '../components/Game';
import { ThemeToggle } from '../components/ThemeToggle';

export default function Home() {
  return (
    <>
      <Head>
        <title>Truth or Dare</title>
        <meta name="description" content="A fun truth or dare game with 3D elements" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <ThemeToggle />
        <GameProvider>
          <Game />
        </GameProvider>
      </main>
    </>
  );
}
