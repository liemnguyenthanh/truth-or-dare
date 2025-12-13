'use client';

import { usePathname } from 'next/navigation';

import { HreflangTags } from '@/components/shared/HreflangTags';

import { getLocaleFromPath } from '@/i18n/config';

export function HreflangHead() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  return <HreflangTags locale={locale} pathname={pathname} />;
}
