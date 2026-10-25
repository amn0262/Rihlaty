import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Sparkles, ChevronLeft, ArrowRight } from 'lucide-react';

interface SplashViewProps {
  isRegistered: boolean;
  profileName?: string;
  onProceed: () => void;
  onLoginExisting?: () => void;
  onOpenStoryboard?: () => void;
  onOpenDeveloper?: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({
  isRegistered,
  profileName,
  onProceed,
  onLoginExisting,
  onOpenStoryboard,
  onOpenDeveloper,
}) => {
  const [progress, setProgress] = useState(0);
  const [animStage, setAnimStage] = useState(1);

  useEffect(() => {
    // Stage 1 -> 2 -> 3 staggered animation
    const stage2Timer = setTimeout(() => setAnimStage(2), 250);
    const stage3Timer = setTimeout(() => setAnimStage(3), 600);

    // Progress bar fill over ~2.8 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 60);

    // Auto-proceed when animation completes
    const proceedTimer = setTimeout(() => {
      onProceed();
    }, 2800);

    return () => {
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearInterval(interval);
      clearTimeout(proceedTimer);
    };
  }, [onProceed]);

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between p-5 sm:p-6 bg-stars-night text-white border-0 sm:border-8 sm:border-[#17382B] select-none">
      {/* Decorative Night Sky & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Crescent Moon with glow */}
        <div
          className={`absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 transform ${
            animStage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-90'
          }`}
        >
          <div className="relative animate-float-gentle">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFE599] via-[#F6C343] to-[#D4AF37] shadow-[0_0_45px_rgba(255,215,0,0.55)] flex items-center justify-center">
              {/* Crescent inner cutout */}
              <div className="w-16 h-16 rounded-full bg-[#081d16] translate-x-3 -translate-y-2" />
            </div>
            {/* Twinkling star attached to crescent */}
            <Star className="w-4 h-4 text-[#FFF275] fill-[#FFF275] absolute -top-1 -right-2 animate-twinkle-star" />
          </div>
        </div>

        {/* Small floating twinkling stars */}
        <div className="absolute top-14 left-10 w-2.5 h-2.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#FFF] animate-twinkle-star" />
        <div className="absolute top-24 right-10 w-2 h-2 rounded-full bg-yellow-100 shadow-[0_0_6px_#FFF] animate-twinkle-star [animation-delay:0.7s]" />
        <div className="absolute top-36 left-14 w-1.5 h-1.5 rounded-full bg-yellow-300 animate-twinkle-star [animation-delay:1.2s]" />
        <div className="absolute top-48 right-12 w-2 h-2 rounded-full bg-amber-200 animate-twinkle-star [animation-delay:0.4s]" />
        <div className="absolute top-60 left-8 w-2 h-2 rounded-full bg-emerald-200 opacity-60 animate-twinkle-star [animation-delay:1.6s]" />

        {/* Hanging Lanterns swaying */}
        <div className="absolute top-8 left-6 flex flex-col items-center animate-lantern-left">
          <div className="w-0.5 h-12 bg-[#D4AF37]" />
          <div className="w-5 h-7 rounded-md bg-gradient-to-b from-[#F6C343] to-[#B45309] shadow-[0_0_18px_#F6C343] border border-[#FEF08A] flex items-center justify-center">
            <div className="w-2 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        <div className="absolute top-12 right-6 flex flex-col items-center animate-lantern-right">
          <div className="w-0.5 h-16 bg-[#D4AF37]" />
          <div className="w-5 h-7 rounded-md bg-gradient-to-b from-[#F6C343] to-[#B45309] shadow-[0_0_18px_#F6C343] border border-[#FEF08A] flex items-center justify-center">
            <div className="w-2 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        {/* Islamic Mosque Horizon Silhouette */}
        <div className="absolute bottom-40 left-0 right-0 h-44 opacity-25 flex items-end justify-between px-2 pointer-events-none">
          <svg viewBox="0 0 400 160" className="w-full h-full fill-[#047857]" preserveAspectRatio="none">
            <path d="M0 160V120H20V90C20 90 35 70 50 90V120H70V70C70 60 75 55 75 40C75 55 80 60 80 70V120H110V100C110 80 130 65 150 80C170 65 190 80 190 100V120H220V60C220 50 225 45 225 30C225 45 230 50 230 60V120H260V95C260 75 285 75 310 95V120H330V80C330 70 335 65 335 50C335 65 340 70 340 80V120H400V160H0Z" />
          </svg>
        </div>
      </div>

      {/* Top Bar with Dev & Storyboard links */}
      <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200/80 pt-1">
        {onOpenDeveloper && (
          <button
            onClick={onOpenDeveloper}
            className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/20 text-[11px] text-emerald-300 transition-colors"
          >
            عن المطور
          </button>
        )}
        <div className="flex-1" />
        {onOpenStoryboard && (
          <button
            onClick={onOpenStoryboard}
            className="px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/20 text-[11px] text-amber-300 transition-colors"
          >
            المخطط العام
          </button>
        )}
      </div>

      {/* Main Title & Holy Quran Illustration */}
      <div className="relative z-10 flex flex-col items-center text-center mt-12 sm:mt-16">
        {/* Animated Title */}
        <div
          className={`transition-all duration-700 transform ${
            animStage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-300 text-xs font-semibold mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:6s]" />
            <span>تطبيق جزء عم للأطفال</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] font-cairo">
            رِحْلَتِي مَعَ الْقُرْآنِ
          </h1>
          <p className="mt-2.5 text-base text-amber-200 font-medium tracking-wide">
            خطوة .. خطوة .. نحو كتاب الله
          </p>
        </div>

        {/* Holy Quran on Stand (Rehal) with light aura */}
        <div
          className={`relative mt-6 mb-3 flex items-center justify-center transition-all duration-1000 transform ${
            animStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {/* Glowing Aura Halo */}
          <div className="absolute w-60 h-60 rounded-full bg-amber-400/25 blur-2xl -z-10 animate-pulse-halo" />

          {/* Quran SVG Illustration with floating bounce */}
          <div className="relative w-56 h-48 flex items-center justify-center animate-float-gentle">
            <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
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
        <div
          className={`flex items-center justify-center gap-3 text-xs text-emerald-200 mt-1 transition-all duration-700 ${
            animStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span>حفظ القرآن</span>
          <span className="text-amber-400">•</span>
          <span>شرح وتفسير للأطفال</span>
          <span className="text-amber-400">•</span>
          <span>تلاوة وأوسمة</span>
        </div>
      </div>

      {/* Startup Status & Progress Indicator */}
      <div className="relative z-10 flex flex-col gap-3 mt-4">
        {/* Animated Progress Bar */}
        <div className="w-full bg-emerald-950/70 rounded-full h-2.5 p-0.5 border border-emerald-500/30 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_#F6C343]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Message based on registration status */}
        <div className="text-center text-xs font-medium text-amber-100 flex items-center justify-center gap-1.5 min-h-[20px]">
          {isRegistered ? (
            <>
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
              <span>مرحباً بعودتك {profileName ? `يا ${profileName}` : ''}! جاري الانتقال لتطبيقك...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:4s]" />
              <span>أهلاً بك لأول مرة! جاري تحضير تسجيل بياناتك...</span>
            </>
          )}
        </div>

        {/* Action Button - click to enter immediately without waiting */}
        <button
          onClick={onProceed}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#105C45] to-[#15803D] hover:from-[#0E4F3B] hover:to-[#166534] text-white font-bold text-base shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-amber-300" />
          <span>{isRegistered ? 'الدخول إلى رحلتي' : 'ابدأ الآن (إدخال البيانات)'}</span>
          <ChevronLeft className="w-4 h-4 text-emerald-200 group-hover:-translate-x-1 transition-transform" />
        </button>

        {!isRegistered && onLoginExisting && (
          <button
            onClick={onLoginExisting}
            className="w-full py-2.5 text-xs text-amber-200/80 hover:text-amber-100 font-semibold transition-colors text-center"
          >
            لديك حساب محفوظ بالفعل؟ اضغط هنا للدخول المباشر
          </button>
        )}
      </div>
    </div>
  );
};
