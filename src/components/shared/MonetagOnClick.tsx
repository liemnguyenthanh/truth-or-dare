'use client';

import Script from 'next/script';

const MONETAG_ONCLICK_ZONE_ID = '190627';

export function MonetagOnClick() {
  return (
    <Script
      id='monetag-onclick-script'
      strategy='afterInteractive'
      async
      src='https://quge5.com/88/tag.min.js'
      data-zone={MONETAG_ONCLICK_ZONE_ID}
      data-cfasync='false'
    />
  );
}
