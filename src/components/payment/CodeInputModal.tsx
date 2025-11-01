'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Key, X, XCircle } from 'lucide-react';
import { useState } from 'react';
import { validateCodeRequest } from '@/lib/paymentApi';
import { useOrderStorage } from '@/hooks';

interface CodeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeValid: (code: string) => void;
  onCodeInvalid: () => void;
}

export function CodeInputModal({
  isOpen,
  onClose,
  onCodeValid,
  onCodeInvalid,
}: CodeInputModalProps) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { upsert } = useOrderStorage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 8) {
      setError('Mã code phải có 8 ký tự');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const data = await validateCodeRequest(code);
      if (data.valid) {
        // Persist minimal info using code as key when we don't have orderId
        const fallbackExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        const expiresAt = data.order?.code_expires_at || fallbackExpires;
        upsert(code, { code, expiresAt, createdAt: new Date().toISOString() });
        onCodeValid(code);
        onClose();
      } else {
        setError('Mã code không hợp lệ hoặc đã hết hạn');
        onCodeInvalid();
      }
    } catch (err) {
      setError('Không thể xác thực mã code');
      onCodeInvalid();
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setCode('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4'
        style={{ zIndex: 99999 }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                <Key className='w-5 h-5 text-white' />
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Nhập mã code
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Mã code 8 ký tự để mở khóa game
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
            >
              <X className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          {/* Content */}
          <div className='p-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Mã code (8 ký tự)
                </label>
                <input
                  type='text'
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder='Nhập mã code...'
                  maxLength={8}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  disabled={isValidating}
                />
              </div>

              {error && (
                <div className='flex items-center space-x-2 text-red-600 dark:text-red-400'>
                  <XCircle className='w-4 h-4' />
                  <span className='text-sm'>{error}</span>
                </div>
              )}

              <div className='flex space-x-3'>
                <button
                  type='button'
                  onClick={handleClose}
                  className='flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                  disabled={isValidating}
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={code.length !== 8 || isValidating}
                  className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2'
                >
                  {isValidating ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className='w-4 h-4' />
                      <span>Xác thực</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <h3 className='text-sm font-medium text-blue-900 dark:text-blue-100 mb-2'>
                💡 Hướng dẫn:
              </h3>
              <ul className='text-xs text-blue-800 dark:text-blue-200 space-y-1'>
                <li>• Mua mã code từ game khác</li>
                <li>• Nhập mã code 8 ký tự</li>
                <li>• Mã có hiệu lực 24 giờ</li>
                <li>• Có thể sử dụng trên thiết bị khác</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
