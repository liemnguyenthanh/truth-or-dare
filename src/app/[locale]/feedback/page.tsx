import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { FeedbackPageClient } from './FeedbackPageClient';

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
      title: 'Góp Ý & Thảo Luận - Thật Hay Thách Online',
      description:
        'Chia sẻ ý kiến của bạn hoặc tham gia thảo luận với cộng đồng. Góp ý giúp chúng tôi cải thiện trò chơi.',
    },
    en: {
      title: 'Feedback & Discussion - Truth or Dare Online',
      description:
        'Share your thoughts or join the community discussion. Your feedback helps us improve the game.',
    },
    es: {
      title: 'Comentarios y Discusión - Verdad o Reto Online',
      description:
        'Comparte tus pensamientos o únete a la discusión de la comunidad. Tus comentarios nos ayudan a mejorar el juego.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/feedback');
}

export default function FeedbackPage({
  params,
}: {
  params: { locale: string };
}) {
  return <FeedbackPageClient locale={params.locale} />;
}
