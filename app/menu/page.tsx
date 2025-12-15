'use client';

import { useState } from 'react';
import CardEnv from '@/components/CardEnv';
import Button from '@/components/Button';
import { resetBadges } from '@/lib/storage';
import Toast from '@/components/Toast';

export default function MenuPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleReset = () => {
    if (
      confirm(
        'Yakin ingin mereset semua progress? Semua lencana yang sudah didapat akan hilang!'
      )
    ) {
      resetBadges();
      setToastMessage('Progress berhasil direset! 🔄');
      setShowToast(true);
      // Reload page untuk update badge status
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-5xl font-bold text-green-800 md:text-6xl">
          Pilih Lingkungan
        </h1>

        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <CardEnv id="hutan" title="Hutan" badgeName="Pahlawan Hutan" />
          <CardEnv id="taman" title="Taman Kota" badgeName="Penjaga Taman" />
          <CardEnv id="pantai" title="Pantai" badgeName="Sahabat Laut" />
        </div>

        <div className="flex flex-col gap-4 text-center sm:flex-row sm:justify-center">
          <Button href="/reward" variant="secondary">
            Lihat Reward
          </Button>
          <Button onClick={handleReset} variant="danger">
            Reset Progress
          </Button>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={2000}
      />
    </div>
  );
}

