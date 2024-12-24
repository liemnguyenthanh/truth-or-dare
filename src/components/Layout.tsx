import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-2 py-4 sm:px-4 sm:py-8 max-w-3xl"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text mb-4 sm:mb-8"
        >
          Truth or Dare
        </motion.h1>
        <div className="backdrop-blur-sm bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-xl border border-white/10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}