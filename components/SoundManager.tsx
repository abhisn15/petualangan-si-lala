'use client';

import { useEffect, useRef } from 'react';

interface SoundManagerProps {
  src: string;
  loop?: boolean;
  volume?: number;
  autoPlay?: boolean;
  playOnInteraction?: boolean;
  soundKey?: string; // Unique key untuk prevent duplicate instances (bukan 'key' karena itu prop khusus React)
}

// Global sound registry untuk mencegah multiple instances dan track semua sounds
const soundRegistry = new Map<string, HTMLAudioElement>();
let currentPlayingKey: string | null = null;

// Function untuk stop semua sounds kecuali yang diizinkan
export function stopAllSounds(exceptKey?: string) {
  soundRegistry.forEach((audio, key) => {
    if (key !== exceptKey) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (error) {
        console.log('Error stopping sound:', error);
      }
    }
  });
  if (!exceptKey) {
    currentPlayingKey = null;
  }
}

export default function SoundManager({ 
  src, 
  loop = true, 
  volume = 0.5,
  autoPlay = true,
  playOnInteraction = true,
  soundKey
}: SoundManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedPlayRef = useRef(false);
  const isMountedRef = useRef(true);
  const uniqueKey = soundKey || src;

  useEffect(() => {
    if (!src || typeof window === 'undefined') return;

    isMountedRef.current = true;

    // Stop semua sounds lain sebelum memulai yang baru
    stopAllSounds(uniqueKey);

    // Hapus instance lama jika ada dengan key yang sama
    const existingAudio = soundRegistry.get(uniqueKey);
    if (existingAudio) {
      try {
        existingAudio.pause();
        existingAudio.currentTime = 0;
        existingAudio.src = '';
        soundRegistry.delete(uniqueKey);
      } catch (error) {
        console.log('SoundManager: Error cleaning up existing audio:', error);
      }
    }

    // Create audio element
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.preload = 'auto';
    
    // Error handling
    audio.addEventListener('error', (e) => {
      console.error('SoundManager: Audio error:', e);
      if (audioRef.current) {
        audioRef.current = null;
      }
      if (currentPlayingKey === uniqueKey) {
        currentPlayingKey = null;
      }
    });

    // Handle audio ended (untuk non-loop)
    audio.addEventListener('ended', () => {
      if (!loop && audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      if (currentPlayingKey === uniqueKey) {
        currentPlayingKey = null;
      }
    });

    audioRef.current = audio;
    soundRegistry.set(uniqueKey, audio);

    // Function untuk play audio
    const playAudio = async () => {
      if (!audioRef.current || !isMountedRef.current) {
        return;
      }
      
      // Pastikan tidak ada sound lain yang sedang play
      if (currentPlayingKey && currentPlayingKey !== uniqueKey) {
        stopAllSounds(uniqueKey);
      }
      
      if (hasTriedPlayRef.current) {
        return;
      }
      
      hasTriedPlayRef.current = true;
      
      try {
        await audioRef.current.play();
        console.log('SoundManager: Audio playing successfully', src);
        currentPlayingKey = uniqueKey;
      } catch (error: any) {
        console.log('SoundManager: Audio play prevented:', error?.message || error);
        hasTriedPlayRef.current = false; // Reset jika gagal
        
        // Jika autoplay gagal, coba lagi setelah user interaction
        if (playOnInteraction && error?.name !== 'AbortError') {
          const handleInteraction = () => {
            if (audioRef.current && isMountedRef.current && !hasTriedPlayRef.current) {
              playAudio();
            }
          };

          document.addEventListener('click', handleInteraction, { once: true });
          document.addEventListener('touchstart', handleInteraction, { once: true });
          document.addEventListener('keydown', handleInteraction, { once: true });
        }
      }
    };

    // Auto play jika diizinkan
    if (autoPlay) {
      // Delay sedikit untuk memastikan audio element siap dan stop sounds lain dulu
      const playTimer = setTimeout(() => {
        if (isMountedRef.current) {
          playAudio();
        }
      }, 300); // Delay lebih lama untuk memastikan sounds lain sudah stop

      return () => {
        clearTimeout(playTimer);
      };
    }

    // Jika playOnInteraction true tapi autoPlay false
    if (playOnInteraction && !autoPlay) {
      const handleInteraction = () => {
        if (audioRef.current && isMountedRef.current && !hasTriedPlayRef.current) {
          playAudio();
        }
      };

      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
      };
    }

    // Cleanup function - PASTIKAN sound berhenti saat unmount
    return () => {
      isMountedRef.current = false;
      
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.src = '';
          audioRef.current.load(); // Reset audio element
        } catch (error) {
          console.log('SoundManager: Error during cleanup:', error);
        }
        
        // Hapus dari registry
        if (soundRegistry.get(uniqueKey) === audioRef.current) {
          soundRegistry.delete(uniqueKey);
        }
        
        if (currentPlayingKey === uniqueKey) {
          currentPlayingKey = null;
        }
        
        audioRef.current = null;
      }
      
      hasTriedPlayRef.current = false;
    };
  }, [src, loop, volume, autoPlay, playOnInteraction, uniqueKey]);

  // Update volume saat berubah
  useEffect(() => {
    if (audioRef.current && isMountedRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, [volume]);

  // Update loop saat berubah
  useEffect(() => {
    if (audioRef.current && isMountedRef.current) {
      audioRef.current.loop = loop;
    }
  }, [loop]);

  return null; // Component tidak render apapun
}
