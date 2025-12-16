'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { stopAllSounds } from '@/components/SoundManager';
import { stopRewardSound } from '@/lib/soundEffects';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  // Stop semua sounds saat pathname berubah (navigate ke halaman lain)
  useEffect(() => {
    // Hanya stop jika pathname benar-benar berubah (bukan initial mount)
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      // Stop reward sound jika keluar dari halaman reward
      if (prevPathnameRef.current === '/reward') {
        stopRewardSound();
      }
      
      // Stop semua sounds dengan delay kecil untuk memastikan component baru sudah mount
      const timer = setTimeout(() => {
        stopAllSounds();
      }, 50);

      return () => {
        clearTimeout(timer);
      };
    }
    
    // Update prevPathname
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return <>{children}</>;
}
