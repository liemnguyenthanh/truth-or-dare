import { Metadata } from 'next';

import { loadTranslations } from '@/lib/i18n/loader';

import type { Locale } from '@/i18n/config';
import { defaultLocale } from '@/i18n/config';

export async function generateMetadata(
  locale: Locale = defaultLocale
): Promise<Metadata> {
  const translations = await loadTranslations(locale, ['seo']);
  const seo = translations['seo'];
  const baseUrl = 'https://www.truthordaregame.xyz';
  const localePath = locale === defaultLocale ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seo.metadata.title.default,
      template: seo.metadata.title.template,
    },
    description: seo.metadata.description,
    keywords: seo.metadata.keywords,
    authors: [
      {
        name: 'Truth or Dare Game',
        url: baseUrl,
      },
    ],
    creator: 'Truth or Dare Game',
    publisher: 'Truth or Dare Game',
    category: 'Entertainment',
    classification: 'Party Game',
    openGraph: {
      title: seo.metadata.openGraph.title,
      description: seo.metadata.openGraph.description,
      url: url,
      siteName: seo.metadata.openGraph.siteName,
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: seo.metadata.openGraph.alt,
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
      alternateLocale: locale === 'vi' ? 'en_US' : 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metadata.twitter.title,
      description: seo.metadata.twitter.description,
      images: ['/images/og.png'],
      creator: '@truthordarevn',
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
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: seo.metadata.appleWebApp.title,
    },
    alternates: {
      canonical: url,
      languages: {
        vi: `${baseUrl}`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}`,
      },
    },
    other: {
      'google-site-verification': 'your-google-verification-code',
    },
  };
}

export async function generatePageMetadata(
  locale: Locale,
  pageTitle: string,
  pageDescription?: string,
  pagePath?: string
): Promise<Metadata> {
  const baseMetadata = await generateMetadata(locale);
  const baseUrl = 'https://www.truthordaregame.xyz';
  const localePath = locale === defaultLocale ? '' : `/${locale}`;
  const path = pagePath || '';
  const url = `${baseUrl}${localePath}${path}`;

  return {
    ...baseMetadata,
    title: pageTitle,
    description: pageDescription || baseMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: pageTitle,
      description: pageDescription || baseMetadata.openGraph?.description,
      url: url,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: pageTitle,
      description: pageDescription || baseMetadata.twitter?.description,
    },
    alternates: {
      ...baseMetadata.alternates,
      canonical: url,
    },
  };
}
