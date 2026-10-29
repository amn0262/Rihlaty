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

test('getAyahAudioUrl generates correct URLs for both Saad Al-Ghamdi and Mishary Alafasy', async () => {
  const { getAyahAudioUrl, getSurahWithAyahs } = await import('../data/quranJuzAmma');
  
  // Saad Al-Ghamdi (Ghamadi_40kbps)
  const ghamadiUrl = getAyahAudioUrl(78, 1, 'ghamadi');
  assert.equal(ghamadiUrl, 'https://everyayah.com/data/Ghamadi_40kbps/078001.mp3');

  // Mishary Alafasy (Alafasy_128kbps)
  const alafasyUrl = getAyahAudioUrl(78, 1, 'alafasy');
  assert.equal(alafasyUrl, 'https://everyayah.com/data/Alafasy_128kbps/078001.mp3');

  // getSurahWithAyahs updates ayahs to the specified reciter
  const surahGhamadi = getSurahWithAyahs(78, 'ghamadi');
  assert.equal(surahGhamadi.ayahs[0].audioUrl, 'https://everyayah.com/data/Ghamadi_40kbps/078001.mp3');

  const surahAlafasy = getSurahWithAyahs(78, 'alafasy');
  assert.equal(surahAlafasy.ayahs[0].audioUrl, 'https://everyayah.com/data/Alafasy_128kbps/078001.mp3');
});

test('Complete Quran dataset contains all 114 Surahs and exactly 6236 authentic ayahs', async () => {
  const { getSurahWithAyahs, TOTAL_QURAN_AYAHS, TOTAL_QURAN_SURAHS, ALL_114_SURAHS } = await import('../data/quranJuzAmma');
  
  assert.equal(ALL_114_SURAHS.length, TOTAL_QURAN_SURAHS);
  assert.equal(TOTAL_QURAN_AYAHS, 6236);

  let totalAyahsCalculated = 0;
  for (let sId = 1; sId <= 114; sId++) {
    const surah = getSurahWithAyahs(sId, 'ghamadi');
    assert.ok(surah, `Surah ${sId} should exist`);
    assert.equal(surah.id, sId);
    assert.ok(surah.ayahs.length > 0, `Surah ${sId} must have ayahs`);
    assert.equal(surah.ayahs.length, surah.ayahsCount, `Surah ${sId} ayah count matches`);
    
    // Check first and last ayah text
    assert.ok(surah.ayahs[0].text.length > 0, `Surah ${sId} ayah 1 text must not be empty`);
    assert.ok(surah.ayahs[surah.ayahs.length - 1].text.length > 0);

    // Check audioUrl
    assert.ok(surah.ayahs[0].audioUrl?.includes('Ghamadi_40kbps'));

    totalAyahsCalculated += surah.ayahs.length;
  }

  assert.equal(totalAyahsCalculated, 6236, 'Grand total of all Quran ayahs must be exactly 6236');
});

test('Tajweed engine detects rules and returns occurrences correctly', async () => {
  const { detectAyahTajweedRules, TAJWEED_RULES_CATALOG } = await import('./tajweed');
  
  assert.ok(TAJWEED_RULES_CATALOG.length >= 6);

  // Al-Fatihah 7: "ٱلضَّآلِّينَ" contains Madd and Ghunnah/Mushaddadah
  const rulesFatihah7 = detectAyahTajweedRules('صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ');
  const ruleTypes = rulesFatihah7.map(r => r.type);
  assert.ok(ruleTypes.includes('madd_obligatory') || ruleTypes.includes('madd_permissible'), 'Must detect Madd in الضالين');

  // Al-Ikhlas: contains Qalqalah (ق، ط، ب، ج، د)
  const rulesIkhlas = detectAyahTajweedRules('قُلۡ هُوَ ٱللَّهُ أَحَدٌ');
  const ikhlasTypes = rulesIkhlas.map(r => r.type);
  assert.ok(ikhlasTypes.includes('qalqalah'), 'Must detect Qalqalah in أحد');

  // Ghunnah: contains Nun Mushaddadah
  const rulesAnNas = detectAyahTajweedRules('قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ');
  const anNasTypes = rulesAnNas.map(r => r.type);
  assert.ok(anNasTypes.includes('ghunnah'), 'Must detect Ghunnah in النَّاس');
});

test('All 30 Ajzaa have verified startSurahId and startAyahNumber', async () => {
  const { ALL_30_AJZAA } = await import('../data/quranJuzAmma');
  assert.equal(ALL_30_AJZAA.length, 30);

  // Check key Juz start landmarks:
  // Juz 1 starts at 1:1 (Al-Fatihah)
  assert.equal(ALL_30_AJZAA[0].startSurahId, 1);
  assert.equal(ALL_30_AJZAA[0].startAyahNumber, 1);

  // Juz 2 starts at 2:142 (Al-Baqarah)
  assert.equal(ALL_30_AJZAA[1].startSurahId, 2);
  assert.equal(ALL_30_AJZAA[1].startAyahNumber, 142);

  // Juz 29 starts at 67:1 (Al-Mulk)
  assert.equal(ALL_30_AJZAA[28].startSurahId, 67);
  assert.equal(ALL_30_AJZAA[28].startAyahNumber, 1);

  // Juz 30 starts at 78:1 (An-Naba)
  assert.equal(ALL_30_AJZAA[29].startSurahId, 78);
  assert.equal(ALL_30_AJZAA[29].startAyahNumber, 1);
});

