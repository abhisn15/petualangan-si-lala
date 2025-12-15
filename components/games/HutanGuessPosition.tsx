'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { animals, type Animal } from '@/lib/animalPositions';
import { updateBadge } from '@/lib/storage';

interface ToastState {
  message: string;
  visible: boolean;
}

const TOTAL_ROUNDS = 5;

export default function HutanGuessPosition() {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [targetAnimal, setTargetAnimal] = useState<Animal | null>(null);
  const [targetOrder, setTargetOrder] = useState<string[]>([]);
  const [foundAnimals, setFoundAnimals] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });
  const [showComplete, setShowComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    const shuffled = [...animals]
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_ROUNDS)
      .map((a) => a.id);
    setTargetOrder(shuffled);
    if (shuffled.length > 0) {
      const firstTarget = animals.find((a) => a.id === shuffled[0]);
      setTargetAnimal(firstTarget || null);
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 2000);
  }, []);

  const handleOverlayClick = useCallback(
    (animalId: string) => {
      if (!targetAnimal || foundAnimals.has(animalId)) return;

      if (animalId === targetAnimal.id) {
        // Benar!
        setFoundAnimals((prev) => new Set([...prev, animalId]));
        const newScore = score + 1;
        setScore(newScore);
        showToast('✅ Keren!');

        // Cek apakah selesai
        if (currentRound === TOTAL_ROUNDS - 1) {
          setTimeout(() => {
            updateBadge('hutan', true);
            setShowComplete(true);
          }, 1000);
        } else {
          // Lanjut ke ronde berikutnya
          setTimeout(() => {
            const nextRound = currentRound + 1;
            setCurrentRound(nextRound);
            const nextTargetId = targetOrder[nextRound];
            const nextTarget = animals.find((a) => a.id === nextTargetId);
            setTargetAnimal(nextTarget || null);
          }, 1500);
        }
      } else {
        // Salah
        showToast('❌ Coba lagi');
      }
    },
    [targetAnimal, foundAnimals, score, currentRound, targetOrder, showToast]
  );

  if (!targetAnimal || targetOrder.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-4xl">🌳</div>
      </div>
    );
  }

  if (showComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🎉</div>
        <div className="text-2xl font-bold text-green-700 mb-8">Hebat!</div>
        <button
          onClick={() => router.push('/menu')}
          className="rounded-full bg-green-500 px-8 py-4 text-xl font-bold text-white shadow-lg hover:bg-green-600 transition-all"
        >
          LANJUT
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/bg/hutan.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      </div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="mx-auto max-w-5xl">
          {/* Header - Minim Teks */}
          <div className="mb-4 flex flex-col items-center gap-3">
            {/* Target Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 shadow-lg">
              <span className="text-2xl">{targetAnimal.emoji}</span>
              <span className="text-lg font-bold text-yellow-900">
                {targetAnimal.name}
              </span>
            </div>

            {/* Skor sebagai dot */}
            <div className="flex gap-2">
              {Array.from({ length: TOTAL_ROUNDS }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-2xl ${
                    idx < score ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  {idx < score ? '⭐' : '☆'}
                </span>
              ))}
            </div>

            {/* Progress dot kecil */}
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_ROUNDS }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx < score
                      ? 'bg-green-500'
                      : idx === currentRound
                        ? 'bg-yellow-400'
                        : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Game Area */}
          <div
            className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '16/9', maxHeight: '70vh' }}
          >
            {/* Background gambar */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/assets/bg/hutan.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Overlay semak untuk setiap hewan */}
            {animals.map((animal) => {
              const isFound = foundAnimals.has(animal.id);
              if (isFound) return null;

              return (
                <button
                  key={animal.id}
                  onClick={() => handleOverlayClick(animal.id)}
                  className="absolute rounded-xl transition-all hover:opacity-80 active:scale-95"
                  style={{
                    left: `${animal.x - animal.width / 2}%`,
                    top: `${animal.y - animal.height / 2}%`,
                    width: `${animal.width}%`,
                    height: `${animal.height}%`,
                  }}
                  aria-label={`Cari ${animal.name}`}
                >
                  {/* Overlay semak hijau */}
                  <div
                    className="h-full w-full rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(34, 139, 34, 0.85) 0%, rgba(0, 100, 0, 0.95) 100%)`,
                    }}
                  >
                    {/* Pattern daun */}
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5-5-10-10-10s-10 5-10 10 5 10 10 10 10-5 10-10zm10 0c0-5-5-10-10-10s-10 5-10 10 5 10 10 10 10-5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '20px 20px',
                      }}
                    />
                  </div>
                </button>
              );
            })}

            {/* Label kecil */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-500/90 rounded-lg px-3 py-1">
              <span className="text-xs font-semibold text-white">👇 klik semak</span>
            </div>
          </div>

          {/* Tombol Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/menu')}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow-md hover:bg-white transition-all"
              aria-label="Kembali ke menu"
            >
              <span className="text-lg">🏠</span>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
          <div className="rounded-full bg-green-500 px-6 py-3 text-xl font-bold text-white shadow-2xl">
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}

