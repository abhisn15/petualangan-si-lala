export interface Badges {
  hutan: boolean;
  taman: boolean;
  pantai: boolean;
}

export interface Hotspot {
  id: string;
  title: string;
  body: string;
  x: number; // percentage
  y: number; // percentage
  w: number; // percentage
  h: number; // percentage
}

export interface Environment {
  id: 'hutan' | 'taman' | 'pantai';
  title: string;
  badgeName: string;
  hotspots: Hotspot[];
}

export type EnvironmentId = 'hutan' | 'taman' | 'pantai';

