const fs = require('fs');
const path = require('path');

// Danh sách các routes tĩnh
const staticRoutes = [
  '',
  '/questions',
];

// Nếu bạn có dynamic routes, có thể fetch từ API hoặc database
const getDynamicRoutes = async () => {
  // Ví dụ: nếu bạn có các categories hoặc questions với ID
  // const categories = await fetchCategories();
  // return categories.map(cat => `/questions/${cat.slug}`);
  return [];
};

const generateSitemap = async () => {
  const siteUrl = 'https://www.truthordaregame.xyz';
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    return `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap-custom.xml'), sitemap);
  console.log('Custom sitemap generated successfully!');
};

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap }; 