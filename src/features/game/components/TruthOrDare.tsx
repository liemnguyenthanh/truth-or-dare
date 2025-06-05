import { motion } from 'framer-motion';

import { gtmEvents } from '@/shared/lib/gtm';

import { useGame } from '../hooks';
import { DareIcon, TruthIcon } from '../../../shared/components/icons';

export function TruthOrDare() {
  const { selectType } = useGame();

  const handleSelectType = (type: 'truth' | 'dare') => {
    gtmEvents.questionViewed(type);
    selectType(type);
  };

  return (
    <div className='w-full max-w-md mx-auto text-center'>
      <div className='flex flex-col md:flex-row gap-8 justify-center'>
        <motion.button
          onClick={() => handleSelectType('truth')}
          className='px-8 py-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl text-xl font-bold flex-1 flex flex-col items-center justify-center gap-4'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className='relative w-24 h-24 mb-2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full'>
            <TruthIcon />
          </div>
          THẬT
        </motion.button>

        <motion.button
          onClick={() => handleSelectType('dare')}
          className='px-8 py-6 rounded-xl bg-gray-900 from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl text-xl font-bold flex-1 flex flex-col items-center justify-center gap-4'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className='relative w-24 h-24 mb-2 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full'>
            <DareIcon />
          </div>
          THÁCH
        </motion.button>
      </div>
    </div>
  );
}
