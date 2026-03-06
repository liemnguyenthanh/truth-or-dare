import type { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { generateMetadata as generateLocaleMetadata } from '@/lib/metadata';

import { viewport } from './viewport';

export async function generateMetadata(): Promise<Metadata> {
  return generateLocaleMetadata('vi');
}

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
