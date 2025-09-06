import React from 'react';
import { Check } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ show, message }) => {
  return (
    <div className={`fixed top-20 left-4 right-4 z-50 transition-all duration-300 ${
      show ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
    }`}>
      <div className="bg-green-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
        <Check className="w-5 h-5 mr-2" />
        <span>{message}</span>
      </div>
    </div>
  );
};