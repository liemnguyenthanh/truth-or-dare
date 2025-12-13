'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getLocaleFromPath } from '@/i18n/config';

/**
 * Redirect page for /quick route without locale
 * Always redirects to /vi/quick or /en/quick to ensure locale context
 */
export default function QuickRedirectPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get locale from current pathname or use default
    const locale = getLocaleFromPath(pathname);
    // Always redirect to route with locale prefix (even for default locale)
    // This ensures the route has proper locale context
    const localizedPath = `/${locale}/quick`;
    router.replace(localizedPath);
  }, [router, pathname]);

  return null;
}
