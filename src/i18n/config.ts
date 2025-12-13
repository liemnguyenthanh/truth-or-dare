export const locales = ['vi', 'en'] as const;
export const defaultLocale = 'vi';
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && isValidLocale(segments[0])) {
    return segments[0];
  }
  return defaultLocale;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  // Remove existing locale if present
  if (segments[0] && isValidLocale(segments[0])) {
    segments.shift();
  }

  // Add new locale
  if (locale !== defaultLocale) {
    segments.unshift(locale);
  }

  return '/' + segments.join('/');
}
