'use client';

import { useEffect, useRef, useState } from 'react';

interface SoundManagerProps {
  src: string;
  loop?: boolean;
  volume?: number;
  autoPlay?: boolean;
}

export default function SoundManager({ 
  src, 
  loop = true, 
  volume = 0.5,
  autoPlay = true 
}: SoundManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;

    // Create audio element
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audioRef.current = audio;

    // Auto play jika diizinkan
    if (autoPlay) {
      // User interaction required untuk autoplay
      const playPromise = audio.play().catch((error) => {
        console.log('Audio autoplay prevented:', error);
      });
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        });
      }
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, loop, volume, autoPlay]);

  // Play/pause function (bisa dipanggil dari parent jika perlu)
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Expose untuk kontrol manual jika perlu
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return null; // Component tidak render apapun
}

