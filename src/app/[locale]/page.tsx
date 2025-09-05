'use client';

import { GameModeSelectionPage } from '@/features/game/pages/GameModeSelectionPage';

export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <main className='container mx-auto px-4'>
      <GameModeSelectionPage />
    </main>
  );
}
