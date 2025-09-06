import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ show, message }) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && notificationRef.current) {
      // Focus the notification for screen readers
      notificationRef.current.focus();
    }
  }, [show]);

  return (
    <div 
      className={`fixed top-20 left-4 right-4 z-50 transition-all duration-300 ${
        show ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div 
        ref={notificationRef}
        role="alert"
        tabIndex={-1}
        className="bg-green-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
      >
        <Check className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
        <span className="flex-1">{message}</span>
      </div>
    </div>
  );
};