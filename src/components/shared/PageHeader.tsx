'use client';

import { BackButton } from './BackButton';
import { DonateButton } from './DonateButton';

interface PageHeaderProps {
  /** Callback khi click vào button donate - Optional */
  onDonate?: () => void;
  /** Route để quay lại, mặc định là '/' */
  backHref?: string;
  /** Custom back handler - Nếu có sẽ override backHref */
  onBack?: () => void;
  /** Text hiển thị cho back button, mặc định là 'Quay lại' */
  backLabel?: string;
  /** Text hiển thị cho donate button, mặc định là 'Donate' */
  donateLabel?: string;
  /** Custom className cho container */
  className?: string;
}

export function PageHeader({
  onDonate,
  backHref = '/',
  onBack,
  backLabel = 'Quay lại',
  donateLabel = 'Donate',
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 pt-4 ${className}`}>
      {onBack ? (
        <button
          onClick={onBack}
          className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/70 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='font-medium'>{backLabel}</span>
        </button>
      ) : (
        <BackButton href={backHref} label={backLabel} />
      )}
      {onDonate && <DonateButton onClick={onDonate} label={donateLabel} />}
    </div>
  );
}
