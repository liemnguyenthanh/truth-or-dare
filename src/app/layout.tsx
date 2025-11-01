import { ThemeProvider } from '@hooks/useTheme';
import { GoogleTagManager } from '@next/third-parties/google';
import * as React from 'react';

import '@/styles/globals.css';

import { GameProvider } from '@/hooks/GameProvider';

import {
  gameSchema,
  JsonLd,
  Navigation,
  organizationSchema,
  websiteSchema,
} from '@/components/shared';
import { Footer } from '@/components/shared/Footer';

import { metadata } from './metadata';
import { viewport } from './viewport';

export { metadata, viewport };

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
            <Navigation />
            <main className='min-h-screen pt-16'>{children}</main>
            <Footer />
          </GameProvider>
        </ThemeProvider>
        <GoogleTagManager gtmId='GTM-5FP2P39P' />
      </body>
      {/* Google tag (gtag.js) - Using next/script instead */}
    </html>
  );
}
