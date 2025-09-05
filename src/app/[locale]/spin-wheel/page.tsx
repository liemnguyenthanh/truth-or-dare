import { getTranslations, Locale } from '@/lib/translations';

import { SpinWheelModePage } from '@/features/game/pages/SpinWheelModePage';

interface SpinWheelPageProps {
  params: { locale: Locale };
}

export async function generateStaticParams() {
  return [
    { locale: 'vi' },
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'de' },
    { locale: 'pt' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'zh' },
  ];
}

export async function generateMetadata({ params }: SpinWheelPageProps) {
  const t = getTranslations(params.locale);

  return {
    title: `Spin Wheel - ${t.metadata.title}`,
    description: t.metadata.description,
    openGraph: {
      title: `Spin Wheel - ${t.metadata.ogTitle}`,
      description: t.metadata.ogDescription,
    },
  };
}

export default function SpinWheelPage({ params }: SpinWheelPageProps) {
  return <SpinWheelModePage />;
}
