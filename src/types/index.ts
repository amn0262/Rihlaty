export interface Ayah {
  numberInSurah: number;
  text: string;
  audioUrl?: string;
  tafseer: {
    simplifiedForKid: string;
    messageForYou: string;
    islamicValue: string;
    questionForReflection?: string;
  };
}

export interface Surah {
  id: number;
  name: string;
  arabicName: string;
  revelationType: 'مكية' | 'مدنية';
  ayahsCount: number;
  juz: number;
  isLocked?: boolean;
  memorizedCount?: number;
  ayahs: Ayah[];
}

export interface ChildProfile {
  name: string;
  age: number;
  avatarId: string;
  dailyGoal: number; // e.g. 5 ayahs
  todayCompletedAyahs: number;
  reviewSurahsCount: number;
}

export interface MemorizationLog {
  id: string;
  surahId: number;
  fromAyah: number;
  toAyah: number;
  date: string;
  durationMinutes?: number;
  notes?: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  category: 'surah' | 'percentage' | 'streak' | 'special';
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  requiredTarget: number; // e.g., 1 for first surah, 10 for 10%
}

export interface CertificateItem {
  id: string;
  title: string;
  childName: string;
  surahName: string;
  ayahsCount: number;
  date: string;
  badgeTitle: string;
}

export type AppScreen =
  | 'splash'
  | 'profile-setup'
  | 'tour'
  | 'home'
  | 'surahs-list'
  | 'surah-reader'
  | 'tafseer-detail'
  | 'log-memorization'
  | 'achievements'
  | 'certificate'
  | 'developer';
