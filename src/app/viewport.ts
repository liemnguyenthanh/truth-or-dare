import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#9b59b6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // iOS Safari specific
  viewportFit: 'cover', // Enable safe area insets for notched devices
};
