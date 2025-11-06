'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Copy, Heart, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Thông tin tài khoản ngân hàng
const BANK_INFO = {
  accountNumber: '0866799105',
  bankName: 'MBBank',
  accountName: 'NGUYEN NGOC THAO VAN',
};

// Các mức amount có sẵn
const AMOUNT_OPTIONS = [5000, 10000, 15000, 20000] as const;

// Nội dung chuyển khoản
const TRANSFER_CONTENT = 'dem qua em tuyet lam';

// Generate QR code URL từ SePay API
function generateQRUrl(amount: number): string {
  const params = new URLSearchParams({
    acc: BANK_INFO.accountNumber,
    bank: BANK_INFO.bankName,
    amount: amount.toString(),
    des: TRANSFER_CONTENT,
    template: 'compact',
  });
  return `https://qr.sepay.vn/img?${params.toString()}`;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [showBankInfo, setShowBankInfo] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_INFO.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(TRANSFER_CONTENT);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      const numValue = parseInt(value.replace(/\D/g, ''), 10);
      if (!isNaN(numValue) && numValue > 0) {
        setSelectedAmount(numValue);
      }
    }
  };

  const currentAmount = customAmount
    ? parseInt(customAmount.replace(/\D/g, ''), 10) || selectedAmount
    : selectedAmount;

  const qrUrl = generateQRUrl(currentAmount);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full my-8 max-h-[90vh] flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Always Visible */}
            <div className='flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-t-3xl'>
              <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center'>
                    <Heart className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
                      Ủng hộ ứng dụng
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
                >
                  <X className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className='flex-1 overflow-y-auto'>
              <div className='p-4 sm:p-6 space-y-4'>
                {/* Amount Selection - Compact */}
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-2 text-center'>
                    Chọn số tiền ủng hộ
                  </p>
                  <div className='grid grid-cols-4 gap-2 mb-2'>
                    {AMOUNT_OPTIONS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-2.5 px-2 sm:px-3 rounded-xl font-semibold text-sm transition-all ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-gradient-to-br from-pink-500 to-red-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {amount >= 10000 ? `${amount / 1000}k` : `${amount}`}
                      </button>
                    ))}
                  </div>
                  <div className='relative'>
                    <input
                      type='text'
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder='Nhập số tiền khác...'
                      className='w-full px-4 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none'
                    />
                    {customAmount && (
                      <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 font-medium'>
                        ₫
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount Display */}
                <div className='text-center py-2'>
                  <motion.p
                    key={currentAmount}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent'
                  >
                    {currentAmount.toLocaleString('vi-VN')} ₫
                  </motion.p>
                </div>

                {/* QR Code - Center Stage */}
                <div className='flex flex-col items-center py-2'>
                  <div className='bg-white p-3 sm:p-4 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-800'>
                    <motion.div
                      key={qrUrl}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={qrUrl}
                        alt='QR Code chuyển khoản'
                        width={220}
                        height={220}
                        className='w-52 h-52 sm:w-56 sm:h-56'
                        unoptimized
                        priority
                      />
                    </motion.div>
                  </div>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-3'>
                    Quét mã để chuyển khoản
                  </p>
                </div>

                {/* Bank Info - Collapsible */}
                <div className='bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700'>
                  <button
                    onClick={() => setShowBankInfo(!showBankInfo)}
                    className='w-full p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                  >
                    <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                      Thông tin chuyển khoản
                    </span>
                    <motion.div
                      animate={{ rotate: showBankInfo ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showBankInfo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden'
                      >
                        <div className='px-4 pb-4 space-y-3'>
                          {/* Account Number */}
                          <div>
                            <label className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block'>
                              Số tài khoản
                            </label>
                            <div className='flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                              <span className='text-base font-mono font-bold text-gray-900 dark:text-white'>
                                {BANK_INFO.accountNumber}
                              </span>
                              <button
                                onClick={handleCopyAccount}
                                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                                title='Sao chép số tài khoản'
                              >
                                <Copy
                                  className={`w-4 h-4 ${
                                    copied
                                      ? 'text-green-500'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                />
                              </button>
                            </div>
                            {copied && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='text-xs text-green-500 mt-1.5 text-center'
                              >
                                ✓ Đã sao chép!
                              </motion.p>
                            )}
                          </div>

                          {/* Bank Name */}
                          <div>
                            <label className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block'>
                              Ngân hàng
                            </label>
                            <div className='bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                              <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                                {BANK_INFO.bankName}
                              </span>
                            </div>
                          </div>

                          {/* Account Name */}
                          {BANK_INFO.accountName && (
                            <div>
                              <label className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block'>
                                Chủ tài khoản
                              </label>
                              <div className='bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                                <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                                  {BANK_INFO.accountName}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Transfer Content */}
                          <div>
                            <label className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block'>
                              Nội dung chuyển khoản
                            </label>
                            <div className='flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
                              <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                                {TRANSFER_CONTENT}
                              </span>
                              <button
                                onClick={handleCopyContent}
                                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                                title='Sao chép nội dung'
                              >
                                <Copy
                                  className={`w-4 h-4 ${
                                    copiedContent
                                      ? 'text-green-500'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                />
                              </button>
                            </div>
                            {copiedContent && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='text-xs text-green-500 mt-1.5 text-center'
                              >
                                ✓ Đã sao chép!
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message - Compact */}
                <div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-900/30'>
                  <p className='text-xs text-blue-700 dark:text-blue-300 leading-relaxed'>
                    💡 <strong>Lưu ý:</strong> Ứng dụng hoàn toàn miễn phí. Việc
                    ủng hộ hoàn toàn tự nguyện.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer - Always Visible */}
            <div className='flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-3xl'>
              <div className='flex gap-3'>
                <button
                  onClick={onClose}
                  className='flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium py-2.5 px-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm'
                >
                  Tôi dong tinh
                </button>
                <button
                  onClick={onClose}
                  className='flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-3 rounded-xl transition-all duration-200 active:scale-95 text-sm'
                >
                  Tôi k dong tinh
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
