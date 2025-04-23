'use client';

import * as React from 'react';

import '@/styles/globals.css';
import { ThemeToggle } from '@theme/components/ThemeToggle';
import { ThemeProvider } from '@theme/hooks/useTheme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
