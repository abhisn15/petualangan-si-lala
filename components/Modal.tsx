'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SiLala from '@/app/components/SiLala';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-yellow-50 via-white to-green-50 p-8 shadow-2xl border-4 border-green-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Si Lala in corner */}
            <motion.div
              className="absolute -top-8 -right-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <SiLala size={80} animate={false} />
            </motion.div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-4xl text-gray-400 hover:text-red-500 transition-colors font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-100"
              aria-label="Tutup"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              ×
            </button>
            <h2
              className="mb-6 text-center text-3xl md:text-4xl font-bold text-green-700"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              {title} 📚
            </h2>
            <div
              className="max-h-[60vh] overflow-y-auto text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

