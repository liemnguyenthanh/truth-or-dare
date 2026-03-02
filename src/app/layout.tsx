import type { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { viewport } from './viewport';

// Minimal metadata for root layout (all routes go through [locale] which has its own metadata)
export const metadata: Metadata = {
  metadataBase: new URL('https://www.truthordaregame.xyz'),
};

export { viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vi'>
      <body>{children}</body>
    </html>
  );
}
