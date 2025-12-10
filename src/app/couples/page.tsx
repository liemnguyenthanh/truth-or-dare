'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CouplesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}
