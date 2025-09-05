import { ThemeProvider } from '@hooks/useTheme';
import { GoogleTagManager } from '@next/third-parties/google';
import * as React from 'react';

import '@/styles/globals.css';

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
          <Navigation />
          <main className='min-h-screen pt-16'>{children}</main>
          <Footer />
        </ThemeProvider>
        <GoogleTagManager gtmId='GTM-5FP2P39P' />
      </body>
      {/* Google tag (gtag.js) */}
      <script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-MF1JWJH7TJ'
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MF1JWJH7TJ');
          `,
        }}
      />
    </html>
  );
}
