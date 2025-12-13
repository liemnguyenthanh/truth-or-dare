import { generatePageMetadata } from '@/lib/metadata';

import { SpinWheelPageClient } from './SpinWheelPageClient';

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
      title: 'Vòng Quay May Mắn - Thật Hay Thách Online',
      description:
        'Quay vòng may mắn để nhận câu hỏi ngẫu nhiên. Chơi vui vẻ với bạn bè!',
    },
    en: {
      title: 'Spin Wheel - Truth or Dare Online',
      description:
        'Spin the wheel to get random questions. Have fun with friends!',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(
    locale,
    seo.title,
    seo.description,
    '/spin-wheel'
  );
}

export default function SpinWheelPage({
  params,
}: {
  params: { locale: string };
}) {
  return <SpinWheelPageClient locale={params.locale} />;
}
