import { generatePageMetadata } from '@/lib/metadata';

import { GroupPageClient } from './GroupPageClient';

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
      title: 'Chế Độ Nhóm - Thật Hay Thách Online',
      description:
        'Thêm tên người chơi và chơi theo lượt. Chế độ nhóm hoàn hảo cho tiệc tùng với bạn bè.',
    },
    en: {
      title: 'Group Mode - Truth or Dare Online',
      description:
        'Add player names and play in turns. Perfect group mode for parties with friends.',
    },
  };

  const seo = seoTranslations[locale] || seoTranslations.vi;
  return generatePageMetadata(locale, seo.title, seo.description, '/group');
}

export default function GroupPage({ params }: { params: { locale: string } }) {
  return <GroupPageClient locale={params.locale} />;
}
