import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema for the main game page
export const gameSchema = {
  '@context': 'https://schema.org',
  '@type': 'Game',
  name: 'Thật Hay Thách Online',
  alternateName: ['Truth or Dare', 'Truth or Dare Tiếng Việt'],
  description:
    'Trò chơi Thật Hay Thách online miễn phí với hơn 500+ câu hỏi thú vị và thử thách táo bạo. Hoàn hảo cho tiệc tùng và gặp mặt bạn bè.',
  url: 'https://www.truthordaregame.xyz',
  image: 'https://www.truthordaregame.xyz/images/og.png',
  genre: ['Party Game', 'Social Game', 'Entertainment'],
  numberOfPlayers: '2+',
  playMode: 'MultiPlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND',
    availability: 'https://schema.org/InStock',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Truth or Dare Game Vietnam',
    url: 'https://www.truthordaregame.xyz',
  },
  inLanguage: 'vi-VN',
  audience: {
    '@type': 'Audience',
    audienceType: 'Teenagers and Adults',
    suggestedMinAge: 13,
  },
  keywords:
    'thật hay thách, truth or dare, trò chơi nhóm, party game, trò chơi vui, game online miễn phí',
};

// Schema for the website
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Thật Hay Thách Online',
  url: 'https://www.truthordaregame.xyz',
  description: 'Website chơi trò chơi Thật Hay Thách online miễn phí',
  inLanguage: 'vi-VN',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.truthordaregame.xyz/questions?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Schema for organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Truth or Dare Game Vietnam',
  url: 'https://www.truthordaregame.xyz',
  logo: 'https://www.truthordaregame.xyz/favicon.svg',
  description:
    'Nhà phát triển trò chơi Thật Hay Thách online hàng đầu Việt Nam',
  foundingDate: '2024',
  sameAs: [
    'https://www.facebook.com/truthordarevn',
    'https://www.instagram.com/truthordarevn',
  ],
};
