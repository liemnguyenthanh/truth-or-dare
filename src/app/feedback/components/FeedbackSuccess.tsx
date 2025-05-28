'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Heart, Share2, Star } from 'lucide-react';
import Link from 'next/link';

interface FeedbackSuccessProps {
  feedbackType?: string;
  showShareButtons?: boolean;
  onReset?: () => void;
}

export default function FeedbackSuccess({
  feedbackType = 'general',
  showShareButtons = true,
  onReset,
}: FeedbackSuccessProps) {
  const getSuccessMessage = () => {
    switch (feedbackType) {
      case 'bug':
        return {
          title: 'Cảm ơn bạn đã báo cáo!',
          description: 'Chúng tôi sẽ xem xét và khắc phục lỗi sớm nhất có thể.',
          icon: CheckCircle,
          color: 'red',
        };
      case 'feature':
        return {
          title: 'Ý tưởng tuyệt vời!',
          description:
            'Chúng tôi sẽ cân nhắc thêm tính năng này vào phiên bản tiếp theo.',
          icon: Star,
          color: 'blue',
        };
      case 'rating':
        return {
          title: 'Cảm ơn đánh giá!',
          description:
            'Phản hồi của bạn giúp chúng tôi cải thiện sản phẩm tốt hơn.',
          icon: Heart,
          color: 'yellow',
        };
      default:
        return {
          title: 'Cảm ơn góp ý!',
          description: 'Ý kiến của bạn rất quan trọng với chúng tôi.',
          icon: CheckCircle,
          color: 'green',
        };
    }
  };

  const {
    title,
    description,
    icon: IconComponent,
    color,
  } = getSuccessMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className='max-w-md mx-auto text-center'
    >
      {/* Success Icon with Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}
      >
        <IconComponent
          className={`w-8 h-8 text-${color}-600 dark:text-${color}-400`}
        />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='mb-8'
      >
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
          {title}
        </h2>
        <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
          {description}
        </p>
      </motion.div>

      {/* Floating Particles Animation */}
      <div className='relative mb-8'>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -30, -60],
              x: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className='absolute top-0 left-1/2 transform -translate-x-1/2'
          >
            <span className='text-2xl'>✨</span>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='space-y-4'
      >
        {/* Primary Actions */}
        <div className='flex flex-col sm:flex-row gap-3'>
          {onReset && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReset}
              className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2'
            >
              <span>Gửi góp ý khác</span>
              <ArrowRight className='w-4 h-4' />
            </motion.button>
          )}

          <Link href='/' className='flex-1'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              Về trang chủ
            </motion.button>
          </Link>
        </div>

        {/* Share Section */}
        {showShareButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='pt-6 border-t border-gray-200 dark:border-gray-700'
          >
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              Thích Truth or Dare? Chia sẻ với bạn bè!
            </p>
            <div className='flex justify-center space-x-3'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors'
                title='Chia sẻ lên Facebook'
              >
                <Share2 className='w-4 h-4' />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors'
                title='Chia sẻ lên WhatsApp'
              >
                <Share2 className='w-4 h-4' />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-colors'
                title='Sao chép link'
              >
                <Share2 className='w-4 h-4' />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='text-sm text-gray-500 dark:text-gray-400 space-y-2'
        >
          <p>✅ Góp ý của bạn đã được lưu thành công</p>
          <p>📧 Chúng tôi sẽ phản hồi qua email nếu cần thiết</p>
          <p>🚀 Cùng nhau xây dựng sản phẩm tốt hơn!</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
