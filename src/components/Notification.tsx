import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white flex items-center gap-2 z-50`}
      >
        {type === 'success' ? (
          <CheckCircleIcon className="w-5 h-5" />
        ) : (
          <XCircleIcon className="w-5 h-5" />
        )}
        <p>{message}</p>
      </motion.div>
    </AnimatePresence>
  );
}