'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getLocaleFromPath } from '@/i18n/config';

/**
 * Redirect page for /drink route without locale
 * Always redirects to /vi/drink (default locale) to ensure locale context
 */
export default function DrinkRedirectPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get locale from current pathname or use default
    const locale = getLocaleFromPath(pathname);
    // Always redirect to route with locale prefix (even for default locale)
    // This ensures the route has proper locale context
    const localizedPath = `/${locale}/drink`;
    router.replace(localizedPath);
  }, [router, pathname]);

  return null;
}
