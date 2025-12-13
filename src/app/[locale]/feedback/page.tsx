import { generatePageMetadata } from '@/lib/metadata';

import { FeedbackPageClient } from './FeedbackPageClient';

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
      title: 'Góp Ý & Thảo Luận - Thật Hay Thách Online',
      description:
        'Chia sẻ ý kiến của bạn hoặc tham gia thảo luận với cộng đồng. Góp ý giúp chúng tôi cải thiện trò chơi.',
    },
    en: {
      title: 'Feedback & Discussion - Truth or Dare Online',
      description:
        'Share your thoughts or join the community discussion. Your feedback helps us improve the game.',
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
