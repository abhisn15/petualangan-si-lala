// Tipe data untuk hewan dalam permainan memori
export interface Animal {
  id: string;
  name: string;
  x: number; // posisi X dalam persen
  y: number; // posisi Y dalam persen
  width: number; // lebar area klik dalam persen
  height: number; // tinggi area klik dalam persen
  visiblePercent: number; // persentase hewan yang terlihat (0-100)
  hint?: string; // petunjuk untuk anak-anak
}

// Skenario permainan memori
export interface MemoryScenario {
  id: string;
  animals: Animal[];
  backgroundImage?: string; // optional custom background
}

// Data skenario hewan hutan
export const forestMemoryScenarios: MemoryScenario[] = [
  {
    id: 'scenario-1',
    animals: [
      {
        id: 'singa',
        name: 'Singa',
        x: 15,
        y: 35,
        width: 18,
        height: 22,
        visiblePercent: 40, // sebagian tertutup daun
        hint: 'Ada singa yang bersembunyi di balik daun!',
      },
      {
        id: 'badak',
        name: 'Badak',
        x: 50,
        y: 50,
        width: 20,
        height: 25,
        visiblePercent: 70, // sebagian tertutup rumput
        hint: 'Badak besar ada di tengah!',
      },
      {
        id: 'gorila',
        name: 'Gorila',
        x: 75,
        y: 30,
        width: 18,
        height: 25,
        visiblePercent: 50, // sebagian tertutup daun
        hint: 'Gorila bersembunyi di pohon!',
      },
      {
        id: 'toucan',
        name: 'Toucan',
        x: 25,
        y: 15,
        width: 12,
        height: 15,
        visiblePercent: 80,
        hint: 'Burung toucan di atas pohon!',
      },
      {
        id: 'burung-beo',
        name: 'Burung Beo',
        x: 80,
        y: 20,
        width: 10,
        height: 12,
        visiblePercent: 85,
        hint: 'Burung beo warna-warni!',
      },
    ],
  },
  {
    id: 'scenario-2',
    animals: [
      {
        id: 'gajah',
        name: 'Gajah',
        x: 20,
        y: 45,
        width: 22,
        height: 28,
        visiblePercent: 60,
        hint: 'Gajah besar ada di sana!',
      },
      {
        id: 'zebra',
        name: 'Zebra',
        x: 60,
        y: 55,
        width: 18,
        height: 20,
        visiblePercent: 45,
        hint: 'Zebra dengan garis-garis!',
      },
      {
        id: 'jerapah',
        name: 'Jerapah',
        x: 40,
        y: 20,
        width: 15,
        height: 35,
        visiblePercent: 70,
        hint: 'Jerapah leher panjang!',
      },
    ],
  },
  {
    id: 'scenario-3',
    animals: [
      {
        id: 'harimau',
        name: 'Harimau',
        x: 30,
        y: 40,
        width: 20,
        height: 24,
        visiblePercent: 50,
        hint: 'Harimau dengan garis-garis!',
      },
      {
        id: 'kuda-nil',
        name: 'Kuda Nil',
        x: 65,
        y: 60,
        width: 22,
        height: 20,
        visiblePercent: 55,
        hint: 'Kuda nil di air!',
      },
      {
        id: 'monyet',
        name: 'Monyet',
        x: 15,
        y: 25,
        width: 14,
        height: 18,
        visiblePercent: 75,
        hint: 'Monyet di pohon!',
      },
      {
        id: 'burung-hantu',
        name: 'Burung Hantu',
        x: 85,
        y: 15,
        width: 10,
        height: 12,
        visiblePercent: 80,
        hint: 'Burung hantu di malam hari!',
      },
    ],
  },
  {
    id: 'scenario-4',
    animals: [
      {
        id: 'beruang',
        name: 'Beruang',
        x: 25,
        y: 50,
        width: 20,
        height: 22,
        visiblePercent: 60,
        hint: 'Beruang coklat besar!',
      },
      {
        id: 'rusa',
        name: 'Rusa',
        x: 70,
        y: 45,
        width: 16,
        height: 20,
        visiblePercent: 65,
        hint: 'Rusa dengan tanduk!',
      },
      {
        id: 'kelinci',
        name: 'Kelinci',
        x: 50,
        y: 70,
        width: 10,
        height: 12,
        visiblePercent: 70,
        hint: 'Kelinci kecil lucu!',
      },
    ],
  },
  {
    id: 'scenario-5',
    animals: [
      {
        id: 'kanguru',
        name: 'Kanguru',
        x: 35,
        y: 50,
        width: 18,
        height: 24,
        visiblePercent: 70,
        hint: 'Kanguru dengan kantong!',
      },
      {
        id: 'koala',
        name: 'Koala',
        x: 20,
        y: 30,
        width: 12,
        height: 15,
        visiblePercent: 75,
        hint: 'Koala di pohon eucalyptus!',
      },
      {
        id: 'burung-kakaktua',
        name: 'Burung Kakaktua',
        x: 75,
        y: 25,
        width: 11,
        height: 13,
        visiblePercent: 85,
        hint: 'Burung kakaktua putih!',
      },
      {
        id: 'kadal',
        name: 'Kadal',
        x: 55,
        y: 65,
        width: 8,
        height: 10,
        visiblePercent: 60,
        hint: 'Kadal kecil di batu!',
      },
    ],
  },
];

// Fungsi untuk mendapatkan skenario random
export function getRandomScenario(): MemoryScenario {
  const randomIndex = Math.floor(Math.random() * forestMemoryScenarios.length);
  return forestMemoryScenarios[randomIndex];
}

// Fungsi untuk mendapatkan skenario berdasarkan ID
export function getScenarioById(id: string): MemoryScenario | undefined {
  return forestMemoryScenarios.find((scenario) => scenario.id === id);
}

