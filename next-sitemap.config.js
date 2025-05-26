/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://www.truthordaregame.xyz',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  alternateRefs: [
    {
      href: 'https://www.truthordaregame.xyz',
      hreflang: 'vi-VN',
    },
  ],
  sitemapSize: 5000,
  exclude: ['/api/*', '/_next/*', '/static/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    additionalSitemaps: ['https://www.truthordaregame.xyz/sitemap.xml'],
  },
  generateIndexSitemap: true,
};
