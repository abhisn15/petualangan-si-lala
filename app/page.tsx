'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { petunjukText, tentangText } from '@/lib/content';

export default function Home() {
  const router = useRouter();
  const [showPetunjuk, setShowPetunjuk] = useState(false);
  const [showTentang, setShowTentang] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-cyan-100 p-8"
      style={{
        backgroundImage: "url('/assets/bg/opening.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="mb-12 text-6xl font-bold text-green-800 drop-shadow-lg md:text-7xl">
          PETUALANGAN LINGKUNGAN SI LALA
        </h1>

        <div className="flex flex-col gap-6 md:flex-row md:justify-center">
          <Button onClick={() => router.push('/menu')} variant="primary">
            MULAI
          </Button>
          <Button onClick={() => setShowPetunjuk(true)} variant="secondary">
            PETUNJUK
          </Button>
          <Button onClick={() => setShowTentang(true)} variant="secondary">
            TENTANG
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showPetunjuk}
        onClose={() => setShowPetunjuk(false)}
        title="Petunjuk"
      >
        {petunjukText}
      </Modal>

      <Modal
        isOpen={showTentang}
        onClose={() => setShowTentang(false)}
        title="Tentang"
      >
        {tentangText}
      </Modal>
    </div>
  );
}
