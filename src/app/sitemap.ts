import { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/hashnode';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.truthordaregame.xyz';

  // Lấy tất cả bài blog
  const posts = await getAllPosts();

  // Các trang tĩnh
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/huong-dan`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/questions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Tạo sitemap entries cho các bài blog
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
