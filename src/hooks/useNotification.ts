import { useState, useCallback } from 'react';
import { NotificationType } from '@/components/Notification';

interface NotificationState {
  message: string;
  type: NotificationType;
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    setNotification({ message, type });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
}