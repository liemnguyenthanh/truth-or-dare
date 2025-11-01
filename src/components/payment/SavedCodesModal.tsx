'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Clock, Copy, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useOrderStorage } from '@/hooks';

interface SavedCodeItem {
  orderId: string;
  accessCode: string;
  expiresAt: string;
  createdAt: string;
}

interface SavedCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SavedCodesModal({ isOpen, onClose }: SavedCodesModalProps) {
  const { list, remove } = useOrderStorage();
  const [savedCodes, setSavedCodes] = useState<SavedCodeItem[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load saved codes from localStorage
  useEffect(() => {
    if (isOpen) {
      loadSavedCodes();
    }
  }, [isOpen]);

  const loadSavedCodes = () => {
    try {
      // Map hook data to UI items and sort by createdAt desc
      const mapped: SavedCodeItem[] = list.map((item) => ({
        orderId: item.orderId,
        accessCode: item.code,
        expiresAt: item.expiresAt,
        createdAt: item.createdAt,
      }));
      mapped.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSavedCodes(mapped);
    } catch {
      setSavedCodes([]);
    }
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      // Failed to copy code
    }
  };

  const deleteCode = (orderId: string) => {
    try {
      remove(orderId);
      loadSavedCodes();
    } catch {
      // ignore
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'expired':
        return 'text-red-500 bg-red-100 dark:bg-red-900';
      default:
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'expired':
        return 'Hết hạn';
      default:
        return 'Chờ thanh toán';
    }
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'
          style={{ zIndex: 99999 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden'
          >
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
              <div>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Mã codes đã lưu
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Danh sách các mã thanh toán đã tạo
                </p>
              </div>
              <button
                onClick={onClose}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
              >
                <X className='w-5 h-5 text-gray-500' />
              </button>
            </div>

            {/* Content */}
            <div className='p-6 overflow-y-auto max-h-[60vh]'>
              {savedCodes.length === 0 ? (
                <div className='text-center py-8'>
                  <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Clock className='w-8 h-8 text-gray-400' />
                  </div>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Chưa có mã code nào được lưu
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {savedCodes.map((code) => (
                    <motion.div
                      key={code.orderId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center space-x-3'>
                          <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm'>🔑</div>
                          <div>
                            <p className='font-mono text-lg font-bold text-gray-900 dark:text-white'>
                              {code.accessCode}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isExpired(code.expiresAt) ? 'text-red-500 bg-red-100 dark:bg-red-900' : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'}`}>
                            {isExpired(code.expiresAt) ? 'Hết hạn' : 'Chờ dùng'}
                          </span>
                          <button
                            onClick={() => deleteCode(code.orderId)}
                            className='p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors'
                          >
                            <Trash2 className='w-4 h-4 text-red-500' />
                          </button>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='text-sm text-gray-500 dark:text-gray-400'>
                          <p>Tạo: {formatDate(code.createdAt)}</p>
                          <p className={isExpired(code.expiresAt) ? 'text-red-500' : ''}>Hết hạn: {formatDate(code.expiresAt)}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(code.accessCode)}
                          className='flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors'
                        >
                          {copiedCode === code.accessCode ? (
                            <>
                              <Check className='w-4 h-4' />
                              <span>Đã copy</span>
                            </>
                          ) : (
                            <>
                              <Copy className='w-4 h-4' />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className='p-6 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex justify-end'>
                <button
                  onClick={onClose}
                  className='px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'
                >
                  Đóng
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
