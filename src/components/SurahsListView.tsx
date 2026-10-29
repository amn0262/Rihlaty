import React, { useState } from 'react';
import { ArrowRight, Search, CheckCircle2, BookOpen, Layers, Bookmark, ArrowLeft } from 'lucide-react';
import { SURAHS_LIST_SUMMARY, ALL_114_SURAHS, ALL_30_AJZAA } from '../data/quranJuzAmma';
import { MemorizationLog, BookmarkItem } from '../types';
import { getMemorizedAyahsSetForSurah } from '../utils/memorization';

interface SurahsListViewProps {
  logs: MemorizationLog[];
  onSelectSurah: (surahId: number, startAyah?: number) => void;
  onBack: () => void;
  currentBookmark?: BookmarkItem | null;
}

export const SurahsListView: React.FC<SurahsListViewProps> = ({
  logs,
  onSelectSurah,
  onBack,
  currentBookmark,
}) => {
  const [filterTab, setFilterTab] = useState<'surahs' | 'ajzaa' | 'juz_amma'>('surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuzFilter, setSelectedJuzFilter] = useState<number | null>(null);

  // Active surahs list based on filter
  const currentSurahsPool =
    filterTab === 'juz_amma'
      ? SURAHS_LIST_SUMMARY
      : filterTab === 'surahs'
      ? ALL_114_SURAHS
      : selectedJuzFilter
      ? ALL_114_SURAHS.filter(s => s.juz === selectedJuzFilter)
      : [];

  const filteredSurahs = currentSurahsPool.filter(surah => {
    if (searchQuery.trim()) {
      return (
        surah.name.includes(searchQuery.trim()) ||
        surah.arabicName.includes(searchQuery.trim()) ||
        String(surah.id).includes(searchQuery.trim())
      );
    }
    return true;
  });

  const filteredAjzaa = ALL_30_AJZAA.filter(juz => {
    if (searchQuery.trim()) {
      return (
        juz.name.includes(searchQuery.trim()) ||
        juz.arabicName.includes(searchQuery.trim()) ||
        String(juz.number).includes(searchQuery.trim())
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#F8F5EE] text-[#1E293B] sm:border-8 sm:border-[#105C45]/20 pb-4">
      {/* Top Header */}
      <div className="p-4 sm:p-5 pb-3 bg-white border-b border-amber-100 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
            title="رجوع للرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-slate-800 font-cairo">
            {filterTab === 'juz_amma'
              ? 'سور جزء عم (37 سورة)'
              : filterTab === 'surahs'
              ? 'سور القرآن الكريم (114 سورة)'
              : selectedJuzFilter
              ? `سور الجزء ${selectedJuzFilter}`
              : 'أجزاء القرآن الكريم (30 جزءاً)'}
          </h2>
          <div className="w-10" />
        </div>

        {/* Filter Segmented Controls (السور | الأجزاء | جزء عم) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F1EDE1] rounded-2xl">
          <button
            onClick={() => {
              setFilterTab('surahs');
              setSelectedJuzFilter(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filterTab === 'surahs'
                ? 'bg-[#105C45] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            السور (114)
          </button>
          <button
            onClick={() => {
              setFilterTab('ajzaa');
              setSelectedJuzFilter(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filterTab === 'ajzaa'
                ? 'bg-[#105C45] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الأجزاء (30)
          </button>
          <button
            onClick={() => {
              setFilterTab('juz_amma');
              setSelectedJuzFilter(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filterTab === 'juz_amma'
                ? 'bg-[#105C45] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جزء عم
          </button>
        </div>

        {/* Search input */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              filterTab === 'ajzaa'
                ? 'ابحث برقم الجزء أو اسمه (مثال: تبارك، عم، 30)...'
                : 'ابحث عن اسم السورة أو رقمها...'
            }
            className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-[#F8F5EE] border border-amber-200/70 focus:outline-none focus:border-[#105C45]"
          />
        </div>

        {/* Filter Breadcrumb if browsing surahs of a specific Juz in Ajzaa tab */}
        {filterTab === 'ajzaa' && selectedJuzFilter && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-100 text-xs">
            <span className="font-bold text-[#105C45]">
              عرض سور الجزء {selectedJuzFilter}
            </span>
            <button
              onClick={() => setSelectedJuzFilter(null)}
              className="text-amber-800 underline font-semibold"
            >
              عرض قائمة كل الأجزاء
            </button>
          </div>
        )}
      </div>

      {/* Content Body: Bookmark Banner + Either Ajzaa Cards Grid OR Surahs List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {/* Quick Bookmark Resume Banner if set */}
        {currentBookmark && (
          <div
            onClick={() => onSelectSurah(currentBookmark.surahId, currentBookmark.ayahNumber)}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 border-2 border-amber-400/70 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-500 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Bookmark className="w-5 h-5 fill-white" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">
                  مكان الوقوف المحفوظ 🔖 (Book Mark)
                </span>
                <span className="text-xs font-bold text-slate-800 font-cairo">
                  سورة {currentBookmark.surahName} · الآية ({currentBookmark.ayahNumber})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-[#105C45] bg-white px-2.5 py-1 rounded-xl border border-amber-200 shrink-0 group-hover:bg-emerald-50">
              <span>متابعة</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {filterTab === 'ajzaa' && !selectedJuzFilter ? (
          /* List of 30 Ajzaa: Direct click navigates to start ayah of that Juz */
          <div className="space-y-2.5">
            <div className="text-[11px] text-emerald-900 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/60 flex items-center justify-between">
              <span>اضغط على أي جزء للانتقال مباشرة إلى بدايته بالآيات 📖</span>
              <span className="font-bold text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded-full">30 جزء</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredAjzaa.map((juz) => (
                <div
                  key={juz.number}
                  onClick={() => onSelectSurah(juz.startSurahId, juz.startAyahNumber)}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-100 hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99] hover:shadow-md"
                  title={`الانتقال لبداية الجزء ${juz.number} (سورة ${juz.startSurah} آية ${juz.startAyahNumber})`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 flex items-center justify-center font-bold text-[#105C45] text-sm font-mono shrink-0 group-hover:bg-[#105C45] group-hover:text-white transition-colors">
                        {juz.number}
                      </div>
                      <div className="text-right">
                        <h3 className="text-sm font-bold text-slate-800 font-cairo group-hover:text-[#105C45] transition-colors">
                          {juz.name}
                        </h3>
                        <div className="text-[11px] text-emerald-800 font-quran">
                          ﴿ {juz.arabicName} ﴾
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                      {juz.ayahsCount} آية
                    </span>
                  </div>

                  {/* Range & Action Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 text-[10px]">
                      من {juz.startSurah}:{juz.startAyahNumber} إلى {juz.endSurah}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJuzFilter(juz.number);
                        }}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-lg transition-colors"
                        title="عرض قائمة سور هذا الجزء"
                      >
                        السور
                      </button>

                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-2 py-0.5 rounded-lg transition-colors">
                        قراءة الآيات ←
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List of Surahs */
          filteredSurahs.map((surah) => {
            const memorizedSet = getMemorizedAyahsSetForSurah(surah.id, logs);
            const memorizedCount = memorizedSet.size;
            const isCompleted = memorizedCount >= surah.ayahsCount;
            const progressPercent = Math.min(
              100,
              Math.round((memorizedCount / surah.ayahsCount) * 100)
            );

            return (
              <div
                key={surah.id}
                onClick={() => onSelectSurah(surah.id)}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-100 hover:border-emerald-300 transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3">
                  {/* Islamic Star Badge for Surah Number */}
                  <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 40 40" className="w-full h-full text-amber-500 fill-amber-50 stroke-amber-400">
                      <polygon points="20,1 25,12 37,12 28,20 32,32 20,25 8,32 12,20 3,12 15,12" strokeWidth="1.2" />
                    </svg>
                    <span className="absolute font-bold text-xs text-amber-900 font-mono">
                      {surah.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-cairo group-hover:text-[#105C45] transition-colors">
                      {surah.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>الجزء {surah.juz}</span>
                      <span>·</span>
                      <span>{surah.revelationType}</span>
                      <span>·</span>
                      <span>{surah.ayahsCount} آية</span>
                    </div>
                  </div>
                </div>

                {/* Progress / Status */}
                <div className="flex items-center gap-3">
                  <div className="w-20 sm:w-24 text-left">
                    <div className="text-[11px] font-bold text-slate-600 mb-1 font-mono">
                      {memorizedCount}/{surah.ayahsCount}
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-[#105C45]'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] text-amber-700 font-bold shrink-0">
                      {progressPercent}%
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
