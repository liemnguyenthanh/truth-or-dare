'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useLocale, useTranslations } from '@/hooks';

import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const currentLocale = useLocale(); // Use common locale hook
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  // Create localized navigation items
  const getNavigationItems = () => {
    const basePath = `/${currentLocale}`;

    return [
      { href: `${basePath}/`, label: t.navigation.home, icon: '🎮' },
      {
        href: `${basePath}/questions`,
        label: t.navigation.questions,
        icon: '❓',
      },
      {
        href: `${basePath}/feedback`,
        label: t.navigation.feedback,
        icon: '💬',
        subItems: [
          {
            href: `${basePath}/feedback`,
            label: t.navigation.feedback,
            icon: '✍️',
          },
          {
            href: `${basePath}/feedback/list`,
            label: t.navigation.feedback,
            icon: '👁️',
          },
        ],
      },
      { href: `/blog`, label: t.navigation.blog, icon: '📝' },
    ];
  };

  const navigationItems = getNavigationItems();

  useEffect(() => {
    // Close drawer when route changes
    setIsOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
  }, [pathname]);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setOpenDropdown(null);
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

  const isActiveItem = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((subItem: any) => pathname === subItem.href);
    }
    return pathname === item.href;
  };

  return (
    <>
      <nav
        id='navigation'
        className='dark:bg-gray-800 bg-white shadow-lg fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300'
      >
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link
              href={currentLocale === 'vi' ? '/' : `/${currentLocale}`}
              className='flex items-center space-x-2 z-50'
            >
              <span className='text-2xl'>🎯</span>
              <span className='text-xl font-bold text-gray-900 dark:text-white'>
                {currentLocale === 'vi' ? 'Thật Hay Thách' : 'Truth or Dare'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-2'>
              {navigationItems.map((item) => (
                <div key={item.label} className='relative'>
                  {item.subItems ? (
                    <div
                      className='relative'
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                          isActiveItem(item)
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className='text-lg'>{item.icon}</span>
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Desktop Dropdown */}
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className='absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2'
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                                  pathname === subItem.href
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                <span>{subItem.icon}</span>
                                <span>{subItem.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        pathname === item.href
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className='text-lg'>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Language Switcher */}
              <LanguageSwitcher currentLocale={currentLocale} />
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className='md:hidden relative z-50 inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none'
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
              className='fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-2xl z-50 md:hidden'
            >
              <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-3xl'>🎯</span>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                        {currentLocale === 'vi'
                          ? 'Thật Hay Thách'
                          : 'Truth or Dare'}
                      </h2>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {currentLocale === 'vi'
                          ? 'Trò chơi vui nhộn cùng bạn bè'
                          : 'Fun game with friends'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className='flex-1 p-6 overflow-y-auto'>
                  {/* Language Switcher for Mobile */}
                  <div className='mb-6'>
                    <LanguageSwitcher currentLocale={currentLocale} />
                  </div>

                  <nav className='space-y-2'>
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.subItems ? (
                          <div>
                            <button
                              onClick={() =>
                                setExpandedMobile(
                                  expandedMobile === item.label
                                    ? null
                                    : item.label
                                )
                              }
                              className={`w-full flex items-center justify-between space-x-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 group ${
                                isActiveItem(item)
                                  ? 'bg-blue-500 text-white shadow-lg'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              <div className='flex items-center space-x-4'>
                                <span className='text-2xl group-hover:scale-110 transition-transform'>
                                  {item.icon}
                                </span>
                                <span>{item.label}</span>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  expandedMobile === item.label
                                    ? 'rotate-180'
                                    : ''
                                }`}
                              />
                            </button>

                            {/* Mobile Submenu */}
                            <AnimatePresence>
                              {expandedMobile === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className='ml-4 mt-2 space-y-1'
                                >
                                  {item.subItems.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={() => setIsOpen(false)}
                                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                        pathname === subItem.href
                                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                      }`}
                                    >
                                      <span>{subItem.icon}</span>
                                      <span>{subItem.label}</span>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 group ${
                              pathname === item.href
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <span className='text-2xl group-hover:scale-110 transition-transform'>
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                            {pathname === item.href && (
                              <motion.div
                                layoutId='activeIndicator'
                                className='ml-auto w-2 h-2 bg-white rounded-full'
                              />
                            )}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className='p-6 border-t border-gray-200 dark:border-gray-700'>
                  <div className='text-center'>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>
                      Phiên bản 1.0.0
                    </p>
                    <div className='flex justify-center space-x-4'>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href='#'
                        className='text-gray-400 hover:text-blue-500 transition-colors'
                        title='Facebook'
                      >
                        📘
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href='#'
                        className='text-gray-400 hover:text-green-500 transition-colors'
                        title='WhatsApp'
                      >
                        📱
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href='#'
                        className='text-gray-400 hover:text-purple-500 transition-colors'
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
