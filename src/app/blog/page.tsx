import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import { getAllPosts } from '@/constants/blogPosts';

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
};

export default function BlogPage() {
  const blogPosts = getAllPosts();
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

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
          >
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

              <Link
                href={`/blog/${post.slug}`}
                className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium'
              >
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
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className='mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white'>
        <h2 className='text-3xl font-bold mb-4'>Sẵn Sàng Thử Nghiệm?</h2>
        <p className='text-xl mb-6 opacity-90'>
          Áp dụng ngay những mẹo hay từ blog vào trò chơi Thật Hay Thách của
          bạn!
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
