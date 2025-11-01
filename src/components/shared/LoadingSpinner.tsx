'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'purple';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-8 h-8 border-2',
};

const colorClasses = {
  white: 'border-white border-t-transparent',
  purple: 'border-purple-500 border-t-transparent',
};

export function LoadingSpinner({
  size = 'md',
  color = 'white',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role='status'
      aria-label='Loading'
    />
  );
}

