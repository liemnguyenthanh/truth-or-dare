'use client';

import type { Locale } from '@/i18n/config';

import { Monetag } from './Monetag';

interface ConditionalAdsProps {
  locale: Locale;
  /**
   * Enable ads for specific locales
   * Default: ['vi', 'en'] - both locales with SEO-optimized implementation
   *
   * Research findings:
   * - Google confirmed: Ads do NOT directly affect SEO ranking
   * - BUT can indirectly affect through UX and Core Web Vitals
   * - Safe to enable if properly optimized:
   *   1. Lazy loading (already implemented via Next.js Script)
   *   2. Async loading (already implemented)
   *   3. Strategy: 'afterInteractive' (loads after page is interactive)
   *   4. No above-fold ads (ads load below content)
   *   5. No intrusive pop-ups (Monetag follows Better Ads Standards)
   */
  enabledLocales?: Locale[];
}

/**
 * Conditionally render ads based on locale
 *
 * SEO-Optimized Implementation:
 * - Uses Next.js Script with 'afterInteractive' strategy
 * - Loads ads asynchronously (doesn't block page render)
 * - Ads load after page becomes interactive (good for Core Web Vitals)
 * - Monetag follows Better Ads Standards (no intrusive ads)
 *
 * Research Summary:
 * ✅ Ads don't directly affect SEO ranking (Google confirmed)
 * ✅ Can safely enable for both locales if optimized properly
 * ⚠️  Only affects SEO indirectly through:
 *     - Page speed (mitigated by async + afterInteractive)
 *     - User experience (Monetag is non-intrusive)
 *     - Core Web Vitals (monitored via PageSpeed Insights)
 *
 * Best Practices Applied:
 * 1. ✅ Lazy loading (afterInteractive strategy)
 * 2. ✅ Async loading (doesn't block render)
 * 3. ✅ No above-fold ads (ads load after content)
 * 4. ✅ Non-intrusive (Monetag standards)
 * 5. ✅ Performance optimized (Next.js Script optimization)
 */
export function ConditionalAds({
  locale,
  enabledLocales = ['vi', 'en'], // Both locales - safe with proper optimization
}: ConditionalAdsProps) {
  const shouldShowAds = enabledLocales.includes(locale);

  if (!shouldShowAds) {
    return null;
  }

  return <Monetag locale={locale} />;
}
