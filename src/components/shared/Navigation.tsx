'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';

import { getLocaleFromPath, getLocalizedPath } from '@/i18n/config';

import { LanguageSwitcher } from './LanguageSwitcher';
import { LocalizedLink } from './LocalizedLink';

export function Navigation() {
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const { t } = useTranslation({
    namespaces: ['common'],
  });
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = useMemo(
    () => [
      {
        href: getLocalizedPath('/', locale),
        label: t('navigation.home'),
        icon: '🏠',
        target: '_self',
        rel: 'noopener noreferrer',
      },
      {
        href: getLocalizedPath('/feedback', locale),
        label: t('navigation.feedback'),
        icon: '💬',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ],
    [locale, t]
  );

  useEffect(() => {
    // Close drawer when route changes
    setIsOpen(false);
  }, [pathname]);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        id='navigation'
        className='bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300'
      >
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex items-center space-x-3 z-50'>
              {/* Desktop: Link to home */}
              <LocalizedLink
                href='/'
                className='hidden md:flex items-center space-x-3 group'
              >
                <div className='relative'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='relative w-10 h-10'
                  >
                    <Image
                      src='/favicon.svg'
                      alt='Logo'
                      width={40}
                      height={40}
                      className='transition-transform duration-200'
                    />
                  </motion.div>
                </div>
                <div>
                  <span className='text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    {t('app.name')}
                  </span>
                  <p className='text-xs text-gray-500 dark:text-gray-400 -mt-1'>
                    {t('app.subtitle')}
                  </p>
                </div>
              </LocalizedLink>
              {/* Mobile: Logo only */}
              <LocalizedLink
                href='/'
                className='md:hidden flex items-center group'
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='relative w-10 h-10'
                >
                  <Image
                    src='/favicon.svg'
                    alt='Logo'
                    width={40}
                    height={40}
                    className='transition-transform duration-200'
                  />
                </motion.div>
              </LocalizedLink>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-2'>
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                  target={item.target}
                  rel={item.rel}
                >
                  <span
                    className={`text-lg transition-transform duration-200 ${
                      pathname === item.href
                        ? 'scale-110'
                        : 'group-hover:scale-110'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -z-10'
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              ))}
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200'
                aria-label={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              >
                <span className='text-lg'>{isDarkMode ? '☀️' : '🌙'}</span>
              </motion.button>
              <LanguageSwitcher />
            </div>

            {/* Mobile: Language Switcher, Theme Toggle and Menu Button */}
            <div className='md:hidden flex items-center gap-2'>
              <LanguageSwitcher />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200'
                aria-label={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              >
                <span className='text-lg'>{isDarkMode ? '☀️' : '🌙'}</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className='relative z-50 inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200'
              >
                <motion.div
                  animate={isOpen ? 'open' : 'closed'}
                  className='w-6 h-6 flex flex-col justify-center items-center'
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 },
                    }}
                    className='w-6 h-0.5 bg-current block transition-all'
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className='w-6 h-0.5 bg-current block mt-1.5 transition-all'
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 },
                    }}
                    className='w-6 h-0.5 bg-current block mt-1.5 transition-all'
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-50 md:hidden'
            >
              <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='p-6 border-b border-gray-200/50 dark:border-gray-700/50'>
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>
                      <Image
                        src='/favicon.svg'
                        alt='Logo'
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                        {t('app.name')}
                      </h2>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {t('app.description')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className='flex-1 p-6 overflow-y-auto'>
                  <nav className='space-y-3'>
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`group relative flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                            pathname === item.href
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400'
                          }`}
                        >
                          <span
                            className={`text-2xl transition-transform duration-200 ${
                              pathname === item.href
                                ? 'scale-110'
                                : 'group-hover:scale-110'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                          {pathname === item.href && (
                            <motion.div
                              layoutId='activeMobileTab'
                              className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl -z-10'
                              transition={{
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                    {/* Theme Toggle in Mobile Drawer */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navigationItems.length * 0.1 }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleDarkMode}
                        className='group relative flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400'
                      >
                        <span className='text-2xl transition-transform duration-200 group-hover:scale-110'>
                          {isDarkMode ? '☀️' : '🌙'}
                        </span>
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </motion.button>
                    </motion.div>
                  </nav>
                </div>

                {/* Footer */}
                <div className='p-6 border-t border-gray-200/50 dark:border-gray-700/50'>
                  <div className='text-center space-y-4'>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                      {t('footer.version')}
                    </p>
                    <div className='flex justify-center space-x-6'>
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        href='#'
                        className='text-2xl hover:text-blue-500 transition-colors duration-200'
                        title='Facebook'
                      >
                        📘
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        href='#'
                        className='text-2xl hover:text-green-500 transition-colors duration-200'
                        title='WhatsApp'
                      >
                        📱
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        href='#'
                        className='text-2xl hover:text-purple-500 transition-colors duration-200'
                        title='Share'
                      >
                        🔗
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
