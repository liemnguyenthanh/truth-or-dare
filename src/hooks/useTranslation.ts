'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { getTranslationFromNamespaces } from '@/lib/i18n';
import { type TranslationNamespace, loadTranslations } from '@/lib/i18n/loader';

import { getLocaleFromPath } from '@/i18n/config';
import type {
  LoadedTranslations,
  TranslationKey,
  TranslationParams,
} from '@/i18n/types';

interface UseTranslationOptions {
  namespaces: TranslationNamespace[];
  translations?: LoadedTranslations;
}

export function useTranslation({
  namespaces,
  translations: providedTranslations,
}: UseTranslationOptions) {
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const [loadedTranslations, setLoadedTranslations] =
    useState<LoadedTranslations | null>(null);
  const [isLoading, setIsLoading] = useState(!providedTranslations);

  // Load translations if not provided
  useEffect(() => {
    if (providedTranslations) {
      setLoadedTranslations(providedTranslations);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    loadTranslations(locale, namespaces)
      .then((translations) => {
        if (isMounted) {
          setLoadedTranslations(translations);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Failed to load translations:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [locale, namespaces.join(','), providedTranslations]);

  const translations = providedTranslations || loadedTranslations;

  const t = useMemo(
    () => (key: TranslationKey, params?: TranslationParams) => {
      if (!translations) {
        return key;
      }

      // Try to find key in any of the provided namespaces
      return getTranslationFromNamespaces(
        translations as Record<string, any>,
        key,
        namespaces,
        params
      );
    },
    [translations, namespaces]
  );

  return {
    t,
    locale,
    translations,
    isLoading,
  };
}
