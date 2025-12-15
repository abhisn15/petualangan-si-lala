// File konfigurasi posisi hewan di gambar hutan.png
// Koordinat dalam persentase (0-100) agar responsif
// Edit posisi ini sesuai dengan gambar hutan.png yang sebenarnya

export interface Animal {
  id: string;
  name: string;
  emoji: string;
  x: number; // posisi X dalam persen (0-100) - dari kiri
  y: number; // posisi Y dalam persen (0-100) - dari atas
  width: number; // lebar area klik dalam persen
  height: number; // tinggi area klik dalam persen
}

// Data posisi hewan - HANYA 5 HEWAN yang ada di gambar hutan.png
// Overlay dibuat LEBIH BESAR agar menutupi SELURUH badan termasuk muka
export const animals: Animal[] = [
  // 1. Singa - kiri bawah, overlay besar menutupi seluruh badan
  { id: 'singa', name: 'Singa', emoji: '🦁', x: 15, y: 68, width: 28, height: 36 },
  
  // 2. Toucan - kiri atas, overlay BESAR menutupi SELURUH tubuh termasuk muka dan paruh
  { id: 'toucan', name: 'Toucan', emoji: '🦜', x: 32, y: 18, width: 26, height: 28 },
  
  // 3. Badak - tengah, overlay besar menutupi seluruh badan
  { id: 'badak', name: 'Badak', emoji: '🦏', x: 50, y: 70, width: 36, height: 60 },
  
  // 4. Burung Beo - kanan atas, overlay BESAR menutupi SELURUH tubuh termasuk muka
  { id: 'burung-beo', name: 'Burung Beo', emoji: '🦜', x: 82, y: 40, width: 24, height: 26 },
  
  // 5. Gorila/Elephant - kanan bawah, overlay besar menutupi seluruh badan
  { id: 'gorila', name: 'Gorila', emoji: '🦍', x: 80, y: 75, width: 34, height: 38 },
];

// Helper function untuk mendapatkan hewan berdasarkan ID
export function getAnimalById(id: string): Animal | undefined {
  return animals.find((animal) => animal.id === id);
}

// Helper function untuk mendapatkan semua hewan
export function getAllAnimals(): Animal[] {
  return animals;
}

