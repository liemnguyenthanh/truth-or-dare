import { Metadata } from 'next';
import Link from 'next/link';

import { getAllPosts } from '@/lib/hashnode';

const baseUrl = 'https://www.truthordaregame.xyz';

export const metadata: Metadata = {
  title: 'Blog - Mẹo Chơi Game và Trò Chơi Nhóm Hay',
  description:
    'Khám phá các mẹo chơi Thật Hay Thách, ý tưởng trò chơi nhóm vui nhộn và cách tổ chức tiệc tùng đáng nhớ.',
  keywords: [
    'blog trò chơi',
    'mẹo chơi thật hay thách',
    'trò chơi nhóm hay',
    'ý tưởng tiệc tùng',
    'party game tips',
    'truth or dare tips',
  ],
  openGraph: {
    title: 'Blog - Mẹo Chơi Game và Trò Chơi Nhóm Hay',
    description:
      'Khám phá các mẹo chơi Thật Hay Thách, ý tưởng trò chơi nhóm vui nhộn và cách tổ chức tiệc tùng đáng nhớ.',
    type: 'website',
    url: `${baseUrl}/blog`,
    siteName: 'Truth or Dare Game',
    locale: 'vi_VN',
    images: [
      {
        url: `${baseUrl}/images/og.png`,
        width: 1200,
        height: 630,
        alt: 'Truth or Dare Blog - Mẹo Chơi Game',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Mẹo Chơi Game và Trò Chơi Nhóm Hay',
    description:
      'Khám phá các mẹo chơi Thật Hay Thách, ý tưởng trò chơi nhóm vui nhộn và cách tổ chức tiệc tùng đáng nhớ.',
    images: [`${baseUrl}/images/og.png`],
    creator: '@truthordaregame',
    site: '@truthordaregame',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function BlogPage() {
  const blogPosts = await getAllPosts();

  return (
    <main className='container mx-auto px-4 py-8 max-w-6xl'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
          Blog Trò Chơi
        </h1>
        <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
          Khám phá các mẹo chơi, ý tưởng sáng tạo và hướng dẫn chi tiết để trở
          thành bậc thầy của trò chơi Thật Hay Thách
        </p>
      </div>

      {blogPosts.length > 0 ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className='block hover:no-underline'
            >
              <article className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full'>
                {/* Thumbnail Image */}
                {post.image ? (
                  <div className='aspect-video overflow-hidden'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                ) : (
                  <div className='aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                    <div className='text-center text-white'>
                      <svg
                        className='w-12 h-12 mx-auto mb-2 opacity-80'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                        />
                      </svg>
                      <p className='text-sm font-medium opacity-90'>
                        Blog Post
                      </p>
                    </div>
                  </div>
                )}

                <div className='p-6'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded'>
                      {post.category}
                    </span>
                    <time className='text-sm text-gray-500 dark:text-gray-400'>
                      {new Date(post.date).toLocaleDateString('vi-VN')}
                    </time>
                  </div>

                  <h2 className='text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2'>
                    {post.title}
                  </h2>

                  <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-3'>
                    {post.excerpt}
                  </p>

                  <div className='flex items-center justify-between'>
                    <span className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium'>
                      Đọc thêm
                      <svg
                        className='w-4 h-4 ml-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </span>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        // Fallback content when no posts available
        <div className='text-center py-16'>
          <div className='max-w-md mx-auto'>
            <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
              Blog Đang Được Cập Nhật
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              Chúng tôi đang chuẩn bị những bài viết thú vị về mẹo chơi Thật Hay
              Thách và các trò chơi nhóm vui nhộn. Hãy quay lại sau nhé!
            </p>
            <div className='space-y-3 text-sm text-gray-500 dark:text-gray-400'>
              <p>📝 Sắp có: "10 Câu Hỏi Thật Hay Thách Hài Hước Nhất"</p>
              <p>🎉 Sắp có: "Cách Tổ Chức Tiệc Sinh Nhật với Thật Hay Thách"</p>
              <p>🎮 Sắp có: "5 Trò Chơi Nhóm Vui Nhộn Khác"</p>
            </div>
          </div>
        </div>
      )}

      <div className='mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white'>
        <h2 className='text-3xl font-bold mb-4'>Sẵn Sàng Thử Nghiệm?</h2>
        <p className='text-xl mb-6 opacity-90'>
          {blogPosts.length > 0
            ? 'Áp dụng ngay những mẹo hay từ blog vào trò chơi Thật Hay Thách của bạn!'
            : 'Trong khi chờ blog cập nhật, hãy thử ngay trò chơi Thật Hay Thách!'}
        </p>
        <Link
          href='/'
          className='inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors'
        >
          Chơi Ngay
        </Link>
      </div>
    </main>
  );
}
