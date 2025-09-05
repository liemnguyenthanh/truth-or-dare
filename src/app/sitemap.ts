import { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/hashnode';
import { locales } from '@/lib/translations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.truthordaregame.xyz';

  // Lấy tất cả bài blog
  const posts = await getAllPosts();

  // Các trang tĩnh cho mỗi ngôn ngữ
  const staticPages: MetadataRoute.Sitemap = [];

  const pagePaths = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/guide', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/feedback', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/questions', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/quick', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/group', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/couples', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/spin-wheel', priority: 0.6, changeFrequency: 'weekly' as const },
  ];

  // Tạo sitemap cho mỗi ngôn ngữ
  locales.forEach((locale) => {
    pagePaths.forEach(({ path, priority, changeFrequency }) => {
      const url =
        locale === 'vi' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;

      staticPages.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [
              lang === 'vi' ? 'vi-VN' : `${lang}-${lang.toUpperCase()}`,
              lang === 'vi' ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`,
            ])
          ),
        },
      });
    });
  });

  // Tạo sitemap entries cho các bài blog (chỉ cho tiếng Việt hiện tại)
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    // Thêm hình ảnh nếu có
    ...(post.image && {
      images: [
        {
          url: post.image,
          title: post.title,
          alt: post.title,
        },
      ],
    }),
  }));

  return [...staticPages, ...blogPages];
}
