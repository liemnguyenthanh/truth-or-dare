'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const MONETAG_ONCLICK_ZONE_ID = '190627';
const THROTTLE_DURATION_MS = 60 * 1000; // 60 seconds
const STORAGE_KEY = 'monetag-onclick-last-redirect';

/**
 * MonetagOnClick Component with Throttle
 *
 * Prevents redirect spam by only allowing redirects once every 60 seconds.
 * Uses localStorage to track the last redirect timestamp.
 *
 * How it works:
 * 1. Checks localStorage for last redirect timestamp
 * 2. Only loads script if 60 seconds have passed since last redirect
 * 3. Tracks redirects via beforeunload/visibilitychange events
 * 4. Updates timestamp in localStorage after redirect
 *
 * This prevents the script from being active during the throttle period,
 * which is the most reliable way to prevent redirects from third-party scripts.
 */
export function MonetagOnClick() {
  const [shouldLoadScript, setShouldLoadScript] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout | null = null;

    // Check if we can load the script (60 seconds have passed)
    const checkThrottle = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      const lastRedirect = localStorage.getItem(STORAGE_KEY);
      if (!lastRedirect) {
        // No previous redirect, allow loading immediately
        setShouldLoadScript(true);
        return;
      }

      const lastRedirectTime = parseInt(lastRedirect, 10);
      const now = Date.now();
      const timeSinceLastRedirect = now - lastRedirectTime;

      if (timeSinceLastRedirect >= THROTTLE_DURATION_MS) {
        // 60 seconds have passed, allow loading
        setShouldLoadScript(true);
      } else {
        // Still in throttle period, schedule loading after remaining time
        const remainingTime = THROTTLE_DURATION_MS - timeSinceLastRedirect;
        setShouldLoadScript(false);
        timeoutId = setTimeout(() => {
          setShouldLoadScript(true);
          timeoutId = null;
        }, remainingTime);
      }
    };

    // Initial check
    checkThrottle();

    // Track redirect events to update timestamp
    const handleBeforeUnload = () => {
      // User is navigating away (likely due to redirect)
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    };

    const handleVisibilityChange = () => {
      // Page becomes hidden (likely due to redirect)
      if (document.hidden) {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        // Reset script loading state so it won't load again until 60s passes
        setShouldLoadScript(false);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      } else {
        // Page becomes visible again, recheck throttle
        checkThrottle();
      }
    };

    // Also track when user returns to page (after redirect)
    const handleFocus = () => {
      // User returned to page, check if we need to reset throttle
      checkThrottle();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (!shouldLoadScript) {
    return null;
  }

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
