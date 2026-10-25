import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Settings,
  Play,
  Pause,
  BookOpen,
  BookmarkCheck,
  MoreHorizontal,
  Volume2,
  VolumeX,
  CheckCircle2,
  Star,
  Repeat
} from 'lucide-react';
import { Surah, Ayah, MemorizationLog } from '../types';
import { getMemorizedAyahsSetForSurah } from '../utils/memorization';

interface SurahReaderViewProps {
  surah: Surah;
  logs: MemorizationLog[];
  onOpenAyahTafseer: (ayah: Ayah) => void;
  onOpenLogMemorization: () => void;
  onBack: () => void;
}

export const SurahReaderView: React.FC<SurahReaderViewProps> = ({
  surah,
  logs,
  onOpenAyahTafseer,
  onOpenLogMemorization,
  onBack,
}) => {
  const [playingAyahNum, setPlayingAyahNum] = useState<number | null>(null);
  const [isRepeating, setIsRepeating] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const memorizedSet = getMemorizedAyahsSetForSurah(surah.id, logs);

  const playAyahAudio = (ayah: Ayah) => {
    if (playingAyahNum === ayah.numberInSurah) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAyahNum(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl =
      ayah.audioUrl ||
      `https://everyayah.com/data/Alafasy_128kbps/${String(surah.id).padStart(3, '0')}${String(
        ayah.numberInSurah
      ).padStart(3, '0')}.mp3`;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setPlayingAyahNum(ayah.numberInSurah);

    audio.play().catch(() => {
      // Audio playback failed (e.g. sandbox restriction), fallback quietly
      setPlayingAyahNum(null);
    });

    audio.onended = () => {
      if (isRepeating) {
        // Find next ayah or finish
        if (ayah.numberInSurah < surah.ayahs.length) {
          const nextAyah = surah.ayahs[ayah.numberInSurah];
          playAyahAudio(nextAyah);
        } else {
          setPlayingAyahNum(null);
        }
      } else {
        setPlayingAyahNum(null);
      }
    };
  };

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#FDFBF7] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20 pb-20">
      {/* Top Bar Header */}
      <div className="p-4 bg-white border-b border-amber-100 flex items-center justify-between shrink-0 shadow-sm">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
          title="رجوع"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-black text-[#105C45] font-cairo">
            سورة {surah.name}
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            جزء عم · سورة {surah.id} · {surah.ayahsCount} آية
          </p>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
          title="الإعدادات"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Dropdown if toggled */}
      {showSettings && (
        <div className="bg-[#FFFDF9] border-b border-amber-200 p-3 px-5 text-xs text-slate-700 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span>حجم الخط:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded-md ${
                fontSize === 'normal' ? 'bg-[#105C45] text-white' : 'bg-slate-100'
              }`}
            >
              عادي
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded-md ${
                fontSize === 'large' ? 'bg-[#105C45] text-white' : 'bg-slate-100'
              }`}
            >
              كبير
            </button>
          </div>

          <button
            onClick={() => setIsRepeating(!isRepeating)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md ${
              isRepeating ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-slate-100'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>تشغيل متتالي</span>
          </button>
        </div>
      )}

      {/* Quran Reader Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Basmalah in Decorative Islamic Frame (unless At-Tawbah) */}
        {surah.id !== 9 && (
          <div className="relative my-2 p-3 rounded-2xl bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FFFBEB] border-2 border-[#D4AF37]/50 shadow-sm text-center">
            <div className="text-xl font-bold font-quran text-[#105C45] tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </div>
        )}

        {/* Tip for child */}
        <div className="text-center text-[11px] text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200/50 flex items-center justify-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>اضغط على أي آية لعرض التفسير المبسط وقصتها للأطفال</span>
        </div>

        {/* Ayahs List */}
        <div className="space-y-3">
          {surah.ayahs.map((ayah) => {
            const isMemorized = memorizedSet.has(ayah.numberInSurah);
            const isPlaying = playingAyahNum === ayah.numberInSurah;

            return (
              <div
                key={ayah.numberInSurah}
                className={`rounded-2xl p-3.5 transition-all border flex items-center justify-between gap-3 ${
                  isPlaying
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/40 shadow-sm'
                    : isMemorized
                    ? 'bg-[#F0FDF4] border-emerald-200'
                    : 'bg-white border-amber-100/80 hover:border-amber-300'
                }`}
              >
                {/* Audio Play/Pause Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAyahAudio(ayah);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-90 ${
                    isPlaying
                      ? 'bg-amber-500 text-white'
                      : 'bg-[#105C45] text-white hover:bg-[#0c4735]'
                  }`}
                  title={isPlaying ? 'إيقاف' : 'استماع للتلاوة'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current translate-x-[-1px]" />
                  )}
                </button>

                {/* Ayah Text (clickable to view child explanation) */}
                <div
                  onClick={() => onOpenAyahTafseer(ayah)}
                  className="flex-1 cursor-pointer text-right px-2 group"
                >
                  <p
                    className={`font-quran leading-loose text-slate-800 group-hover:text-[#105C45] transition-colors ${
                      fontSize === 'large' ? 'text-2xl' : 'text-xl'
                    }`}
                  >
                    {ayah.text}
                  </p>
                  {isMemorized && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full mt-1">
                      <CheckCircle2 className="w-3 h-3" /> تم الحفظ
                    </span>
                  )}
                </div>

                {/* Ornate Golden Islamic Ayah Number */}
                <div
                  onClick={() => onOpenAyahTafseer(ayah)}
                  className="relative w-10 h-10 flex items-center justify-center shrink-0 cursor-pointer"
                  title="عرض التفسير المبسط"
                >
                  <svg viewBox="0 0 36 36" className="w-full h-full text-amber-500 fill-amber-50 stroke-amber-400">
                    <circle cx="18" cy="18" r="14" strokeWidth="1.2" strokeDasharray="3 2" />
                    <circle cx="18" cy="18" r="11" strokeWidth="1" />
                  </svg>
                  <span className="absolute font-bold text-xs text-amber-900 font-mono">
                    {ayah.numberInSurah}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar (Matching Storyboard: التفسير المبسط / تسجيل الحفظ / المزيد) */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 h-18 bg-white border-t border-slate-200 px-4 flex items-center justify-between z-30 shadow-lg">
        {/* Simplified Tafseer */}
        <button
          onClick={() => onOpenAyahTafseer(surah.ayahs[0])}
          className="flex-1 py-2.5 px-2 flex flex-col items-center justify-center gap-1 text-[#105C45] hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <BookOpen className="w-5 h-5 text-[#105C45]" />
          <span className="text-xs font-bold font-cairo">التفسير المبسط</span>
        </button>

        <div className="w-px h-8 bg-slate-200" />

        {/* Record Memorization */}
        <button
          onClick={onOpenLogMemorization}
          className="flex-1 py-2.5 px-2 flex flex-col items-center justify-center gap-1 text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 rounded-xl transition-colors mx-2"
        >
          <BookmarkCheck className="w-5 h-5 text-emerald-700" />
          <span className="text-xs font-bold font-cairo">تسجيل الحفظ</span>
        </button>

        <div className="w-px h-8 bg-slate-200" />

        {/* More */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex-1 py-2.5 px-2 flex flex-col items-center justify-center gap-1 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-xs font-bold font-cairo">المزيد</span>
        </button>
      </div>
    </div>
  );
};
