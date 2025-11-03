'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AddToHomeScreenBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Detect if already installed as PWA (standalone mode)
    const standalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Only show banner if:
    // 1. iOS device
    // 2. Not in standalone mode (not installed yet)
    // 3. User hasn't dismissed it before (or dismissed more than 7 days ago)
    if (iOS && !standalone) {
      const dismissed = localStorage.getItem('add-to-home-screen-dismissed');
      if (dismissed) {
        const dismissedDate = new Date(dismissed);
        const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
        // Show again after 7 days if user dismissed
        if (daysSinceDismissed < 7) {
          return;
        }
      }

      // Delay showing banner slightly (better UX - don't show immediately on page load)
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember dismissal for 7 days
    localStorage.setItem('add-to-home-screen-dismissed', new Date().toISOString());
  };

  if (!isIOS || isStandalone || !showBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className='fixed bottom-0 left-0 right-0 z-50 px-4'
        style={{
          paddingBottom: `max(1rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))`,
        }}
      >
        <div className='max-w-md mx-auto mb-4'>
          <div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-4 flex items-start gap-3'>
            {/* Icon */}
            <div className='flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
              <Download className='w-6 h-6 text-white' />
            </div>

            {/* Content */}
            <div className='flex-1 min-w-0'>
              <h3 className='text-white font-bold text-base mb-1'>
                Thêm vào Màn hình chính
              </h3>
              <p className='text-white/90 text-sm mb-3 leading-relaxed'>
                Để truy cập nhanh hơn và trải nghiệm toàn màn hình không có thanh điều hướng
              </p>

              {/* Instructions */}
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3'>
                <ol className='text-white/90 text-xs space-y-1.5 list-decimal list-inside'>
                  <li>Nhấn vào biểu tượng <span className='font-semibold'>Share</span> ở dưới cùng</li>
                  <li>Chọn <span className='font-semibold'>&quot;Thêm vào Màn hình chính&quot;</span></li>
                  <li>Nhấn <span className='font-semibold'>&quot;Thêm&quot;</span> để hoàn tất</li>
                </ol>
              </div>

              {/* Benefits */}
              <div className='flex items-center gap-2 text-white/80 text-xs'>
                <span>✨</span>
                <span>Toàn màn hình • Truy cập nhanh • Trải nghiệm tốt hơn</span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className='flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm'
              aria-label='Đóng'
            >
              <X className='w-4 h-4 text-white' />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

