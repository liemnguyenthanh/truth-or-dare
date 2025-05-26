import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thật Hay Thách | Tiệc Tùng',
  description:
    'Chơi trò chơi Thật Hay Thách cùng bạn bè! Trò chơi vui nhộn với những câu hỏi thú vị và thử thách táo bạo.',
  keywords: [
    'thật hay thách',
    'trò chơi',
    'trò chơi vui',
    'trò chơi nhóm',
    'trò chơi bạn bè',
    'truth or dare',
    'party game',
  ],
  authors: [{ name: 'Truth or Dare Game' }],
  openGraph: {
    title: 'Thật Hay Thách | Tiệc Tùng',
    description:
      'Chơi trò chơi Thật Hay Thách cùng bạn bè! Trò chơi vui nhộn với những câu hỏi thú vị và thử thách táo bạo.',
    url: 'https://www.truthordaregame.xyz',
    siteName: 'Truth or Dare Game',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Truth or Dare Game Preview',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thật Hay Thách | Tiệc Tùng',
    description:
      'Chơi trò chơi Thật Hay Thách cùng bạn bè! Trò chơi vui nhộn với những câu hỏi thú vị và thử thách táo bạo.',
    images: ['/images/og.jpg'],
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
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  themeColor: '#9b59b6',
};
