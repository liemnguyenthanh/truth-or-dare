import { generatePageMetadata } from '@/lib/metadata';

import { CouplesPageClient } from './CouplesPageClient';

export async function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as 'vi' | 'en';
  const seoTranslations = {
    vi: {
      title: 'Chế Độ Cặp Đôi - Thật Hay Thách Online',
      description:
        'Chế độ đặc biệt dành cho các cặp đôi. Câu hỏi và thử thách lãng mạn.',
    },
    en: {
      title: 'Couples Mode - Truth or Dare Online',
      description:
        'Special mode for couples. Romantic questions and challenges.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/couples');
}

export default function CouplesPage({
  params,
}: {
  params: { locale: string };
}) {
  return <CouplesPageClient locale={params.locale} />;
}
