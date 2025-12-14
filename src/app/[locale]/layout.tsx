import { ThemeProvider } from '@hooks/useTheme';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import * as React from 'react';

import '@/styles/globals.css';

import { generateMetadata as generateLocaleMetadata } from '@/lib/metadata';
import { GameProvider } from '@/hooks/GameProvider';

import {
  AddToHomeScreenBanner,
  ConditionalAds,
  getGameSchema,
  getOrganizationSchema,
  getWebsiteSchema,
  JsonLd,
  Navigation,
  ScrollToTop,
} from '@/components/shared';
import { Footer } from '@/components/shared/Footer';

import { type Locale, isValidLocale } from '@/i18n/config';

import { viewport } from '../viewport';

export { viewport };
const gaId = 'G-MF1JWJH7TJ';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : 'vi';
  return generateLocaleMetadata(locale);
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : 'vi';

  const gameSchema = getGameSchema(locale);
  const websiteSchema = getWebsiteSchema(locale);
  const organizationSchema = getOrganizationSchema(locale);

  return (
    <html lang={locale}>
      <head>
        <JsonLd data={gameSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
        <ThemeProvider>
          <GameProvider>
            <ScrollToTop />
            <Navigation />
            <main className='min-h-screen pt-16'>{children}</main>
            <Footer />
            <AddToHomeScreenBanner />
          </GameProvider>
        </ThemeProvider>
        <GoogleTagManager gtmId='GTM-5FP2P39P' />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <ConditionalAds locale={locale} />
      </body>
    </html>
  );
}
