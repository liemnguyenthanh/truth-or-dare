'use client';

import Script from 'next/script';

import type { Locale } from '@/i18n/config';

const MONETAG_SITE_ID = '3004019';

interface MonetagProps {
  locale?: Locale;
}

/**
 * Monetag Ad Network Component
 *
 * How it works:
 * - Automatically detects language from:
 *   1. Browser language (Accept-Language header)
 *   2. IP address (geo-targeting)
 *   3. URL path (if locale in URL)
 *
 * Ads displayed:
 * - Vietnamese (vi): Ads in Vietnamese, targeting Vietnamese users
 * - English (en): Ads in English/international, targeting global users
 *
 * Monetag automatically shows relevant ads based on:
 * - User's location (IP-based geo-targeting)
 * - Browser language settings
 * - Advertisers' targeting preferences
 */
export function Monetag({ locale }: MonetagProps) {
  // Monetag automatically detects language and geo-location
  // No need to pass locale explicitly, but we can add data attributes if needed
  return (
    <Script
      id='monetag-script'
      strategy='afterInteractive'
      async
      src='https://monetag.com/script.js'
      data-site-id={MONETAG_SITE_ID}
      // Monetag will automatically detect locale from:
      // - Browser language
      // - IP address (geo-targeting)
      // - URL path
    />
  );
}
