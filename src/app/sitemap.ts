import { MetadataRoute } from 'next';

import { defaultLocale, locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.truthordaregame.xyz';

  // Static pages (without locale prefix for default locale)
  const staticPages = [
    '/',
    '/quick',
    '/drink',
    '/group',
    '/couples',
    '/spin-wheel',
    '/feedback',
    '/feedback/list',
  ];

  // Generate sitemap entries for each locale
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPages.forEach((path) => {
      // For default locale, use path as-is
      // For other locales, add locale prefix
      const url = locale === defaultLocale ? path : `/${locale}${path}`;
      const fullUrl = `${baseUrl}${url}`;

      // Determine priority based on page
      let priority = 0.8;
      if (path === '/') {
        priority = 1.0;
      } else if (['/quick', '/drink', '/group'].includes(path)) {
        priority = 0.9;
      } else if (path === '/spin-wheel') {
        priority = 0.8;
      } else if (path.startsWith('/feedback')) {
        priority = path === '/feedback' ? 0.5 : 0.4;
      }

      sitemapEntries.push({
        url: fullUrl,
        lastModified: new Date(),
        changeFrequency:
          path === '/'
            ? 'daily'
            : path.startsWith('/feedback')
            ? 'monthly'
            : 'weekly',
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              l === defaultLocale
                ? `${baseUrl}${path}`
                : `${baseUrl}/${l}${path}`,
            ])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
