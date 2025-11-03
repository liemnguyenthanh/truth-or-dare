import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.truthordaregame.xyz'),
  title: {
    default:
      'Thật Hay Thách Online - Trò Chơi Vui Nhộn Cùng Bạn Bè | Truth or Dare',
    template: '%s | Thật Hay Thách Online',
  },
  description:
    'Chơi trò chơi Thật Hay Thách online miễn phí! Hơn 500+ câu hỏi thú vị và thử thách táo bạo. Trò chơi nhóm hoàn hảo cho tiệc tùng, sinh nhật, và các buổi gặp mặt bạn bè.',
  keywords: [
    'thật hay thách',
    'thật hay thách online',
    'trò chơi thật hay thách',
    'truth or dare',
    'truth or dare tiếng việt',
    'trò chơi vui',
    'trò chơi nhóm',
    'trò chơi bạn bè',
    'trò chơi tiệc tùng',
    'party game',
    'game vui nhộn',
    'trò chơi sinh nhật',
    'câu hỏi thật hay thách',
    'thử thách vui',
    'trò chơi tương tác',
    'game online miễn phí',
    'trò chơi giải trí',
    'hoạt động nhóm',
    'ice breaker game',
    'trò chơi làm quen',
  ],
  authors: [
    {
      name: 'Truth or Dare Game Vietnam',
      url: 'https://www.truthordaregame.xyz',
    },
  ],
  creator: 'Truth or Dare Game Vietnam',
  publisher: 'Truth or Dare Game Vietnam',
  category: 'Entertainment',
  classification: 'Party Game',
  openGraph: {
    title: 'Thật Hay Thách Online - Trò Chơi Vui Nhộn Cùng Bạn Bè',
    description:
      'Chơi trò chơi Thật Hay Thách online miễn phí! Hơn 500+ câu hỏi thú vị và thử thách táo bạo. Trò chơi nhóm hoàn hảo cho tiệc tùng và gặp mặt bạn bè.',
    url: 'https://www.truthordaregame.xyz',
    siteName: 'Thật Hay Thách Online',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Thật Hay Thách - Trò chơi vui nhộn cùng bạn bè',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thật Hay Thách Online - Trò Chơi Vui Nhộn Cùng Bạn Bè',
    description:
      'Chơi trò chơi Thật Hay Thách online miễn phí! Hơn 500+ câu hỏi thú vị và thử thách táo bạo.',
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
    title: 'Thật Hay Thách',
  },
  alternates: {
    canonical: 'https://www.truthordaregame.xyz',
  },
  other: {
    'google-site-verification': 'your-google-verification-code', // Thêm sau khi verify với Google
  },
};
