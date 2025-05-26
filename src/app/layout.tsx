import { ThemeProvider } from '@theme/hooks/useTheme';
import * as React from 'react';

import '@/styles/globals.css';

import { metadata } from './metadata';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vi'>
      <body className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
