import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateJuzAmmaPercentage,
  calculateTotalMemorizedAyahs,
  getMemorizedAyahsSetForSurah,
  evaluateBadgesStatus,
  formatAyahRange
} from './memorization';
import { MemorizationLog, BadgeItem } from '../types';

test('calculateJuzAmmaPercentage calculates exact percentages correctly', () => {
  // 136 out of 564 ayahs is ~24.11%, should round to 24% as in the storyboard!
  assert.equal(calculateJuzAmmaPercentage(136), 24);
  assert.equal(calculateJuzAmmaPercentage(0), 0);
  assert.equal(calculateJuzAmmaPercentage(564), 100);
  assert.equal(calculateJuzAmmaPercentage(600), 100); // capped at 100
});

test('getMemorizedAyahsSetForSurah deduplicates overlapping ranges', () => {
  const logs: MemorizationLog[] = [
    { id: '1', surahId: 78, fromAyah: 1, toAyah: 10, date: '2024-10-01' },
    { id: '2', surahId: 78, fromAyah: 5, toAyah: 15, date: '2024-10-02' },
  ];
  const set78 = getMemorizedAyahsSetForSurah(78, logs);
  // Ayahs 1 through 15 are covered
  assert.equal(set78.size, 15);
  assert.ok(set78.has(1));
  assert.ok(set78.has(15));
  assert.ok(!set78.has(16));
});

test('calculateTotalMemorizedAyahs sums correctly across multiple surahs', () => {
  const logs: MemorizationLog[] = [
    { id: '1', surahId: 78, fromAyah: 1, toAyah: 40, date: '2024-10-01' }, // 40 ayahs
    { id: '2', surahId: 112, fromAyah: 1, toAyah: 4, date: '2024-10-02' }, // 4 ayahs
    { id: '3', surahId: 114, fromAyah: 1, toAyah: 6, date: '2024-10-03' }, // 6 ayahs
  ];
  const total = calculateTotalMemorizedAyahs(logs);
  assert.equal(total, 50);
});

test('evaluateBadgesStatus unlocks badges when target is reached', () => {
  const sampleBadges: BadgeItem[] = [
    {
      id: 'b1',
      title: 'بداية مباركة',
      description: 'إتمام أول سورة',
      category: 'surah',
      icon: 'star',
      color: '#EAB308',
      isUnlocked: false,
      requiredTarget: 1
    },
    {
      id: 'b2',
      title: 'صاحب الهمة',
      description: '10% من جزء عم',
      category: 'percentage',
      icon: 'compass',
      color: '#10B981',
      isUnlocked: false,
      requiredTarget: 10
    }
  ];

  // 60 ayahs is > 10% (56.4) and 1 completed surah
  const result = evaluateBadgesStatus(sampleBadges, 60, 1);
  assert.equal(result.newlyUnlocked.length, 2);
  assert.ok(result.badges[0].isUnlocked);
  assert.ok(result.badges[1].isUnlocked);
});

test('formatAyahRange formats single ayah and multiple ayahs correctly', () => {
  assert.equal(formatAyahRange(1, 1), 'الآية 1');
  assert.equal(formatAyahRange(1, 32), 'الآيات 1 - 32');
});
