'use client';

import Script from 'next/script';

const MONETAG_SITE_ID = '3004019';

export function Monetag() {
  return (
    <Script
      id='monetag-script'
      strategy='afterInteractive'
      async
      src='https://monetag.com/script.js'
      data-site-id={MONETAG_SITE_ID}
    />
  );
}
