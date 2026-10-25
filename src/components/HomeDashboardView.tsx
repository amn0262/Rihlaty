import React from 'react';
import {
  ArrowLeft,
  RotateCw,
  Target,
  BookOpen,
  Award,
  Home,
  User,
  CheckCircle,
  Star,
  ChevronLeft,
  Heart
} from 'lucide-react';
import { ChildProfile, MemorizationLog } from '../types';
import { ChildAvatar } from './ChildAvatar';
import { SURAHS_LIST_SUMMARY } from '../data/quranJuzAmma';
import {
  calculateTotalMemorizedAyahs,
  calculateJuzAmmaPercentage,
  calculateCompletedSurahsCount,
  getMemorizedAyahsSetForSurah
} from '../utils/memorization';

interface HomeDashboardViewProps {
  profile: ChildProfile;
  logs: MemorizationLog[];
  currentSurahId: number;
  onContinueMemorization: (surahId: number) => void;
  onNavigateTab: (tab: 'home' | 'surahs' | 'review' | 'achievements' | 'profile') => void;
  onOpenDeveloper: () => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  profile,
  logs,
  currentSurahId,
  onContinueMemorization,
  onNavigateTab,
  onOpenDeveloper,
}) => {
  // Surah counts map for calculation
  const ayahCountsMap: Record<number, number> = {};
  SURAHS_LIST_SUMMARY.forEach(s => {
    ayahCountsMap[s.id] = s.ayahsCount;
  });

  const totalMemorizedAyahs = calculateTotalMemorizedAyahs(logs);
  const percentage = calculateJuzAmmaPercentage(totalMemorizedAyahs);
  const completedSurahs = calculateCompletedSurahsCount(logs, ayahCountsMap);

  const currentSurah = SURAHS_LIST_SUMMARY.find(s => s.id === currentSurahId) || SURAHS_LIST_SUMMARY[0];
  const currentSurahMemorizedCount = getMemorizedAyahsSetForSurah(currentSurah.id, logs).size;
  const currentSurahPercent = Math.min(
    100,
    Math.round((currentSurahMemorizedCount / currentSurah.ayahsCount) * 100)
  );

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#F8F5EE] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20 pb-20">
      {/* Scrollable Content */}
      <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
        {/* Top Greeting Header */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-sm border border-amber-100">
          <div className="flex items-center gap-3">
            <ChildAvatar avatarId={profile.avatarId} size="md" />
            <div>
              <h2 className="text-base font-bold text-slate-800 font-cairo">
                السلام عليكم يا {profile.name}
              </h2>
              <p className="text-xs text-emerald-700 font-medium">
                بَارَكَ اللَّهُ فِي جُهْدِكَ 🌿
              </p>
            </div>
          </div>

          {/* Quick link to Developer */}
          <button
            onClick={onOpenDeveloper}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#105C45] transition-colors"
            title="المطور أيمن بكور"
          >
            <User className="w-5 h-5 text-[#105C45]" />
            <span className="text-[10px] font-bold mt-0.5">المطور</span>
          </button>
        </div>

        {/* Progress Card (Matching Storyboard: Circular 24%) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              تقدمك في الحفظ
            </span>
            <div className="text-xl font-bold text-[#105C45] font-cairo">
              {totalMemorizedAyahs} <span className="text-sm font-normal text-slate-500">من 564 آية</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <span className="text-sm">🌱</span>
              <span>{completedSurahs} من 37 سورة مكتملة</span>
            </div>
          </div>

          {/* Circular Progress Meter */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E2E8F0"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#105C45"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#105C45] font-cairo">
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Current Surah Card: "أين وصلت الآن؟" */}
        <div className="bg-gradient-to-br from-[#FEFBF2] to-[#FFFDF9] rounded-3xl p-5 shadow-sm border-2 border-emerald-100/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">أين وصلت الآن؟</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full">
              قيد الحفظ
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 font-cairo">
                سورة {currentSurah.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentSurahMemorizedCount} من {currentSurah.ayahsCount} آية
              </p>
            </div>
            <div className="text-left font-bold text-emerald-800 text-sm">
              {currentSurahPercent}%
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-[#105C45] rounded-full transition-all duration-700"
              style={{ width: `${currentSurahPercent}%` }}
            />
          </div>

          <div className="text-xs text-slate-500">
            <span>آخر تقدم: </span>
            <span className="font-semibold text-slate-700">
              {currentSurahMemorizedCount > 0 ? `الآيات 1 - ${currentSurahMemorizedCount}` : 'لم تبدأ بعد'}
            </span>
          </div>

          {/* Continue CTA */}
          <button
            onClick={() => onContinueMemorization(currentSurah.id)}
            className="w-full py-3 px-4 rounded-2xl bg-[#105C45] hover:bg-[#0c4b37] text-white font-bold text-sm shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            <span>متابعة الحفظ</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Daily Goals Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Goal */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400">هدف اليوم</div>
              <div className="text-base font-bold text-slate-800 font-cairo">
                {profile.todayCompletedAyahs} / {profile.dailyGoal} آيات
              </div>
            </div>
          </div>

          {/* Review Surahs */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400">سور للمراجعة</div>
              <div className="text-base font-bold text-slate-800 font-cairo">
                {profile.reviewSurahsCount} سور
              </div>
            </div>
          </div>
        </div>

        {/* Mini Banner: About Aymen Bakkour */}
        <div
          onClick={onOpenDeveloper}
          className="bg-gradient-to-r from-emerald-800 to-[#105C45] rounded-2xl p-3 text-white flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-amber-300">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-bold">تصميم وتطوير: أيمن بكور</div>
              <div className="text-[11px] text-emerald-100">انقر للتعرف على المطور وروابط بيهانس وفيسبوك</div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-emerald-200" />
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar (5 tabs) */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 h-18 bg-white border-t border-slate-200/80 px-4 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => onNavigateTab('home')}
          className="flex flex-col items-center justify-center gap-1 text-[#105C45] font-bold"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Home className="w-4 h-4 text-[#105C45]" />
          </div>
          <span className="text-[10px]">الرئيسية</span>
        </button>

        <button
          onClick={() => onNavigateTab('surahs')}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-[#105C45] transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">الحفظ</span>
        </button>

        <button
          onClick={() => onNavigateTab('review')}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-[#105C45] transition-colors"
        >
          <RotateCw className="w-5 h-5" />
          <span className="text-[10px]">المراجعة</span>
        </button>

        <button
          onClick={() => onNavigateTab('achievements')}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-[#105C45] transition-colors"
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px]">الإنجازات</span>
        </button>

        <button
          onClick={() => onNavigateTab('profile')}
          className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-[#105C45] transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">حسابي</span>
        </button>
      </div>
    </div>
  );
};
