'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getLocaleFromPath } from '@/i18n/config';

/**
 * Redirect page for /group route without locale
 * Always redirects to /vi/group or /en/group to ensure locale context
 */
export default function GroupRedirectPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get locale from current pathname or use default
    const locale = getLocaleFromPath(pathname);
    // Always redirect to route with locale prefix (even for default locale)
    // This ensures the route has proper locale context
    const localizedPath = `/${locale}/group`;
    router.replace(localizedPath);
  }, [router, pathname]);

  return null;
}
