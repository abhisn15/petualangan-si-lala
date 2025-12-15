'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { getEnvironment } from '@/lib/content';
import { Hotspot } from '@/lib/types';

export default function TamanPage() {
  const router = useRouter();
  const environment = getEnvironment('taman');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  if (!environment) {
    return <div>Environment not found</div>;
  }

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/bg/taman.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      </div>

      <div className="relative z-10 min-h-screen p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-5xl font-bold text-white drop-shadow-lg md:text-6xl">
            {environment.title}
          </h1>
          <p className="mb-8 text-center text-2xl text-white drop-shadow-md">
            Ketuk objek untuk melihat penjelasan
          </p>

          <div className="relative mx-auto aspect-video w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-sm">
            {environment.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="absolute rounded-lg border-2 border-yellow-400 bg-yellow-400/20 transition-all hover:bg-yellow-400/40"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${hotspot.w}%`,
                  height: `${hotspot.h}%`,
                }}
                onClick={() => handleHotspotClick(hotspot)}
                aria-label={hotspot.title}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => router.push('/taman/game')}
              variant="primary"
            >
              MULAI TANTANGAN
            </Button>
            <Button onClick={() => router.push('/menu')} variant="secondary">
              Home
            </Button>
          </div>
        </div>
      </div>

      {selectedHotspot && (
        <Modal
          isOpen={!!selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          title={selectedHotspot.title}
        >
          {selectedHotspot.body}
        </Modal>
      )}
    </div>
  );
}

