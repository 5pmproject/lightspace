import { useState } from 'react';

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return {
    showNotification,
    notificationMessage,
    showNotificationMessage
  };
};