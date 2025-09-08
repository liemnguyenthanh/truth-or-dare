import { Metadata } from 'next';

import { getLanguageInfo, getTranslations, Locale } from './translations';

export function generateMetadata(locale: Locale = 'vi'): Metadata {
  const t = getTranslations(locale);
  const langInfo = getLanguageInfo(locale);

  return {
    metadataBase: new URL('https://www.truthordaregame.xyz'),
    title: {
      default: t.metadata.title,
      template: `%s | ${t.metadata.title.split(' | ')[1] || 'Truth or Dare'}`,
    },
    description: t.metadata.description,
    keywords: t.metadata.keywords,
    authors: [
      {
        name: 'Truth or Dare Game',
        url: 'https://www.truthordaregame.xyz',
      },
    ],
    creator: 'Truth or Dare Game',
    publisher: 'Truth or Dare Game',
    category: 'Entertainment',
    classification: 'Party Game',
    openGraph: {
      title: t.metadata.ogTitle,
      description: t.metadata.ogDescription,
      url: `https://www.truthordaregame.xyz/${locale}`,
      siteName: t.metadata.ogTitle.split(' - ')[0],
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: t.metadata.ogTitle,
        },
      ],
      locale: langInfo.hreflang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.twitterTitle,
      description: t.metadata.twitterDescription,
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
    alternates: {
      canonical: `https://www.truthordaregame.xyz/${locale}`,
      languages: {
        'vi-VN': 'https://www.truthordaregame.xyz/vi',
        'en-US': 'https://www.truthordaregame.xyz/en',
        'es-ES': 'https://www.truthordaregame.xyz/es',
        'fr-FR': 'https://www.truthordaregame.xyz/fr',
        'de-DE': 'https://www.truthordaregame.xyz/de',
        'pt-BR': 'https://www.truthordaregame.xyz/pt',
        'ja-JP': 'https://www.truthordaregame.xyz/ja',
        'ko-KR': 'https://www.truthordaregame.xyz/ko',
        'zh-CN': 'https://www.truthordaregame.xyz/zh',
      },
    },
    other: {
      'google-site-verification': 'your-google-verification-code',
    },
  };
}
