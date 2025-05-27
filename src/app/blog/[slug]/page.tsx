import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import {
  BlogPost,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from '@/core/constants/blogs/blogPosts';

import SocialShareButtons from './components/SocialShareButtons';

// Generate metadata cho SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết - Truth or Dare',
      description: 'Bài viết bạn tìm kiếm không tồn tại.',
    };
  }

  return {
    title: `${post.title} | Truth or Dare Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

// Generate static params cho static generation
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

// Structured Data cho SEO
function generateStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Truth or Dare',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readTime.replace(' phút đọc', '')}M`,
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateStructuredData(post);

  return (
    <>
      {/* Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Breadcrumb */}
        <nav className='mb-8' aria-label='Breadcrumb'>
          <ol className='flex items-center space-x-2 text-sm'>
            <li>
              <Link
                href='/'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                Trang chủ
              </Link>
            </li>
            <li className='text-gray-500'>/</li>
            <li>
              <Link
                href='/blog'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                Blog
              </Link>
            </li>
            <li className='text-gray-500'>/</li>
            <li className='text-gray-900 dark:text-white font-medium'>
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
          <header className='p-8 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full'>
                {post.category}
              </span>
              <div className='flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400'>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight'>
              {post.title}
            </h1>

            <p className='text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
              {post.excerpt}
            </p>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>TT</span>
                </div>
                <div>
                  <p className='font-medium text-gray-900 dark:text-white'>
                    {post.author}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Tác giả
                  </p>
                </div>
              </div>

              {/* Social Share Buttons */}
              <SocialShareButtons title={post.title} excerpt={post.excerpt} />
            </div>
          </header>

          {/* Article Content */}
          <div className='p-8'>
            <div
              className='prose prose-lg max-w-none dark:prose-invert prose-custom
                         prose-headings:text-gray-900 dark:prose-headings:text-white
                         prose-p:text-gray-700 dark:prose-p:text-gray-300
                         prose-strong:text-gray-900 dark:prose-strong:text-white
                         prose-a:text-blue-600 dark:prose-a:text-blue-400
                         prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                         prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                         text-gray-700 dark:text-gray-300'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags */}
          <footer className='p-8 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex flex-wrap gap-2 mb-6'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full'
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Call to Action */}
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-center text-white'>
              <h3 className='text-xl font-bold mb-2'>
                Sẵn sàng thử nghiệm những ý tưởng này?
              </h3>
              <p className='mb-4 opacity-90'>
                Hãy bắt đầu chơi Thật Hay Thách ngay bây giờ!
              </p>
              <Link
                href='/'
                className='inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors'
              >
                Chơi Ngay
              </Link>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        <section className='mt-12'>
          <h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
            Bài viết liên quan
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {getRelatedPosts(post.id).map((relatedPost) => (
              <article
                key={relatedPost.id}
                className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
              >
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded'>
                      {relatedPost.category}
                    </span>
                    <time className='text-sm text-gray-500 dark:text-gray-400'>
                      {new Date(relatedPost.date).toLocaleDateString('vi-VN')}
                    </time>
                  </div>

                  <h3 className='text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2'>
                    {relatedPost.title}
                  </h3>

                  <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-2'>
                    {relatedPost.excerpt}
                  </p>

                  <Link
                    href={`/blog/${relatedPost.slug}`}
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
        </section>
      </main>
    </>
  );
}
