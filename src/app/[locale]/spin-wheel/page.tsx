import { generatePageMetadata } from '@/lib/metadata';

import { locales } from '@/i18n/config';

import { SpinWheelPageClient } from './SpinWheelPageClient';

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
      title: 'Vòng Quay May Mắn - Thật Hay Thách Online',
      description:
        'Quay vòng may mắn để nhận câu hỏi ngẫu nhiên. Chơi vui vẻ với bạn bè!',
    },
    en: {
      title: 'Spin Wheel - Truth or Dare Online',
      description:
        'Spin the wheel to get random questions. Have fun with friends!',
    },
    es: {
      title: 'Ruleta de la Suerte - Verdad o Reto Online',
      description:
        '¡Gira la ruleta para obtener preguntas aleatorias! Diviértete con tus amigos.',
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
