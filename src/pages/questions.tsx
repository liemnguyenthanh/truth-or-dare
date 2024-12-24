import Notification from '@/components/Notification';
import QuestionForm from '@/components/QuestionForm';
import QuestionTabs from '@/components/QuestionTabs';
import { useNotification } from '@/hooks/useNotification';
import { useQuestions } from '@/hooks/useQuestions';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Questions() {
  const router = useRouter();
  const { questions, loading, error, addQuestion, removeQuestion } = useQuestions();
  const { notification, showNotification, hideNotification } = useNotification();

  const handleAddQuestion = async (question: string, type: 'truth' | 'dare') => {
    try {
      await addQuestion({ question, type });
      showNotification('Question added successfully!', 'success');
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : 'Failed to add question',
        'error'
      );
    }
  };

  const handleRemoveQuestion = async (id: string) => {
    try {
      await removeQuestion(id);
      showNotification('Question removed successfully!', 'success');
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : 'Failed to remove question',
        'error'
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-purple-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-400 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <h3 className="font-semibold mb-2">Error loading questions</h3>
          <p>{error.message}</p>
          {error.details && <p className="mt-2 text-sm">{error.details}</p>}
          {error.hint && <p className="mt-2 text-sm italic">{error.hint}</p>}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
          />
        )}

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="p-2 text-purple-400 hover:bg-purple-500/10 rounded-lg"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </motion.button>
          <h2 className="text-xl font-bold text-purple-400">Manage Questions</h2>
        </div>

        <QuestionForm onSubmit={handleAddQuestion} />
        <QuestionTabs questions={questions} onRemove={handleRemoveQuestion} />
      </div>
    </Layout>
  );
}