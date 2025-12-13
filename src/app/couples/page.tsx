'use client';

import { useEffect } from 'react';

import { useLocalizedRouter } from '@/hooks/useLocalizedRouter';

export default function CouplesRedirectPage() {
  const router = useLocalizedRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}
