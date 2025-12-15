import { Badges } from './types';

const STORAGE_KEY = 'plsl_badges_v1';

const defaultBadges: Badges = {
  hutan: false,
  taman: false,
  pantai: false,
};

export function getBadges(): Badges {
  if (typeof window === 'undefined') {
    return defaultBadges;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultBadges, ...parsed };
    }
  } catch (error) {
    console.error('Error reading badges from localStorage:', error);
  }

  return defaultBadges;
}

export function setBadges(badges: Badges): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(badges));
  } catch (error) {
    console.error('Error saving badges to localStorage:', error);
  }
}

export function updateBadge(environment: keyof Badges, completed: boolean): void {
  const badges = getBadges();
  badges[environment] = completed;
  setBadges(badges);
}

export function hasAllBadges(): boolean {
  const badges = getBadges();
  return badges.hutan && badges.taman && badges.pantai;
}

export function resetBadges(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Hapus key dari localStorage
    localStorage.removeItem(STORAGE_KEY);
    // Set ke default badges untuk memastikan state konsisten
    setBadges(defaultBadges);
    console.log('Badges reset successfully');
  } catch (error) {
    console.error('Error resetting badges from localStorage:', error);
    // Fallback: coba clear dan set ulang
    try {
      localStorage.removeItem(STORAGE_KEY);
      setBadges(defaultBadges);
    } catch (fallbackError) {
      console.error('Fallback reset also failed:', fallbackError);
    }
  }
}

export function clearAllStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.clear();
    console.log('All localStorage cleared!');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

