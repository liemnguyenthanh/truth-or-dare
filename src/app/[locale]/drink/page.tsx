import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { DrinkPageClient } from './DrinkPageClient';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as 'vi' | 'en' | 'es';
  const seoTranslations = {
    vi: {
      title: 'Drink Game - Thật Hay Thách Online',
      description:
        'Rút bài và thực hiện thử thách. Ai không làm được thì uống! Chơi Drink Game với hơn 300+ câu hỏi thú vị.',
    },
    en: {
      title: 'Drink Game - Truth or Dare Online',
      description:
        'Draw a card and complete the challenge. If you cannot do it, drink! Play Drink Game with over 300+ fun questions.',
    },
    es: {
      title: 'Juego de Beber - Verdad o Reto Online',
      description:
        '¡Saca una carta y completa el reto! Si no puedes hacerlo, ¡bebe! Juega al Juego de Beber con más de 300+ preguntas divertidas.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/drink');
}

export default function DrinkPage({ params }: { params: { locale: string } }) {
  return <DrinkPageClient params={params} />;
}
