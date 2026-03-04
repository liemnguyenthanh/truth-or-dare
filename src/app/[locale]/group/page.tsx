import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { GroupPageClient } from './GroupPageClient';

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
      title: 'Chế Độ Nhóm - Thật Hay Thách Online',
      description:
        'Thêm tên người chơi và chơi theo lượt. Chế độ nhóm hoàn hảo cho tiệc tùng với bạn bè.',
    },
    en: {
      title: 'Group Mode - Truth or Dare Online',
      description:
        'Add player names and play in turns. Perfect group mode for parties with friends.',
    },
    es: {
      title: 'Modo Grupal - Verdad o Reto Online',
      description:
        '¡Añade nombres de jugadores y juega por turnos! Modo grupal perfecto para fiestas con amigos.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/group');
}

export default function GroupPage({ params }: { params: { locale: string } }) {
  return <GroupPageClient locale={params.locale} />;
}
