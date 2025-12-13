'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

import {
  type Locale,
  getLocaleFromPath,
  getLocalizedPath,
  locales,
} from '@/i18n/config';

const localeOptions: Record<Locale, { flag: string; label: string }> = {
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  en: { flag: '🇬🇧', label: 'English' },
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const { t } = useTranslation({
    namespaces: ['common'],
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: Locale) => {
    // Skip if already on the same locale
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const newPath = getLocalizedPath(pathname, newLocale);

    // First, replace the current history entry using window.history
    // This ensures the browser history is properly updated
    if (typeof window !== 'undefined') {
      const currentState = window.history.state;
      window.history.replaceState(
        {
          ...currentState,
          as: newPath,
          url: newPath,
        },
        '',
        newPath
      );
    }

    // Then update Next.js router state
    // Using replace to avoid creating a new history entry
    router.replace(newPath, { scroll: false });

    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentOption = localeOptions[currentLocale];

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
        aria-label={t('language.select')}
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        <Globe className='w-4 h-4 text-gray-500 dark:text-gray-400' />
        <span className='hidden sm:inline'>
          {currentOption.flag} {currentOption.label}
        </span>
        <span className='sm:hidden'>{currentOption.flag}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50'
          >
            <div className='py-1'>
              {locales.map((locale) => {
                const option = localeOptions[locale];
                const isSelected = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors duration-150 ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className='text-xl'>{option.flag}</span>
                    <span className='flex-1'>{option.label}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className='w-2 h-2 rounded-full bg-purple-500'
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
