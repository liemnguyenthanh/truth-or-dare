'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, X } from 'lucide-react';
import Image from 'next/image';

import { formatPaymentAmount } from '@/lib/config/payment';
import { CreateOrderResponse } from '@/types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: CreateOrderResponse | null;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  orderData,
  onPaymentSuccess: _onPaymentSuccess,
  onPaymentCancel,
}: PaymentModalProps) {
  const handleClose = () => {
    onPaymentCancel();
    onClose();
  };

  if (!orderData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2'
          style={{ zIndex: 99999 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto custom-scrollbar'
            style={
              {
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db transparent',
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center'>
                  <CreditCard className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                    Thanh toán
                  </h2>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Để tiếp tục chơi
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
            <div className='p-6 space-y-6'>
              {/* Amount */}
              <div className='text-center'>
                <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                  {formatPaymentAmount(orderData.amount)}
                </div>
                <p className='text-gray-500 dark:text-gray-400'>
                  Donate cho mị có động lực làm gem 🥺🥺
                </p>
              </div>

              {/* QR Code */}
              <div className='flex justify-center'>
                <div className='bg-white p-4 rounded-xl shadow-lg'>
                  <Image
                    src={orderData.qrUrl}
                    alt='QR Code'
                    width={192}
                    height={192}
                    className='w-48 h-48'
                    onError={() => {
                      // Fallback to placeholder if QR generation fails
                    }}
                  />
                </div>
              </div>

              {/* Access Code */}
              <div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Nội dung ck:
                  </span>
                  <div className='font-mono text-lg font-bold text-gray-900 dark:text-white tracking-wider'>
                    {`TOD${orderData.accessCode}`}
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className='bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800'>
                <h3 className='text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3'>
                  📝 Thông tin mã code:
                </h3>
                <ul className='space-y-2 text-xs text-purple-800 dark:text-purple-200'>
                  <li className='flex items-start gap-2'>
                    <span className='text-purple-600 dark:text-purple-400 mt-0.5'>
                      ⏰
                    </span>
                    <span>
                      <strong>Thời hạn:</strong>{' '}
                      {orderData.codeExpiresAt
                        ? new Date(orderData.codeExpiresAt).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : '30 ngày kể từ khi thanh toán'}
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-purple-600 dark:text-purple-400 mt-0.5'>
                      📱
                    </span>
                    <span>
                      <strong>Có thể sử dụng</strong> trên thiết bị khác
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-purple-600 dark:text-purple-400 mt-0.5'>
                      🎮
                    </span>
                    <span>
                      <strong>Dùng cho tất cả</strong> các mode game
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-purple-600 dark:text-purple-400 mt-0.5'>
                      💾
                    </span>
                    <span>
                      Mã code được <strong>tự động lưu</strong>, xem trong "Mã codes"
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className='p-6 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex justify-center'>
                <button
                  onClick={onPaymentCancel}
                  className='px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'
                >
                  Hủy và quay lại trang chủ
                </button>
              </div>
              {/* Auto-payment status indicator */}
              <div className='mt-3 text-center'>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  💡 Hệ thống sẽ tự động kiểm tra thanh toán
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
