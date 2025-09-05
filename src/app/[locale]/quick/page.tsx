import { getTranslations, Locale } from '@/lib/translations';

import { QuickModePage } from '@/features/game/pages/QuickModePage';

interface QuickPageProps {
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

export async function generateMetadata({ params }: QuickPageProps) {
  const t = getTranslations(params.locale);

  return {
    title: `${t.navigation.quick} - ${t.metadata.title}`,
    description: t.metadata.description,
    openGraph: {
      title: `${t.navigation.quick} - ${t.metadata.ogTitle}`,
      description: t.metadata.ogDescription,
    },
  };
}

export default function QuickPage({ params }: QuickPageProps) {
  return <QuickModePage />;
}
