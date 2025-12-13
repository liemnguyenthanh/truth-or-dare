'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';

import {
  type Locale,
  getLocaleFromPath,
  getLocalizedPath,
} from '@/i18n/config';

interface LocalizedLinkProps
  extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  href: string;
  children: ReactNode;
  locale?: Locale;
}

/**
 * Localized Link component that automatically adds locale prefix to href
 * Use this instead of Next.js Link to ensure locale is preserved
 *
 * @example
 * ```tsx
 * <LocalizedLink href="/drink">Drink Mode</LocalizedLink>
 * // Renders: <Link href="/en/drink"> or <Link href="/vi/drink">
 * ```
 */
export function LocalizedLink({
  href,
  children,
  locale,
  ...props
}: LocalizedLinkProps) {
  const pathname = usePathname();
  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const targetLocale = locale || currentLocale;
  const localizedHref = useMemo(
    () => getLocalizedPath(href, targetLocale),
    [href, targetLocale]
  );

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
