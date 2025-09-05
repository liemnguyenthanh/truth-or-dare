'use client';

import { getTranslations, Locale } from '@/lib/translations';

import { useLocale } from './useLocale';

// Client-side hook to use translations
export function useTranslations() {
  const locale = useLocale();

  return getTranslations(locale as Locale);
}
