import React, { useState } from 'react';
import { ArrowRight, Volume2, Star, Heart, HelpCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Ayah, Surah } from '../types';

interface TafseerDetailModalProps {
  ayah: Ayah;
  surah: Surah;
  onClose: () => void;
  onNextAyah?: () => void;
  onPrevAyah?: () => void;
}

export const TafseerDetailModal: React.FC<TafseerDetailModalProps> = ({
  ayah,
  surah,
  onClose,
  onNextAyah,
  onPrevAyah,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const playAyahSound = () => {
    if (isPlayingAudio) return;
    const url =
      ayah.audioUrl ||
      `https://everyayah.com/data/Alafasy_128kbps/${String(surah.id).padStart(3, '0')}${String(
        ayah.numberInSurah
      ).padStart(3, '0')}.mp3`;

    const audio = new Audio(url);
    setIsPlayingAudio(true);
    audio.play().catch(() => setIsPlayingAudio(false));
    audio.onended = () => setIsPlayingAudio(false);
  };

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#FDFBF7] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20 pb-4">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-amber-100 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
          title="رجوع للسورة"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-black text-[#105C45] font-cairo">
            شرح الآية ({ayah.numberInSurah})
          </h2>
          <p className="text-xs text-slate-500">سورة {surah.name}</p>
        </div>

        {/* Audio Button */}
        <button
          onClick={playAyahSound}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isPlayingAudio ? 'bg-amber-500 text-white animate-pulse' : 'bg-emerald-100 text-[#105C45] hover:bg-emerald-200'
          }`}
          title="استماع للآية"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Ornate Golden Frame with Ayah Text */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF9C3] to-[#FEF3C7] border-2 border-amber-300 shadow-sm text-center">
          <span className="text-2xl md:text-3xl font-bold font-quran text-[#105C45] leading-loose">
            {ayah.text}
          </span>
          <div className="mt-2 text-xs text-amber-800 font-semibold font-cairo">
            الآية رقم {ayah.numberInSurah}
          </div>
        </div>

        {/* Section 1: المعنى المبسط للطفل (Matching Storyboard with thinking kid illustration) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-emerald-800 font-cairo flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              المعنى المبسط للطفل
            </h3>
            <span className="text-2xl">🤔</span>
          </div>

          <div className="flex items-start gap-4">
            {/* Friendly Thinking Kid Illustration */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 80 80" className="w-12 h-12">
                <circle cx="40" cy="40" r="30" fill="#FFDFC4" />
                <path d="M25 32C25 20 32 15 40 15C48 15 55 20 55 32Z" fill="#105C45" />
                <circle cx="32" cy="38" r="3" fill="#2C1810" />
                <circle cx="48" cy="38" r="3" fill="#2C1810" />
                <path d="M35 48C38 52 42 52 45 48" stroke="#853A26" strokeWidth="2" strokeLinecap="round" />
                <path d="M54 36C58 34 62 38 60 42C58 46 54 44 54 48" stroke="#D97706" strokeWidth="2.5" fill="none" />
                <circle cx="54" cy="53" r="1.5" fill="#D97706" />
              </svg>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {ayah.tafseer.simplifiedForKid}
            </p>
          </div>
        </div>

        {/* Section 2: رسالة لك (Matching Storyboard) */}
        <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-3xl p-5 shadow-sm border border-amber-200/80 space-y-2">
          <h3 className="text-base font-bold text-amber-800 font-cairo flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            رسالة لك
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium pr-1">
            {ayah.tafseer.messageForYou}
          </p>
        </div>

        {/* Section 3: قيمة إسلامية (Matching Storyboard) */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-white rounded-3xl p-5 shadow-sm border border-emerald-200/80 space-y-2">
          <h3 className="text-base font-bold text-emerald-800 font-cairo flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600" />
            قيمة إسلامية
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium pr-1">
            {ayah.tafseer.islamicValue}
          </p>
        </div>

        {/* Question for thought if present */}
        {ayah.tafseer.questionForReflection && (
          <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-dashed border-amber-300 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs font-semibold text-slate-700">
              {ayah.tafseer.questionForReflection}
            </p>
          </div>
        )}
      </div>

      {/* Footer Navigation between Ayahs */}
      <div className="p-4 bg-white border-t border-amber-100 flex items-center justify-between shrink-0">
        {onPrevAyah ? (
          <button
            onClick={onPrevAyah}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            <span>الآية السابقة</span>
          </button>
        ) : <div />}

        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl bg-[#105C45] hover:bg-[#0c4a37] text-white text-xs font-bold transition-transform active:scale-95 shadow-sm"
        >
          فهمت الآية، شكراً!
        </button>

        {onNextAyah ? (
          <button
            onClick={onNextAyah}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 transition-colors"
          >
            <span>الآية التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
