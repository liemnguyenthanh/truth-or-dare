import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Lazy load framer-motion components
export const LazyMotion = dynamic(
  () => import('framer-motion').then((mod) => mod.LazyMotion),
  {
    ssr: false,
    loading: () => <div className='animate-pulse'></div>,
  }
);

// Hook để sử dụng animation chỉ khi client-side
export function useClientAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
