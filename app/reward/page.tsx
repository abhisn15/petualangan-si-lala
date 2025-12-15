'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import SiLala from '@/app/components/SiLala';
import { getBadges } from '@/lib/storage';
import { Badges } from '@/lib/types';

interface Badge {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export default function RewardPage() {
  const router = useRouter();
  const [badges, setBadges] = useState<Badges>({ hutan: false, taman: false, pantai: false });
  const [mounted, setMounted] = useState(false);

  const allBadges: Badge[] = [
    { id: 'hutan', name: 'Pahlawan Hutan', emoji: '🌳', color: 'from-green-400 to-green-600' },
    { id: 'taman', name: 'Penjaga Taman', emoji: '🌺', color: 'from-yellow-400 to-orange-500' },
    { id: 'pantai', name: 'Sahabat Laut', emoji: '🌊', color: 'from-cyan-400 to-blue-600' },
  ];

  useEffect(() => {
    setMounted(true);
    setBadges(getBadges());
  }, []);

  const earnedBadges = allBadges.filter(badge => badges[badge.id as keyof Badges]);
  const allComplete = earnedBadges.length === allBadges.length;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="text-6xl animate-bounce">🏆</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 md:p-8">
      {/* Confetti effect */}
      {allComplete && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear",
              }}
            >
              {['🎉', '⭐', '🏆', '🎊', '✨'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <SiLala size={120} animate={false} />
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            {allComplete ? 'Kamu Luar Biasa! 🎉' : 'Lencana Kamu'}
          </motion.h1>

          {allComplete && (
            <motion.p
              className="text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Kamu sudah menyelesaikan semua petualangan dan menjaga lingkungan!
            </motion.p>
          )}
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {allBadges.map((badge, index) => {
            const isEarned = badges[badge.id as keyof Badges];
            
            return (
              <motion.div
                key={badge.id}
                className={`relative rounded-3xl p-6 text-center ${
                  isEarned
                    ? `bg-gradient-to-br ${badge.color} shadow-2xl`
                    : 'bg-gray-400/50 grayscale'
                }`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.2,
                  type: "spring",
                }}
                whileHover={isEarned ? { scale: 1.05, rotate: 5 } : {}}
              >
                {/* Badge emoji */}
                <motion.div
                  className="text-7xl md:text-8xl mb-4"
                  animate={isEarned ? { y: [0, -10, 0] } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {badge.emoji}
                </motion.div>

                {/* Badge name */}
                <h3
                  className="text-xl md:text-2xl font-bold text-white drop-shadow-md mb-2"
                  style={{ fontFamily: 'var(--font-baloo)' }}
                >
                  {badge.name}
                </h3>

                {/* Status */}
                <div
                  className={`inline-block rounded-full px-4 py-2 ${
                    isEarned
                      ? 'bg-white/90 text-green-600'
                      : 'bg-black/30 text-white/70'
                  } font-bold`}
                  style={{ fontFamily: 'var(--font-baloo)' }}
                >
                  {isEarned ? '✓ Didapat!' : '🔒 Belum'}
                </div>

                {/* Shine effect for earned badges */}
                {isEarned && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress */}
        <motion.div
          className="bg-white/90 rounded-2xl p-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3
            className="text-xl font-bold text-gray-800 mb-4 text-center"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Progress Petualangan
          </h3>
          
          {/* Progress bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(earnedBadges.length / allBadges.length) * 100}%` }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
          
          <p
            className="text-center text-gray-600 font-semibold"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            {earnedBadges.length} dari {allBadges.length} lencana didapat
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          className="text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button onClick={() => router.push('/menu')} variant="primary">
            🏠 KEMBALI KE MENU
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
