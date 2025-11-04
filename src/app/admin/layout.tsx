'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAdminAuth } from './hooks';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAdminAuth();

  // Skip authentication check for login page
  const isLoginPage =
    pathname === '/admin/login' || pathname === '/admin/login/';

  useEffect(() => {
    // Only redirect if not on login page
    if (!isLoginPage && !isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, isLoginPage]);

  // Show loading state while checking authentication (skip for login page)
  if (!isLoginPage && isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-400'>
            Đang kiểm tra xác thực...
          </p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated (will redirect) - skip for login page
  if (!isLoginPage && !isAuthenticated) {
    return null;
  }

  // For login page, just render children without admin UI
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Admin Dashboard
            </h1>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Quản lý Orders
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();
  const { logout, user } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <div className='flex items-center space-x-4'>
      {user && (
        <span className='text-sm text-gray-600 dark:text-gray-400'>
          {user.email}
        </span>
      )}
      <button
        onClick={handleLogout}
        className='px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors'
      >
        Đăng xuất
      </button>
    </div>
  );
}
