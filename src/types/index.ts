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

export type ReciterId = 'alafasy' | 'ghamadi';

export interface ReciterOption {
  id: ReciterId;
  name: string;
  fullName: string;
  englishName: string;
  audioFolder: string;
  description: string;
}

export const RECITERS_LIST: ReciterOption[] = [
  {
    id: 'ghamadi',
    name: 'سعد الغامدي',
    fullName: 'الشيخ سعد الغامدي',
    englishName: 'Saad Al-Ghamdi',
    audioFolder: 'Ghamadi_40kbps',
    description: 'تلاوة هادئة ومرتلة ممتازة للحفظ والترديد',
  },
  {
    id: 'alafasy',
    name: 'مشاري العفاسي',
    fullName: 'الشيخ مشاري راشد العفاسي',
    englishName: 'Mishary Alafasy',
    audioFolder: 'Alafasy_128kbps',
    description: 'تلاوة واضحة وعذبة ومحبوبة لدى الصغار',
  },
];

export interface ChildProfile {
  name: string;
  age: number;
  avatarId: string;
  dailyGoal: number; // e.g. 5 ayahs
  todayCompletedAyahs: number;
  reviewSurahsCount: number;
  selectedReciter?: ReciterId;
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

export interface BookmarkItem {
  surahId: number;
  ayahNumber: number;
  surahName: string;
  juz: number;
  ayahText: string;
  timestamp: string;
}

export type TajweedRuleType =
  | 'madd_obligatory' // مد لازم (أحمر داكن / 6 حركات)
  | 'madd_permissible' // مد متصل أو منفصل (أحمر / 4-5 حركات)
  | 'ghunnah' // غنة مشددة وإدغام بغنة (أخضر زمردي)
  | 'ikhfa' // إخفاء حقيقي أو شفوي (أخضر)
  | 'qalqalah' // قلقلة (أزرق سماوي قطب جد)
  | 'iqlab' // إقلاب مع ميم صغيرة (عنبري / برتقالي)
  | 'idgham_no_ghunnah' // إدغام بغير غنة وحروف لا تلفظ (رمادي)
  | 'normal';

export interface TajweedRuleOccurrence {
  type: TajweedRuleType;
  name: string;
  ruleTitle: string;
  colorName: string;
  colorHex: string;
  snippet: string;
  description: string;
  pronunciationTip: string;
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
