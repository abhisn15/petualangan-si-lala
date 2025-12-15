'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Toast from '@/components/Toast';
import { updateBadge } from '@/lib/storage';

type WasteType = 'organik' | 'anorganik' | 'b3';

interface WasteItem {
  id: number;
  name: string;
  type: WasteType;
  emoji: string;
  x: number;
  y: number;
}

interface TrashBin {
  id: string;
  type: WasteType;
  label: string;
  emoji: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PantaiGamePage() {
  const router = useRouter();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [cleanedItems, setCleanedItems] = useState<Set<number>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const wasteItems: WasteItem[] = [
    { id: 1, name: 'Botol Plastik', type: 'anorganik', emoji: '🍶', x: 15, y: 45 },
    { id: 2, name: 'Kantong Plastik', type: 'anorganik', emoji: '🛍️', x: 40, y: 60 },
    { id: 3, name: 'Sedotan', type: 'anorganik', emoji: '🥤', x: 70, y: 50 },
    { id: 4, name: 'Sisa Makanan', type: 'organik', emoji: '🍌', x: 25, y: 35 },
    { id: 5, name: 'Daun Kering', type: 'organik', emoji: '🍃', x: 60, y: 40 },
    { id: 6, name: 'Baterai', type: 'b3', emoji: '🔋', x: 85, y: 30 },
  ];

  const trashBins: TrashBin[] = [
    {
      id: 'organik',
      type: 'organik',
      label: 'Organik',
      emoji: '🟢',
      x: 20,
      y: 80,
      width: 20,
      height: 15,
    },
    {
      id: 'anorganik',
      type: 'anorganik',
      label: 'Anorganik',
      emoji: '🔵',
      x: 50,
      y: 80,
      width: 20,
      height: 15,
    },
    {
      id: 'b3',
      type: 'b3',
      label: 'B3',
      emoji: '🔴',
      x: 80,
      y: 80,
      width: 15,
      height: 15,
    },
  ];

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    if (cleanedItems.has(itemId)) {
      e.preventDefault();
      return;
    }
    
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemId.toString());
    
    // Buat drag image yang lebih jelas
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
    e.dataTransfer.setDragImage(img, 25, 25);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, binType: WasteType) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const wasteItem = wasteItems.find((item) => item.id === draggedItem);
    if (!wasteItem) return;

    // Validasi apakah sampah sesuai dengan jenis tong sampah
    if (wasteItem.type === binType) {
      // Benar!
      setCleanedItems((prev) => new Set([...prev, draggedItem]));
      const newCount = cleanedItems.size + 1;
      
      const successMessages = [
        `Keren! ${wasteItem.name} sudah di tempat yang benar! 🎉`,
        `Hebat! ${wasteItem.name} sudah dibuang dengan benar! 🌟`,
        `Mantap! ${wasteItem.name} sudah di tong sampah yang tepat! ⭐`,
      ];
      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];
      
      setToastMessage(`${randomMessage} (${newCount}/${wasteItems.length})`);
      setToastType('success');
      setShowToast(true);

      // Cek apakah semua sampah sudah dibersihkan
      if (newCount === wasteItems.length) {
        setTimeout(() => {
          updateBadge('pantai', true);
          setToastMessage('Selamat! Kamu mendapatkan lencana "Sahabat Laut"! 🏆');
          setToastType('success');
          setShowToast(true);
          setTimeout(() => {
            router.push('/menu');
          }, 2000);
        }, 1000);
      }
    } else {
      // Salah!
      const binLabels: Record<WasteType, string> = {
        organik: 'Organik',
        anorganik: 'Anorganik',
        b3: 'B3',
      };
      
      setToastMessage(
        `❌ ${wasteItem.name} bukan sampah ${binLabels[binType]}! Coba lagi!`
      );
      setToastType('error');
      setShowToast(true);
    }

    setDraggedItem(null);
  };

  const cleanedCount = cleanedItems.size;

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/bg/pantai.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      <div className="relative z-10 min-h-screen p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-center text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
            Game Pantai
          </h1>
          <p className="mb-4 text-center text-xl text-white drop-shadow-md md:text-2xl">
            Seret sampah ke tong sampah yang sesuai!
          </p>

          <div className="mb-6 text-center">
            <div className="inline-block rounded-2xl bg-white/90 px-6 py-3">
              <p className="text-2xl font-bold text-cyan-700">
                {cleanedCount}/{wasteItems.length} Sampah Dibersihkan
              </p>
            </div>
          </div>

          {/* Game Area */}
          <div className="relative mx-auto aspect-video w-full max-w-5xl rounded-3xl bg-white/10 backdrop-blur-sm overflow-hidden">
            {/* Background pantai */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/assets/bg/pantai.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>

            {/* Sampah yang bisa di-drag */}
            {wasteItems.map((item) => {
              const isCleaned = cleanedItems.has(item.id);
              const isDragging = draggedItem === item.id;

              if (isCleaned) return null;

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  className={`absolute cursor-grab active:cursor-grabbing transition-all duration-200 ${
                    isDragging ? 'opacity-50 scale-110 z-50' : 'opacity-100 hover:scale-105 z-20'
                  } ${isCleaned ? 'opacity-0 pointer-events-none' : ''}`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="rounded-full bg-white/90 p-3 shadow-lg border-2 border-red-400">
                      <span className="text-4xl">{item.emoji}</span>
                    </div>
                    <span className="text-xs font-bold text-white drop-shadow-lg bg-black/50 px-2 py-1 rounded">
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Tong Sampah (Drop Zones) */}
            {trashBins.map((bin) => {
              const binItems = wasteItems.filter(
                (item) => cleanedItems.has(item.id) && item.type === bin.type
              );
              const isFull = binItems.length > 0;

              return (
                <div
                  key={bin.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, bin.type)}
                  className={`absolute border-4 rounded-2xl transition-all duration-300 ${
                    draggedItem
                      ? wasteItems.find((w) => w.id === draggedItem)?.type === bin.type
                        ? 'border-green-400 bg-green-500/30 scale-105'
                        : 'border-yellow-400 bg-yellow-500/20'
                      : 'border-gray-400 bg-gray-500/20'
                  } flex flex-col items-center justify-center backdrop-blur-sm`}
                  style={{
                    left: `${bin.x - bin.width / 2}%`,
                    top: `${bin.y - bin.height / 2}%`,
                    width: `${bin.width}%`,
                    height: `${bin.height}%`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-1">{bin.emoji}</div>
                    <div className="text-lg font-bold text-white drop-shadow-lg">
                      {bin.label}
                    </div>
                    {isFull && (
                      <div className="mt-1 text-xs text-white/80">
                        ({binItems.length} item)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Instruksi */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-500/90 rounded-lg px-4 py-2">
              <p className="text-sm font-semibold text-white text-center">
                💡 Seret sampah ke tong sampah yang sesuai jenisnya!
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 rounded-2xl bg-white/90 p-4">
            <p className="mb-2 text-center text-lg font-bold text-gray-800">
              Jenis Sampah:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟢</span>
                <span className="font-semibold">Organik: Sisa makanan, daun</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔵</span>
                <span className="font-semibold">Anorganik: Plastik, kaca</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔴</span>
                <span className="font-semibold">B3: Baterai, bahan berbahaya</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
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
        duration={2500}
      />
    </div>
  );
}
