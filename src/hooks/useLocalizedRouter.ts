'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import {
  type Locale,
  getLocaleFromPath,
  getLocalizedPath,
} from '@/i18n/config';

/**
 * Custom hook that wraps Next.js router with automatic locale handling
 * Ensures locale is preserved in all navigation actions
 */
export function useLocalizedRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  /**
   * Navigate to a path with automatic locale prefix
   * @param path - Path to navigate to (e.g., '/drink', '/group')
   * @param locale - Optional locale override. If not provided, uses current locale
   */
  const push = useCallback(
    (path: string, locale?: Locale) => {
      const targetLocale = locale || currentLocale;
      const localizedPath = getLocalizedPath(path, targetLocale);
      router.push(localizedPath);
    },
    [router, currentLocale]
  );

  /**
   * Replace current path with a new path, preserving locale
   * @param path - Path to navigate to
   * @param locale - Optional locale override
   */
  const replace = useCallback(
    (path: string, locale?: Locale) => {
      const targetLocale = locale || currentLocale;
      const localizedPath = getLocalizedPath(path, targetLocale);
      router.replace(localizedPath);
    },
    [router, currentLocale]
  );

  /**
   * Navigate back in history
   */
  const back = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * Refresh current page
   */
  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return {
    push,
    replace,
    back,
    refresh,
    locale: currentLocale,
  };
}
