'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface DonateTickerProps {
  text?: string;
  className?: string;
}

const DONATE_MESSAGES = [
  'Phiên chợ đông mua nhầm con cá, app k có donate đói quá men ơi',
  'Ủng hộ dev một ly cafe để code tiếp nào 🍵',
  'Donate nhỏ nhưng ý nghĩa lớn, cảm ơn bạn nhiều 💝',
  'App free nhưng donate sẽ giúp dev sống sót qua tháng này 😅',
  'Một donate nhỏ = một động lực lớn cho dev 🚀',
  'Cảm ơn bạn đã chơi game, donate để ủng hộ nhé ❤️',
  'Dev đang đói, donate một bữa cơm nhé 🍜',
  'Ủng hộ dev để còn update game mới nữa nha 🎮',
  'Donate để dev không phải bán app cho Google 😂',
  'Một chút donate = một niềm vui lớn cho dev 🎉',
];

function getDonateText(): string {
  return DONATE_MESSAGES.join(' • ');
}

export function DonateTicker({ text, className = '' }: DonateTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Sử dụng text từ props hoặc lấy từ mảng messages
  const displayText = text || getDonateText();

  // Duplicate text để seamless loop - duplicate 3 lần để đảm bảo seamless
  const duplicatedText = `${displayText} • ${displayText} • ${displayText}`;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-pink-500/10 via-red-500/10 to-pink-500/10 border-b border-pink-200/20 dark:border-pink-900/20 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className='flex items-center gap-2 py-2'>
        {/* Heart icon */}
        <div className='flex-shrink-0 ml-4 z-10 bg-gradient-to-r from-pink-500/10 via-red-500/10 to-pink-500/10'>
          <Heart className='w-4 h-4 text-pink-500 animate-pulse' />
        </div>

        {/* Scrolling text */}
        <div className='flex-1 overflow-hidden relative'>
          <motion.div
            className='flex whitespace-nowrap'
            animate={{
              x: isPaused ? undefined : ['0%', '-33.333%'],
            }}
            transition={{
              duration: 15, // Faster speed (lower = faster, higher = slower)
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            <span className='inline-block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 px-2'>
              {duplicatedText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
