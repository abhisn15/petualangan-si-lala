'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { animals as defaultAnimals, type Animal } from '@/lib/animalPositions';

export default function CalibratePage() {
  const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>(defaultAnimals);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    e: React.MouseEvent,
    animal: Animal
  ) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setSelectedAnimal(animal.id);
    setDragging(true);
    setDragOffset({
      x: x - animal.x,
      y: y - animal.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !selectedAnimal || !gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === selectedAnimal
          ? {
              ...animal,
              x: Math.max(0, Math.min(100, x - dragOffset.x)),
              y: Math.max(0, Math.min(100, y - dragOffset.y)),
            }
          : animal
      )
    );
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleResize = (
    animalId: string,
    direction: 'width' | 'height',
    delta: number
  ) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === animalId
          ? {
              ...animal,
              [direction]: Math.max(5, Math.min(40, animal[direction] + delta)),
            }
          : animal
      )
    );
  };

  const copyToClipboard = () => {
    const code = `export const animals: Animal[] = [\n${animals
      .map(
        (a) =>
          `  { id: '${a.id}', name: '${a.name}', emoji: '${a.emoji}', x: ${a.x.toFixed(1)}, y: ${a.y.toFixed(1)}, width: ${a.width.toFixed(1)}, height: ${a.height.toFixed(1)} },`
      )
      .join('\n')}\n];`;
    navigator.clipboard.writeText(code);
    alert('Kode sudah di-copy! Paste ke lib/animalPositions.ts');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-baloo)' }}>🔧 Kalibrasi Posisi Hewan</h1>
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="primary">
              Copy Kode
            </Button>
            <Button onClick={() => router.push('/hutan/game')} variant="secondary">
              Test Game
            </Button>
            <Button onClick={() => router.push('/menu')} variant="secondary">
              Menu
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h2 className="mb-2 font-semibold" style={{ fontFamily: 'var(--font-baloo)' }}>Drag overlay untuk menyesuaikan posisi</h2>
              <div
                ref={gameAreaRef}
                className="relative w-full rounded-lg overflow-hidden shadow-inner"
                style={{ aspectRatio: '16/9' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Background gambar hutan */}
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
                  const isSelected = selectedAnimal === animal.id;
                  return (
                    <div
                      key={animal.id}
                      className={`absolute cursor-move transition-all ${
                        isSelected
                          ? 'ring-4 ring-yellow-400 ring-offset-2 z-20'
                          : 'z-10 hover:ring-2 hover:ring-blue-400'
                      }`}
                      style={{
                        left: `${animal.x - animal.width / 2}%`,
                        top: `${animal.y - animal.height / 2}%`,
                        width: `${animal.width}%`,
                        height: `${animal.height}%`,
                      }}
                      onMouseDown={(e) => handleMouseDown(e, animal)}
                    >
                      {/* Overlay semak */}
                      <div
                        className="h-full w-full rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, rgba(34, 139, 34, 0.85) 0%, rgba(0, 100, 0, 0.95) 100%)`,
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5-5-10-10-10s-10 5-10 10 5 10 10 10 10-5 10-10zm10 0c0-5-5-10-10-10s-10 5-10 10 5 10 10 10 10-5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '20px 20px',
                          }}
                        />
                      </div>

                      {/* Label */}
                      <div className="absolute -top-6 left-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap" style={{ fontFamily: 'var(--font-baloo)' }}>
                        {animal.emoji} {animal.name}
                      </div>

                      {/* Resize handles */}
                      {isSelected && (
                        <>
                          {/* Top */}
                          <div
                            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-ns-resize border-2 border-white"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const startY = e.clientY;
                              const startHeight = animal.height;
                              const handleMove = (moveEvent: MouseEvent) => {
                                const delta = ((moveEvent.clientY - startY) / gameAreaRef.current!.clientHeight) * 100;
                                handleResize(animal.id, 'height', -delta);
                              };
                              const handleUp = () => {
                                document.removeEventListener('mousemove', handleMove);
                                document.removeEventListener('mouseup', handleUp);
                              };
                              document.addEventListener('mousemove', handleMove);
                              document.addEventListener('mouseup', handleUp);
                            }}
                          />
                          {/* Bottom */}
                          <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-ns-resize border-2 border-white"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const startY = e.clientY;
                              const handleMove = (moveEvent: MouseEvent) => {
                                const delta = ((moveEvent.clientY - startY) / gameAreaRef.current!.clientHeight) * 100;
                                handleResize(animal.id, 'height', delta);
                              };
                              const handleUp = () => {
                                document.removeEventListener('mousemove', handleMove);
                                document.removeEventListener('mouseup', handleUp);
                              };
                              document.addEventListener('mousemove', handleMove);
                              document.addEventListener('mouseup', handleUp);
                            }}
                          />
                          {/* Left */}
                          <div
                            className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-ew-resize border-2 border-white"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const startX = e.clientX;
                              const handleMove = (moveEvent: MouseEvent) => {
                                const delta = ((moveEvent.clientX - startX) / gameAreaRef.current!.clientWidth) * 100;
                                handleResize(animal.id, 'width', -delta);
                              };
                              const handleUp = () => {
                                document.removeEventListener('mousemove', handleMove);
                                document.removeEventListener('mouseup', handleUp);
                              };
                              document.addEventListener('mousemove', handleMove);
                              document.addEventListener('mouseup', handleUp);
                            }}
                          />
                          {/* Right */}
                          <div
                            className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-ew-resize border-2 border-white"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const startX = e.clientX;
                              const handleMove = (moveEvent: MouseEvent) => {
                                const delta = ((moveEvent.clientX - startX) / gameAreaRef.current!.clientWidth) * 100;
                                handleResize(animal.id, 'width', delta);
                              };
                              const handleUp = () => {
                                document.removeEventListener('mousemove', handleMove);
                                document.removeEventListener('mouseup', handleUp);
                              };
                              document.addEventListener('mousemove', handleMove);
                              document.addEventListener('mouseup', handleUp);
                            }}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="font-bold mb-2" style={{ fontFamily: 'var(--font-baloo)' }}>Pilih Hewan</h3>
              <div className="space-y-2">
                {animals.map((animal) => (
                  <button
                    key={animal.id}
                    onClick={() => setSelectedAnimal(animal.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all ${
                      selectedAnimal === animal.id
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{animal.emoji}</span> {animal.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedAnimal && (
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <h3 className="font-bold mb-2" style={{ fontFamily: 'var(--font-baloo)' }}>
                  Edit: {animals.find((a) => a.id === selectedAnimal)?.name}
                </h3>
                {animals
                  .filter((a) => a.id === selectedAnimal)
                  .map((animal) => (
                    <div key={animal.id} className="space-y-3">
                      <div>
                        <label className="text-sm font-semibold block mb-1" style={{ fontFamily: 'var(--font-baloo)' }}>
                          X: {animal.x.toFixed(1)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.5"
                          value={animal.x}
                          onChange={(e) => {
                            setAnimals((prev) =>
                              prev.map((a) =>
                                a.id === animal.id
                                  ? { ...a, x: parseFloat(e.target.value) }
                                  : a
                              )
                            );
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold block mb-1" style={{ fontFamily: 'var(--font-baloo)' }}>
                          Y: {animal.y.toFixed(1)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.5"
                          value={animal.y}
                          onChange={(e) => {
                            setAnimals((prev) =>
                              prev.map((a) =>
                                a.id === animal.id
                                  ? { ...a, y: parseFloat(e.target.value) }
                                  : a
                              )
                            );
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold block mb-1" style={{ fontFamily: 'var(--font-baloo)' }}>
                          Width: {animal.width.toFixed(1)}%
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="30"
                          step="0.5"
                          value={animal.width}
                          onChange={(e) => {
                            setAnimals((prev) =>
                              prev.map((a) =>
                                a.id === animal.id
                                  ? { ...a, width: parseFloat(e.target.value) }
                                  : a
                              )
                            );
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold block mb-1" style={{ fontFamily: 'var(--font-baloo)' }}>
                          Height: {animal.height.toFixed(1)}%
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="40"
                          step="0.5"
                          value={animal.height}
                          onChange={(e) => {
                            setAnimals((prev) =>
                              prev.map((a) =>
                                a.id === animal.id
                                  ? { ...a, height: parseFloat(e.target.value) }
                                  : a
                              )
                            );
                          }}
                          className="w-full"
                        />
                      </div>
                      <div className="p-2 bg-gray-100 rounded text-xs break-all" style={{ fontFamily: 'var(--font-baloo)' }}>
                        {`x: ${animal.x.toFixed(1)}, y: ${animal.y.toFixed(1)}, width: ${animal.width.toFixed(1)}, height: ${animal.height.toFixed(1)}`}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

