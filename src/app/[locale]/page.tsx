import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { HomePageClient } from './HomePageClient';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as 'vi' | 'en';
  const seoTranslations = {
    vi: {
      title: 'Thật Hay Thách Online - Trò Chơi Vui Nhộn Cùng Bạn Bè',
      description:
        'Chơi trò chơi Thật Hay Thách online miễn phí! Hơn 500+ câu hỏi thú vị và thử thách táo bạo.',
    },
    en: {
      title: 'Truth or Dare Online - Fun Party Game with Friends',
      description:
        'Play Truth or Dare online for free! Over 500+ fun questions and daring challenges.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/');
}

export default function HomePage({ params }: { params: { locale: string } }) {
  return <HomePageClient params={params} />;
}
