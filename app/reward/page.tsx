'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { hasAllBadges, getBadges } from '@/lib/storage';

export default function RewardPage() {
  const router = useRouter();
  const [canAccess, setCanAccess] = useState(false);
  const [badges, setBadges] = useState({
    hutan: false,
    taman: false,
    pantai: false,
  });

  useEffect(() => {
    const allBadges = hasAllBadges();
    const badgeData = getBadges();
    setCanAccess(allBadges);
    setBadges(badgeData);

    if (!allBadges) {
      setTimeout(() => {
        router.push('/menu');
      }, 2000);
    }
  }, [router]);

  if (!canAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-cyan-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Kamu belum mengumpulkan semua lencana!
          </h1>
          <p className="text-xl text-gray-600">Mengarahkan ke menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 p-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-8 text-6xl font-bold text-green-800 md:text-7xl">
          Kamu Luar Biasa!
        </h1>

        <p className="mb-12 text-2xl text-gray-700">
          Selamat! Kamu telah mengumpulkan semua lencana!
        </p>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-green-400 to-green-700 p-8 shadow-2xl">
            <div className="mb-4 text-6xl">🌲</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Pahlawan Hutan</h3>
            <div className="text-4xl">✓</div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-400 to-blue-700 p-8 shadow-2xl">
            <div className="mb-4 text-6xl">🏞️</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Penjaga Taman</h3>
            <div className="text-4xl">✓</div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-cyan-400 to-cyan-700 p-8 shadow-2xl">
            <div className="mb-4 text-6xl">🌊</div>
            <h3 className="mb-2 text-2xl font-bold text-white">Sahabat Laut</h3>
            <div className="text-4xl">✓</div>
          </div>
        </div>

        <Button onClick={() => router.push('/menu')} variant="primary">
          KEMBALI KE MENU
        </Button>
      </div>
    </div>
  );
}

