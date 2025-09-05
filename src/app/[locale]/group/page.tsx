import { getTranslations, Locale } from '@/lib/translations';

import { GroupModePage } from '@/features/game/pages/GroupModePage';

interface GroupPageProps {
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

export async function generateMetadata({ params }: GroupPageProps) {
  const t = getTranslations(params.locale);

  return {
    title: `${t.navigation.group} - ${t.metadata.title}`,
    description: t.metadata.description,
    openGraph: {
      title: `${t.navigation.group} - ${t.metadata.ogTitle}`,
      description: t.metadata.ogDescription,
    },
  };
}

export default function GroupPage({ params }: GroupPageProps) {
  return <GroupModePage />;
}
