'use client';

import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { languageMetadata, Locale } from '@/lib/translations';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({
  currentLocale,
  className = '',
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale: Locale) => {
    // Remove current locale from pathname if it exists
    const pathWithoutLocale =
      pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

    // Create new path with new locale
    const newPath =
      locale === 'vi' ? pathWithoutLocale : `/${locale}${pathWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languageMetadata[currentLocale];

  return (
    <div className={`relative ${className} z-50`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        <GlobeAltIcon className='h-4 w-4' />
        <span>{currentLanguage.nativeName}</span>
        <ChevronDownIcon className='h-4 w-4' />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20'>
            <div className='py-1' role='menu'>
              {Object.entries(languageMetadata).map(([code, language]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Locale)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    code === currentLocale
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  role='menuitem'
                >
                  <div className='flex items-center justify-between'>
                    <span>{language.nativeName}</span>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      {language.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
