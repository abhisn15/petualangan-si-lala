'use client';

import Link from 'next/link';
import { EnvironmentId } from '@/lib/types';
import { getBadges } from '@/lib/storage';
import { useEffect, useState } from 'react';

interface CardEnvProps {
  id: EnvironmentId;
  title: string;
  badgeName: string;
}

export default function CardEnv({ id, title, badgeName }: CardEnvProps) {
  const [badgeStatus, setBadgeStatus] = useState<'LOCK' | 'DONE'>(() => {
    if (typeof window !== 'undefined') {
      const badges = getBadges();
      return badges[id] ? 'DONE' : 'LOCK';
    }
    return 'LOCK';
  });

  useEffect(() => {
    const updateBadgeStatus = () => {
      const badges = getBadges();
      setBadgeStatus(badges[id] ? 'DONE' : 'LOCK');
    };

    updateBadgeStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateBadgeStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check on focus (in case badge was updated in another tab)
    window.addEventListener('focus', updateBadgeStatus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', updateBadgeStatus);
    };
  }, [id]);

  const getBgColor = () => {
    switch (id) {
      case 'hutan':
        return 'bg-gradient-to-br from-green-400 to-green-700';
      case 'taman':
        return 'bg-gradient-to-br from-blue-400 to-blue-700';
      case 'pantai':
        return 'bg-gradient-to-br from-cyan-400 to-cyan-700';
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-700';
    }
  };

  return (
    <Link href={`/${id}`} className="block">
      <div
        className={`relative h-64 w-full rounded-3xl ${getBgColor()} p-6 shadow-xl transition-transform hover:scale-105`}
      >
        <h3 className="mb-2 text-3xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-lg text-white/90">{badgeName}</p>
        <div className="absolute bottom-6 right-6">
          <div
            className={`rounded-full px-6 py-2 text-lg font-bold ${
              badgeStatus === 'DONE'
                ? 'bg-yellow-400 text-yellow-900'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {badgeStatus === 'DONE' ? '✓ DONE' : '🔒 LOCK'}
          </div>
        </div>
      </div>
    </Link>
  );
}

