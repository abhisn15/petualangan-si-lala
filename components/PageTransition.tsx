'use client';

import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  // Transisi zoom sudah ditangani di masing-masing halaman explore
  // Komponen ini hanya wrapper untuk konsistensi
  return <>{children}</>;
}

