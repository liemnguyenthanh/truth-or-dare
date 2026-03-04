import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { FeedbackListPageClient } from './FeedbackListPageClient';

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
      title: 'Danh Sách Góp Ý - Thật Hay Thách Online',
      description:
        'Xem tất cả các góp ý từ cộng đồng. Tìm kiếm và lọc theo loại góp ý.',
    },
    en: {
      title: 'Feedback List - Truth or Dare Online',
      description:
        'View all feedback from the community. Search and filter by feedback type.',
    },
    es: {
      title: 'Lista de Comentarios - Verdad o Reto Online',
      description:
        'Ver todos los comentarios de la comunidad. Buscar y filtrar por tipo de comentario.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(
    locale,
    seo.title,
    seo.description,
    '/feedback/list'
  );
}

export default function FeedbackListPage({
  params,
}: {
  params: { locale: string };
}) {
  return <FeedbackListPageClient locale={params.locale} />;
}
