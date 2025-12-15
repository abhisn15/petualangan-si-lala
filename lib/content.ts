import { Environment } from './types';

export const petunjukText = `
Cara Bermain:

1. Pilih salah satu lingkungan yang ingin kamu jelajahi (Hutan, Taman Kota, atau Pantai)
2. Ketuk objek-objek yang ada di lingkungan untuk melihat penjelasan
3. Setelah selesai menjelajahi, klik tombol "MULAI TANTANGAN" untuk bermain game
4. Selesaikan tantangan untuk mendapatkan lencana!

Aturan Game:

• Game Hutan: Temukan 3 target yang tersembunyi dengan mengklik area yang tepat
• Game Taman: Pilah sampah dengan benar dalam 3 langkah
• Game Pantai: Bersihkan 3 sampah plastik yang ada di pantai

Kumpulkan semua 3 lencana untuk membuka halaman Reward!
`;

export const tentangText = `
Petualangan Lingkungan Si Lala adalah aplikasi edukasi interaktif yang mengajak anak-anak untuk belajar tentang lingkungan melalui petualangan yang menyenangkan.

Jelajahi tiga lingkungan berbeda:
• Hutan - Pelajari tentang ekosistem hutan dan keanekaragaman hayati
• Taman Kota - Pahami pentingnya menjaga kebersihan dan memilah sampah
• Pantai - Ketahui dampak sampah plastik terhadap kehidupan laut

Setiap lingkungan memiliki tantangan unik yang harus diselesaikan untuk mendapatkan lencana. Kumpulkan semua lencana dan jadilah pahlawan lingkungan!
`;

export const environments: Environment[] = [
  {
    id: 'hutan',
    title: 'Hutan',
    badgeName: 'Pahlawan Hutan',
    hotspots: [
      {
        id: 'pohon1',
        title: 'Pohon Besar',
        body: 'Pohon ini adalah rumah bagi banyak hewan. Akarnya menahan tanah agar tidak longsor.',
        x: 20,
        y: 30,
        w: 15,
        h: 25,
      },
      {
        id: 'burung',
        title: 'Burung',
        body: 'Burung membantu menyebarkan biji-biji tanaman ke tempat lain. Mereka penting untuk ekosistem hutan.',
        x: 60,
        y: 15,
        w: 12,
        h: 15,
      },
      {
        id: 'jamur',
        title: 'Jamur',
        body: 'Jamur membantu mengurai daun-daun yang jatuh menjadi nutrisi untuk tanah.',
        x: 45,
        y: 70,
        w: 10,
        h: 12,
      },
    ],
  },
  {
    id: 'taman',
    title: 'Taman Kota',
    badgeName: 'Penjaga Taman',
    hotspots: [
      {
        id: 'tempat_sampah',
        title: 'Tempat Sampah',
        body: 'Tempat sampah membantu menjaga kebersihan taman. Pastikan sampah dibuang pada tempatnya.',
        x: 30,
        y: 50,
        w: 18,
        h: 20,
      },
      {
        id: 'tanaman',
        title: 'Tanaman Hias',
        body: 'Tanaman membuat udara lebih segar dan taman lebih indah. Rawatlah dengan baik!',
        x: 65,
        y: 40,
        w: 15,
        h: 18,
      },
      {
        id: 'bangku',
        title: 'Bangku Taman',
        body: 'Bangku ini terbuat dari bahan daur ulang. Daur ulang membantu mengurangi sampah.',
        x: 50,
        y: 65,
        w: 14,
        h: 16,
      },
    ],
  },
  {
    id: 'pantai',
    title: 'Pantai',
    badgeName: 'Sahabat Laut',
    hotspots: [
      {
        id: 'ombak',
        title: 'Ombak',
        body: 'Ombak membawa nutrisi penting untuk kehidupan laut. Tapi sampah plastik bisa merusak ekosistem.',
        x: 10,
        y: 20,
        w: 25,
        h: 15,
      },
      {
        id: 'karang',
        title: 'Terumbu Karang',
        body: 'Terumbu karang adalah rumah bagi banyak ikan. Sampah plastik bisa merusak terumbu karang.',
        x: 55,
        y: 60,
        w: 20,
        h: 18,
      },
      {
        id: 'kura',
        title: 'Kura-kura',
        body: 'Kura-kura laut sering mengira sampah plastik sebagai makanan. Ini sangat berbahaya bagi mereka.',
        x: 70,
        y: 35,
        w: 15,
        h: 12,
      },
    ],
  },
];

export function getEnvironment(id: 'hutan' | 'taman' | 'pantai'): Environment | undefined {
  return environments.find((env) => env.id === id);
}

