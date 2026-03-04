import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { QuickPageClient } from './QuickPageClient';

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
      title: 'Chế Độ Nhanh - Thật Hay Thách Online',
      description:
        'Chơi ngay không cần nhập tên. Chọn category và bắt đầu! Chế độ nhanh với hơn 500+ câu hỏi thú vị.',
    },
    en: {
      title: 'Quick Mode - Truth or Dare Online',
      description:
        'Play immediately without entering names. Choose a category and start! Quick mode with over 500+ fun questions.',
    },
    es: {
      title: 'Modo Rápido - Verdad o Reto Online',
      description:
        '¡Juega inmediatamente sin ingresar nombres. Elige una categoría y comienza! Modo rápido con más de 500+ preguntas divertidas.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/quick');
}

export default function QuickPage({ params }: { params: { locale: string } }) {
  return <QuickPageClient locale={params.locale} />;
}
