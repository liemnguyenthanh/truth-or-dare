import { generateMetadata as generateMetadataFn } from '@/lib/metadata';

import { GameModeSelectionPage } from '@/features/game/pages/GameModeSelectionPage';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return generateMetadataFn(params.locale as 'vi' | 'en' | 'es');
}

export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <main className='container mx-auto px-4'>
      <GameModeSelectionPage />
    </main>
  );
}
