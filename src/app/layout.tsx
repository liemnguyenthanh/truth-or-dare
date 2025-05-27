import { GoogleTagManager } from '@next/third-parties/google';
import { ThemeProvider } from '@theme/hooks/useTheme';
import * as React from 'react';

import '@/styles/globals.css';

import {
  gameSchema,
  JsonLd,
  Navigation,
  organizationSchema,
  websiteSchema,
} from '@/shared/components';
import { Footer } from '@/shared/components/Footer';

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
          <Navigation />
          <main className='min-h-screen pt-16'>{children}</main>
          <Footer />
        </ThemeProvider>
        <GoogleTagManager gtmId='GTM-5FP2P39P' />
      </body>
    </html>
  );
}
