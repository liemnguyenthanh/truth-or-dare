'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { type Locale, getLocalizedPath, isValidLocale } from '@/i18n/config';

export function CouplesPageClient({ locale }: { locale: string }) {
  const router = useRouter();
  const validLocale: Locale = isValidLocale(locale) ? locale : 'vi';

  useEffect(() => {
    router.replace(getLocalizedPath('/', validLocale));
  }, [router, validLocale]);

  return null;
}
