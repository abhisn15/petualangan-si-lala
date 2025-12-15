'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Toast from '@/components/Toast';
import { updateBadge } from '@/lib/storage';

export default function TamanGamePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const steps = [
    {
      question: 'Pilah sampah: Botol plastik termasuk sampah apa?',
      options: ['Organik', 'Anorganik', 'B3'],
      correct: 1,
    },
    {
      question: 'Pilah sampah: Sisa makanan termasuk sampah apa?',
      options: ['Organik', 'Anorganik', 'B3'],
      correct: 0,
    },
    {
      question: 'Pilah sampah: Baterai bekas termasuk sampah apa?',
      options: ['Organik', 'Anorganik', 'B3'],
      correct: 2,
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    const step = steps[currentStep];
    if (answerIndex === step.correct) {
      setToastMessage('Benar! ✓');
      setToastType('success');
      setShowToast(true);

      if (currentStep === steps.length - 1) {
        setTimeout(() => {
          updateBadge('taman', true);
          setToastMessage('Selamat! Kamu mendapatkan lencana "Penjaga Taman"!');
          setShowToast(true);
          setTimeout(() => {
            router.push('/menu');
          }, 2000);
        }, 1000);
      } else {
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setToastMessage('Salah, coba lagi!');
      setToastType('error');
      setShowToast(true);
    }
  };

  if (currentStep >= steps.length) {
    return null;
  }

  const step = steps[currentStep];

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      <div className="relative z-10 min-h-screen p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-5xl font-bold text-white drop-shadow-lg md:text-6xl">
            Game Taman
          </h1>
          <p className="mb-8 text-center text-2xl text-white drop-shadow-md">
            Pilah sampah dengan benar!
          </p>

          <div className="mb-8 text-center">
            <div className="inline-block rounded-2xl bg-white/90 px-8 py-4">
              <p className="text-3xl font-bold text-blue-700">
                Langkah {currentStep + 1}/3
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-2xl rounded-3xl bg-white/95 p-8 shadow-2xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              {step.question}
            </h2>
            <div className="flex flex-col gap-4">
              {step.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="rounded-2xl bg-blue-500 px-6 py-4 text-xl font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => router.push('/menu')} variant="secondary">
              Kembali ke Menu
            </Button>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

