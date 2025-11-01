'use client';

import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

interface TextProps {
  children: ReactNode;
  variant?: 'body' | 'small' | 'caption' | 'large';
  className?: string;
}

/**
 * Heading component with consistent typography
 */
export function Heading({ children, level = 1, className = '' }: HeadingProps) {
  const baseClasses = 'font-bold text-gray-900 dark:text-white';
  // Size classes without margin - margin should be controlled by className prop
  const sizeClasses = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-xl',
    4: 'text-lg',
    5: 'text-base',
    6: 'text-sm',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Default margin only if className doesn't include margin classes
  const hasMargin = className.includes('m-') || className.includes('mb-') || className.includes('mt-');
  const defaultMargin = !hasMargin ? 'mb-2' : '';

  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${defaultMargin} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

/**
 * Text component with consistent typography
 */
export function Text({
  children,
  variant = 'body',
  className = '',
}: TextProps) {
  const baseClasses = 'text-gray-600 dark:text-gray-300';
  const variantClasses = {
    body: 'text-base',
    large: 'text-lg',
    small: 'text-sm',
    caption: 'text-xs text-gray-500 dark:text-gray-400',
  };

  return (
    <p className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  );
}

