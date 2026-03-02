import { MetadataRoute } from 'next';

import { defaultLocale, locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.truthordaregame.xyz';
  const lastModified = process.env.NEXT_PUBLIC_SITEMAP_LASTMOD
    ? new Date(process.env.NEXT_PUBLIC_SITEMAP_LASTMOD)
    : undefined;

  // Static pages (without locale prefix - will be added automatically)
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
      // ALWAYS include locale prefix in URL
      const url = `/${locale}${path}`;
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
        lastModified,
        changeFrequency:
          path === '/'
            ? 'daily'
            : path.startsWith('/feedback')
            ? 'monthly'
            : 'weekly',
        priority,
        alternates: {
          languages: Object.fromEntries([
            ...locales.map((l) => [
              l,
              `${baseUrl}/${l}${path}`, // ALWAYS include locale prefix
            ]),
            ['x-default', `${baseUrl}/${defaultLocale}${path}`],
          ]),
        },
      });
    });
  });

  return sitemapEntries;
}
