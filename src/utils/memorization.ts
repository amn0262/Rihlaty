import { MemorizationLog, BadgeItem } from '../types';
import { JUZ_AMMA_TOTAL_AYAHS, JUZ_AMMA_SURAHS_COUNT } from '../data/quranJuzAmma';

/**
 * Calculates unique memorized ayahs for a given surah.
 */
export function getMemorizedAyahsSetForSurah(surahId: number, logs: MemorizationLog[]): Set<number> {
  const ayahsSet = new Set<number>();
  for (const log of logs) {
    if (log.surahId === surahId) {
      const start = Math.min(log.fromAyah, log.toAyah);
      const end = Math.max(log.fromAyah, log.toAyah);
      for (let i = start; i <= end; i++) {
        ayahsSet.add(i);
      }
    }
  }
  return ayahsSet;
}

/**
 * Calculates total memorized ayahs across all surahs without double counting.
 */
export function calculateTotalMemorizedAyahs(logs: MemorizationLog[]): number {
  let total = 0;
  const surahsSeen = new Set<number>(logs.map(l => l.surahId));
  for (const surahId of surahsSeen) {
    total += getMemorizedAyahsSetForSurah(surahId, logs).size;
  }
  return total;
}

/**
 * Calculates the percentage of Juz Amma memorized (0 to 100).
 */
export function calculateJuzAmmaPercentage(totalMemorizedAyahs: number): number {
  if (totalMemorizedAyahs <= 0) return 0;
  const percentage = (totalMemorizedAyahs / JUZ_AMMA_TOTAL_AYAHS) * 100;
  return Math.min(100, Math.round(percentage));
}

/**
 * Determines which surahs are completely memorized.
 */
export function calculateCompletedSurahsCount(
  logs: MemorizationLog[],
  surahAyahCounts: Record<number, number>
): number {
  let completed = 0;
  for (const [surahIdStr, count] of Object.entries(surahAyahCounts)) {
    const surahId = Number(surahIdStr);
    const memorizedCount = getMemorizedAyahsSetForSurah(surahId, logs).size;
    if (memorizedCount >= count) {
      completed++;
    }
  }
  return completed;
}

/**
 * Evaluates which badges should be unlocked based on progress.
 */
export function evaluateBadgesStatus(
  currentBadges: BadgeItem[],
  totalMemorizedAyahs: number,
  completedSurahsCount: number
): { badges: BadgeItem[]; newlyUnlocked: BadgeItem[] } {
  const currentPercentage = calculateJuzAmmaPercentage(totalMemorizedAyahs);
  const newlyUnlocked: BadgeItem[] = [];

  const updatedBadges = currentBadges.map(badge => {
    if (badge.isUnlocked) {
      return badge;
    }

    let shouldUnlock = false;
    if (badge.category === 'surah' && completedSurahsCount >= badge.requiredTarget) {
      shouldUnlock = true;
    } else if (badge.category === 'percentage' && currentPercentage >= badge.requiredTarget) {
      shouldUnlock = true;
    } else if (badge.category === 'special' && currentPercentage >= 100) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      const unlockedBadge: BadgeItem = {
        ...badge,
        isUnlocked: true,
        unlockedDate: todayStr
      };
      newlyUnlocked.push(unlockedBadge);
      return unlockedBadge;
    }

    return badge;
  });

  return { badges: updatedBadges, newlyUnlocked };
}

/**
 * Formats numbers into clean localized Arabic numerals or standard numerals with suffixes
 */
export function formatAyahRange(fromAyah: number, toAyah: number): string {
  if (fromAyah === toAyah) {
    return `الآية ${fromAyah}`;
  }
  return `الآيات ${fromAyah} - ${toAyah}`;
}
