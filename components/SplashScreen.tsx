'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SoundManager from '@/components/SoundManager';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Tampilkan konten setelah sedikit delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Auto close setelah 3 detik
    const autoClose = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoClose);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-cyan-500"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sound untuk splash */}
        <SoundManager src="/assets/sound/Opening.mp3" loop={false} volume={0.6} autoPlay={true} />
        {/* Si Lala Character */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          className="relative"
        >
          <Image
            src="/assets/karakter/lala.png"
            alt="Si Lala"
            width={200}
            height={200}
            priority
            className="drop-shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
                style={{
                  fontFamily: 'var(--font-baloo)',
                  textShadow: `
                    3px 3px 0 #22c55e,
                    6px 6px 0 #22c55e,
                    9px 9px 0 #f97316,
                    0 4px 8px rgba(0,0,0,0.5)
                  `,
                  letterSpacing: '2px',
                }}
              >
                PETUALANGAN LINGKUNGAN SI LALA
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading dots */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

