'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white animate-bounce',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`rounded-2xl px-8 py-4 text-xl font-bold shadow-2xl ${typeClasses[type]} transition-all`}
      >
        <div className="flex items-center gap-2">
          {type === 'success' && <span className="text-2xl">🎉</span>}
          {type === 'error' && <span className="text-2xl">⚠️</span>}
          {type === 'info' && <span className="text-2xl">ℹ️</span>}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

