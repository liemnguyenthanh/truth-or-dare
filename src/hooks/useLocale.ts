'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { type Locale, getLocaleFromPath } from '@/i18n/config';

export function useLocale(): Locale {
  const pathname = usePathname();
  return useMemo(() => getLocaleFromPath(pathname), [pathname]);
}
