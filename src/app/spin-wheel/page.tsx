'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { getLocaleFromPath } from '@/i18n/config';

/**
 * Redirect page for /spin-wheel route without locale
 * Always redirects to /vi/spin-wheel or /en/spin-wheel to ensure locale context
 */
export default function SpinWheelRedirectPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get locale from current pathname or use default
    const locale = getLocaleFromPath(pathname);
    // Always redirect to route with locale prefix (even for default locale)
    // This ensures the route has proper locale context
    const localizedPath = `/${locale}/spin-wheel`;
    router.replace(localizedPath);
  }, [router, pathname]);

  return null;
}
