'use client';

import { usePathname } from 'next/navigation';

export type Locale =
  | 'vi'
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ja'
  | 'ko'
  | 'zh';

export function useLocale(): Locale {
  const pathname = usePathname();

  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/es')) return 'es';
  if (pathname.startsWith('/fr')) return 'fr';
  if (pathname.startsWith('/de')) return 'de';
  if (pathname.startsWith('/pt')) return 'pt';
  if (pathname.startsWith('/ja')) return 'ja';
  if (pathname.startsWith('/ko')) return 'ko';
  if (pathname.startsWith('/zh')) return 'zh';

  return 'vi'; // Default to Vietnamese
}
