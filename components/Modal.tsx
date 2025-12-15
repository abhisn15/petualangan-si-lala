'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl text-gray-400 hover:text-gray-600"
          aria-label="Tutup"
        >
          ×
        </button>
        <h2 className="mb-6 text-center text-3xl font-bold text-green-700">
          {title}
        </h2>
        <div className="max-h-[60vh] overflow-y-auto text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document.body level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}

