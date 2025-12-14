import { ThemeProvider } from '@hooks/useTheme';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import * as React from 'react';

import '@/styles/globals.css';

import { GameProvider } from '@/hooks/GameProvider';

import {
  AddToHomeScreenBanner,
  gameSchema,
  JsonLd,
  Navigation,
  organizationSchema,
  ScrollToTop,
  websiteSchema,
} from '@/components/shared';
import { Footer } from '@/components/shared/Footer';

import { metadata } from './metadata';
import { viewport } from './viewport';

export { metadata, viewport };
const gaId = 'G-MF1JWJH7TJ';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vi'>
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
        {/* <Monetag />
        <MonetagOnClick /> */}
      </body>
      {/* Google tag (gtag.js) - Using next/script instead */}
    </html>
  );
}
