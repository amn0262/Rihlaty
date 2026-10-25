import React from 'react';
import { BookOpen, Moon, Star, Compass } from 'lucide-react';

interface SplashViewProps {
  onStart: () => void;
  onLoginExisting: () => void;
  onOpenStoryboard: () => void;
  onOpenDeveloper: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({
  onStart,
  onLoginExisting,
  onOpenStoryboard,
  onOpenDeveloper,
}) => {
  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between p-5 sm:p-6 bg-stars-night text-white border-0 sm:border-8 sm:border-[#17382B]">
      {/* Decorative Night Sky & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Crescent Moon */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFE599] via-[#F6C343] to-[#D4AF37] shadow-[0_0_40px_rgba(255,215,0,0.45)] flex items-center justify-center">
              {/* Crescent inner shadow */}
              <div className="w-16 h-16 rounded-full bg-[#0a231b] translate-x-3 -translate-y-2" />
            </div>
            {/* Twinkling star */}
            <Star className="w-4 h-4 text-[#FFF275] fill-[#FFF275] absolute -top-1 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Small floating stars */}
        <div className="absolute top-14 left-10 w-2 h-2 rounded-full bg-yellow-200 shadow-sm animate-ping" />
        <div className="absolute top-24 right-12 w-2.5 h-2.5 rounded-full bg-yellow-100 shadow-sm opacity-80" />
        <div className="absolute top-36 left-16 w-1.5 h-1.5 rounded-full bg-yellow-300" />
        <div className="absolute top-44 right-14 w-2 h-2 rounded-full bg-amber-200" />

        {/* Islamic Mosque Horizon Silhouette */}
        <div className="absolute bottom-44 left-0 right-0 h-44 opacity-25 flex items-end justify-between px-2 pointer-events-none">
          <svg viewBox="0 0 400 160" className="w-full h-full fill-[#047857]" preserveAspectRatio="none">
            {/* Domes and Minarets */}
            <path d="M0 160V120H20V90C20 90 35 70 50 90V120H70V70C70 60 75 55 75 40C75 55 80 60 80 70V120H110V100C110 80 130 65 150 80C170 65 190 80 190 100V120H220V60C220 50 225 45 225 30C225 45 230 50 230 60V120H260V95C260 75 285 75 310 95V120H330V80C330 70 335 65 335 50C335 65 340 70 340 80V120H400V160H0Z" />
          </svg>
        </div>

        {/* Hanging Lanterns */}
        <div className="absolute top-10 left-6 flex flex-col items-center opacity-85">
          <div className="w-0.5 h-12 bg-[#D4AF37]" />
          <div className="w-5 h-7 rounded-md bg-gradient-to-b from-[#F6C343] to-[#B45309] shadow-[0_0_15px_#F6C343] border border-[#FEF08A] flex items-center justify-center">
            <div className="w-2 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <div className="absolute top-14 right-6 flex flex-col items-center opacity-85">
          <div className="w-0.5 h-16 bg-[#D4AF37]" />
          <div className="w-5 h-7 rounded-md bg-gradient-to-b from-[#F6C343] to-[#B45309] shadow-[0_0_15px_#F6C343] border border-[#FEF08A] flex items-center justify-center">
            <div className="w-2 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Top spacing */}
      <div className="h-6" />

      {/* Main Title & Quran Illustration */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] font-cairo">
          رِحْلَتِي مَعَ الْقُرْآنِ
        </h1>
        <p className="mt-3 text-base text-amber-200 font-medium tracking-wide">
          خطوة .. خطوة .. نحو كتاب الله
        </p>

        {/* Holy Quran on Stand (Rehal) with light aura */}
        <div className="relative mt-8 mb-4 flex items-center justify-center">
          {/* Glowing Sunburst Effect */}
          <div className="absolute w-56 h-56 rounded-full bg-amber-400/20 blur-2xl -z-10" />

          {/* Quran SVG Illustration */}
          <div className="relative w-56 h-48 flex items-center justify-center">
            <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-2xl">
              {/* Wooden Stand (Rehal) */}
              <polygon points="40,165 120,120 200,165 175,175 120,138 65,175" fill="#582900" />
              <polygon points="50,155 120,110 190,155 180,162 120,125 60,162" fill="#78350F" />
              <polygon points="75,160 120,130 165,160 160,165 120,135 80,165" fill="#92400E" />

              {/* Quran Book Pages */}
              {/* Left Page */}
              <path
                d="M120 115 C90 100 45 105 25 120 C25 80 60 70 120 85 Z"
                fill="#FFFBEB"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path
                d="M120 115 C90 100 45 105 25 120 L27 125 C47 110 90 105 120 120 Z"
                fill="#B45309"
              />
              {/* Right Page */}
              <path
                d="M120 115 C150 100 195 105 215 120 C215 80 180 70 120 85 Z"
                fill="#FFFBEB"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
              <path
                d="M120 115 C150 100 195 105 215 120 L213 125 C193 110 150 105 120 120 Z"
                fill="#B45309"
              />

              {/* Decorative Quran lines */}
              <path d="M40 92 Q70 82 105 92" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M40 99 Q70 89 105 99" stroke="#92400E" strokeWidth="1.2" strokeDasharray="4 2" />
              <path d="M40 106 Q70 96 105 106" stroke="#92400E" strokeWidth="1.2" strokeDasharray="4 2" />

              <path d="M135 92 Q170 82 200 92" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M135 99 Q170 89 200 99" stroke="#92400E" strokeWidth="1.2" strokeDasharray="4 2" />
              <path d="M135 106 Q170 96 200 106" stroke="#92400E" strokeWidth="1.2" strokeDasharray="4 2" />

              {/* Golden Center Ribbon */}
              <path d="M120 85 L120 135 L124 130 L128 135 L128 85 Z" fill="#EAB308" />
            </svg>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="flex items-center justify-center gap-3 text-xs text-emerald-200 mt-2">
          <span>حفظ جزء عم</span>
          <span>•</span>
          <span>فهم الآيات للأطفال</span>
          <span>•</span>
          <span>أوسمة وشهادات</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col gap-3 mt-6">
        <button
          onClick={onStart}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#105C45] to-[#15803D] hover:from-[#0E4F3B] hover:to-[#166534] text-white font-bold text-lg shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5 text-amber-300" />
          <span>ابدأ الآن</span>
        </button>

        <button
          onClick={onLoginExisting}
          className="w-full py-3 px-6 rounded-2xl bg-[#F8F5EE] hover:bg-[#EFEAD9] text-[#1E3A2B] font-semibold text-base transition-all transform active:scale-[0.98] border border-amber-200 shadow-sm"
        >
          لدي حساب بالفعل
        </button>
      </div>
    </div>
  );
};
