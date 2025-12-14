import React from 'react';

import type { Locale } from '@/i18n/config';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Generate game schema based on locale
export function getGameSchema(locale: Locale) {
  const baseUrl = 'https://www.truthordaregame.xyz';

  if (locale === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: 'Truth or Dare Online',
      alternateName: [
        'Truth or Dare',
        'Truth or Dare Game',
        'Truth or Dare Online Game',
      ],
      description:
        "Vietnam's leading free online Truth or Dare game. Create beautiful memories with friends with over 500+ interesting questions. Perfect party game for gatherings, birthdays, and friend meetups.",
      url: `${baseUrl}/en`,
      image: `${baseUrl}/images/og.png`,
      genre: ['Party Game', 'Social Game', 'Entertainment', 'Interactive Game'],
      numberOfPlayers: '2+',
      playMode: 'MultiPlayer',
      applicationCategory: 'Game',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Truth or Dare Game',
        url: baseUrl,
      },
      inLanguage: 'en-US',
      audience: {
        '@type': 'Audience',
        audienceType: 'Teenagers and Adults',
        suggestedMinAge: 13,
      },
      keywords:
        'truth or dare, truth or dare online, truth or dare game, party game, fun game, group game, friends game, party games, online game, free game, ice breaker game, social game, interactive game, entertainment game, group activity, party activity, birthday game, truth questions, dare challenges, drinking game',
    };
  }

  // Vietnamese (default)
  return {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Thật Hay Thách Online',
    alternateName: ['Truth or Dare', 'Truth or Dare Tiếng Việt'],
    description:
      'Trò chơi Thật Hay Thách online miễn phí hàng đầu Việt Nam. Tạo kỷ niệm đẹp cùng bạn bè với hơn 500+ câu hỏi thú vị. Hoàn hảo cho tiệc tùng và gặp mặt bạn bè.',
    url: baseUrl,
    image: `${baseUrl}/images/og.png`,
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
      url: baseUrl,
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
}

// Generate website schema based on locale
export function getWebsiteSchema(locale: Locale) {
  const baseUrl = 'https://www.truthordaregame.xyz';
  const localePath = locale === 'vi' ? '' : `/${locale}`;

  if (locale === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Truth or Dare Online',
      url: `${baseUrl}${localePath}`,
      description:
        "Vietnam's leading free online Truth or Dare game. Create beautiful memories with friends with over 500+ interesting questions.",
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}${localePath}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }

  // Vietnamese (default)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thật Hay Thách Online',
    url: baseUrl,
    description:
      'Trò chơi Thật Hay Thách online miễn phí hàng đầu Việt Nam. Tạo kỷ niệm đẹp cùng bạn bè với hơn 500+ câu hỏi thú vị.',
    inLanguage: 'vi-VN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// Schema for organization (same for all locales)
export function getOrganizationSchema(locale: Locale) {
  const baseUrl = 'https://www.truthordaregame.xyz';

  if (locale === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Truth or Dare Game',
      url: baseUrl,
      logo: `${baseUrl}/favicon.svg`,
      description: 'Leading developer of free online Truth or Dare games',
      foundingDate: '2024',
      sameAs: ['https://www.instagram.com/truthordaregame.xyz'],
    };
  }

  // Vietnamese (default)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Truth or Dare Game Vietnam',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    description:
      'Nhà phát triển trò chơi Thật Hay Thách online hàng đầu Việt Nam',
    foundingDate: '2024',
    sameAs: ['https://www.instagram.com/truthordaregame.xyz'],
  };
}

// Legacy exports for backward compatibility (will be removed in future)
export const gameSchema = getGameSchema('vi');
export const websiteSchema = getWebsiteSchema('vi');
export const organizationSchema = getOrganizationSchema('vi');
