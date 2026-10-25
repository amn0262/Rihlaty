import React, { useState, useRef, useEffect } from 'react';
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
  Repeat,
  SkipForward,
  SkipBack,
  X,
  RotateCcw
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

export type PlaybackMode = 'single' | 'infinite' | 'surah';

export const SurahReaderView: React.FC<SurahReaderViewProps> = ({
  surah,
  logs,
  onOpenAyahTafseer,
  onOpenLogMemorization,
  onBack,
}) => {
  const [playingAyahNum, setPlayingAyahNum] = useState<number | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('single');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showSettings, setShowSettings] = useState(false);

  // Single audio instance reference to strictly enforce ONE audio playing at a time
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const memorizedSet = getMemorizedAyahsSetForSurah(surah.id, logs);

  // Helper to format seconds as mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // Build audio URL for an ayah
  const getAyahAudioUrl = (ayahNum: number) => {
    const ayah = surah.ayahs.find((a) => a.numberInSurah === ayahNum);
    if (ayah?.audioUrl) return ayah.audioUrl;
    return `https://everyayah.com/data/Alafasy_128kbps/${String(surah.id).padStart(3, '0')}${String(
      ayahNum
    ).padStart(3, '0')}.mp3`;
  };

  // Mutual exclusion: cleanly stop and unload any existing audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onloadedmetadata = null;
      audioRef.current.onerror = null;
      audioRef.current.onplay = null;
      audioRef.current.onpause = null;
      audioRef.current.src = '';
      audioRef.current = null;
    }
  };

  // Close player completely
  const handleClosePlayer = () => {
    stopAudio();
    setPlayingAyahNum(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  // Cleanup on unmount or when surah changes
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [surah.id]);

  // Scroll active ayah into view smoothly
  useEffect(() => {
    if (playingAyahNum !== null) {
      const el = document.getElementById(`ayah-card-${playingAyahNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [playingAyahNum]);

  // Master playback controller: guarantees only 1 audio plays at any moment
  const startPlayback = (ayahNum: number, mode: PlaybackMode, speed = playbackSpeed) => {
    stopAudio();

    const audioUrl = getAyahAudioUrl(ayahNum);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.playbackRate = speed;

    setPlayingAyahNum(ayahNum);
    setPlaybackMode(mode);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    audio.onplay = () => {
      setIsPlaying(true);
    };

    audio.onpause = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      setIsPlaying(false);
    };

    audio.onended = () => {
      if (mode === 'infinite') {
        // Infinite repeat: loop this exact ayah indefinitely
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
      } else if (mode === 'surah') {
        // Full Surah sequential mode: advance to the next ayah
        if (ayahNum < surah.ayahs.length) {
          startPlayback(ayahNum + 1, 'surah', speed);
        } else {
          // Finished the entire surah
          setIsPlaying(false);
        }
      } else {
        // mode === 'single'
        // STRICT RULE: Plays only this ayah and does NOT play subsequent ayahs
        setIsPlaying(false);
      }
    };

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  };

  // Ayah Play Button: plays ONLY that specific ayah
  const handlePlaySingleAyah = (ayahNum: number) => {
    if (playingAyahNum === ayahNum && playbackMode === 'single') {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }
    startPlayback(ayahNum, 'single');
  };

  // Infinite Repeat Button on the Ayah: plays this ayah in an endless loop
  const handleToggleInfiniteAyah = (ayahNum: number) => {
    if (playingAyahNum === ayahNum && playbackMode === 'infinite') {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }
    startPlayback(ayahNum, 'infinite');
  };

  // Play Full Surah Button (next to the Surah name in the header)
  const handleToggleFullSurah = () => {
    if (playbackMode === 'surah') {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }
    // Start playing the surah from ayah 1 (or current ayah if already chosen)
    const startAyah = playingAyahNum || 1;
    startPlayback(startAyah, 'surah');
  };

  // Player Bar Play/Pause toggle
  const handleTogglePlayerPlayPause = () => {
    if (!audioRef.current) {
      if (playingAyahNum !== null) {
        startPlayback(playingAyahNum, playbackMode);
      }
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Seek progress
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Jump to Next Ayah
  const handleNextAyah = () => {
    if (playingAyahNum === null) return;
    if (playingAyahNum < surah.ayahs.length) {
      startPlayback(playingAyahNum + 1, playbackMode);
    }
  };

  // Jump to Previous Ayah
  const handlePrevAyah = () => {
    if (playingAyahNum === null) return;
    if (playingAyahNum > 1) {
      startPlayback(playingAyahNum - 1, playbackMode);
    }
  };

  // Toggle mode from the player bar
  const handleTogglePlayerMode = () => {
    if (playingAyahNum === null) return;
    if (playbackMode === 'single') {
      startPlayback(playingAyahNum, 'infinite');
    } else if (playbackMode === 'infinite') {
      startPlayback(playingAyahNum, 'surah');
    } else {
      startPlayback(playingAyahNum, 'single');
    }
  };

  // Speed cycle: 0.75x -> 1x -> 1.25x
  const handleCycleSpeed = () => {
    const nextSpeed = playbackSpeed === 1 ? 0.75 : playbackSpeed === 0.75 ? 1.25 : 1;
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#FDFBF7] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20">
      {/* Top Bar Header */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-amber-100 flex items-center justify-between shrink-0 shadow-sm z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors shadow-sm"
          title="رجوع للقائمة"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Center Title + Play Full Surah Button */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-[#105C45] font-cairo">
              سورة {surah.name}
            </h2>

            {/* زر بجانب اسم السورة يشغل كامل السورة */}
            <button
              onClick={handleToggleFullSurah}
              className={`px-2.5 py-1 rounded-full text-xs font-bold font-cairo flex items-center gap-1.5 transition-all shadow-sm ${
                playbackMode === 'surah' && isPlaying
                  ? 'bg-amber-500 text-white shadow-amber-300 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-emerald-50 text-[#105C45] border border-emerald-300 hover:bg-emerald-100'
              }`}
              title={
                playbackMode === 'surah' && isPlaying
                  ? 'إيقاف تلاوة السورة'
                  : 'تشغيل كامل السورة بالتتابع'
              }
            >
              {playbackMode === 'surah' && isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>إيقاف السورة</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current translate-x-[-1px]" />
                  <span>تشغيل السورة</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            جزء عم · سورة {surah.id} · {surah.ayahsCount} آية
          </p>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            showSettings ? 'bg-[#105C45] text-white' : 'bg-[#EDE7D9] hover:bg-[#E2D9C6] text-[#105C45]'
          }`}
          title="الإعدادات وحجم الخط"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Dropdown if toggled */}
      {showSettings && (
        <div className="bg-[#FFFDF9] border-b border-amber-200 p-3 px-5 text-xs text-slate-700 flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">حجم الخط:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-3 py-1 rounded-md font-bold transition-colors ${
                fontSize === 'normal' ? 'bg-[#105C45] text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              عادي
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-3 py-1 rounded-md font-bold transition-colors ${
                fontSize === 'large' ? 'bg-[#105C45] text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              كبير
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <Volume2 className="w-3.5 h-3.5" />
            <span>بصوت الشيخ مشاري العفاسي</span>
          </div>
        </div>
      )}

      {/* Quran Reader Body */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-3 transition-all ${
          playingAyahNum !== null ? 'pb-52' : 'pb-24'
        }`}
      >
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
            const isCurrentPlaying = playingAyahNum === ayah.numberInSurah;
            const isInfiniteForThis = isCurrentPlaying && playbackMode === 'infinite';

            return (
              <div
                key={ayah.numberInSurah}
                id={`ayah-card-${ayah.numberInSurah}`}
                className={`rounded-2xl p-3.5 transition-all border flex items-center justify-between gap-3 ${
                  isCurrentPlaying
                    ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/50 shadow-md'
                    : isMemorized
                    ? 'bg-[#F0FDF4] border-emerald-200 hover:border-emerald-300'
                    : 'bg-white border-amber-100/80 hover:border-amber-300'
                }`}
              >
                {/* Audio Action Buttons on the Ayah */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  {/* Single Ayah Play/Pause Button (does NOT advance to next ayahs) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaySingleAyah(ayah.numberInSurah);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-90 ${
                      isCurrentPlaying && isPlaying && playbackMode !== 'infinite'
                        ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                        : isCurrentPlaying && !isPlaying
                        ? 'bg-amber-600 text-white'
                        : 'bg-[#105C45] text-white hover:bg-[#0c4735]'
                    }`}
                    title={
                      isCurrentPlaying && isPlaying
                        ? 'إيقاف مؤقت'
                        : 'تشغيل هذه الآية فقط (بدون الانتقال للتالية)'
                    }
                  >
                    {isCurrentPlaying && isPlaying && playbackMode !== 'infinite' ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current translate-x-[-1px]" />
                    )}
                  </button>

                  {/* زر على الاية يمكن من اعادة الاية عدد غير منتهي (تكرار لا نهائي) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleInfiniteAyah(ayah.numberInSurah);
                    }}
                    className={`px-1.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-0.5 transition-all active:scale-95 shadow-xs ${
                      isInfiniteForThis && isPlaying
                        ? 'bg-amber-500 text-white ring-2 ring-amber-300 shadow-amber-200'
                        : isInfiniteForThis && !isPlaying
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-800 border border-slate-200'
                    }`}
                    title="تكرار هذه الآية بشكل غير منتهي (للتثبيت والحفظ)"
                  >
                    <Repeat className="w-3 h-3" />
                    <span className="font-mono text-[11px] leading-none">∞</span>
                  </button>
                </div>

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

                  <div className="flex items-center gap-2 mt-1">
                    {isMemorized && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> تم الحفظ
                      </span>
                    )}

                    {isInfiniteForThis && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-900 font-bold bg-amber-200 px-2 py-0.5 rounded-full animate-pulse">
                        <Repeat className="w-3 h-3" /> تكرار مستمر ∞
                      </span>
                    )}
                  </div>
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

      {/* Floating Audio Player Bar with Controls (شريط تشغيل الصوت مع أزرار التحكم) */}
      {playingAyahNum !== null && (
        <div className="fixed sm:absolute bottom-[68px] left-0 right-0 z-40 bg-gradient-to-b from-[#0F533E] to-[#0A3D2D] text-white px-3.5 py-2.5 shadow-2xl border-t-2 border-[#D4AF37]/50 sm:rounded-t-2xl animate-fadeIn">
          {/* Top Row: Ayah Info & Status Badge & Close Button */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-amber-300 font-cairo text-sm">
                آية {playingAyahNum} من سورة {surah.name}
              </span>

              {/* Mode Badge */}
              <button
                onClick={handleTogglePlayerMode}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                  playbackMode === 'infinite'
                    ? 'bg-amber-400 text-amber-950 shadow-xs'
                    : playbackMode === 'surah'
                    ? 'bg-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title="اضغط لتغيير وضع التشغيل"
              >
                {playbackMode === 'infinite' ? (
                  <>
                    <Repeat className="w-3 h-3" />
                    <span>تكرار مستمر ∞</span>
                  </>
                ) : playbackMode === 'surah' ? (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>كامل السورة</span>
                  </>
                ) : (
                  <>
                    <span>آية واحدة فقط</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed Button */}
              <button
                onClick={handleCycleSpeed}
                className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 transition-colors text-amber-200"
                title="سرعة التلاوة"
              >
                {playbackSpeed}x
              </button>

              {/* Close Button */}
              <button
                onClick={handleClosePlayer}
                className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                title="إغلاق مشغل الصوت"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Progress Scrubber Slider */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-emerald-200 w-8 text-left">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            />
            <span className="text-[10px] font-mono text-emerald-200 w-8 text-right">
              {formatTime(duration)}
            </span>
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-center gap-4">
            {/* Previous Ayah (in RTL layout: previous ayah is on right or previous number) */}
            <button
              onClick={handlePrevAyah}
              disabled={playingAyahNum <= 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                playingAyahNum <= 1
                  ? 'opacity-30 cursor-not-allowed text-slate-400'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title="الآية السابقة"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Central Play/Pause Button */}
            <button
              onClick={handleTogglePlayerPlayPause}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0c4735] font-bold flex items-center justify-center shadow-lg transform active:scale-95 transition-all"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-[-1px]" />
              )}
            </button>

            {/* Next Ayah */}
            <button
              onClick={handleNextAyah}
              disabled={playingAyahNum >= surah.ayahs.length}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                playingAyahNum >= surah.ayahs.length
                  ? 'opacity-30 cursor-not-allowed text-slate-400'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title="الآية التالية"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Toggle Infinite Repeat Button inside Player */}
            <button
              onClick={() => {
                if (playbackMode === 'infinite') {
                  setPlaybackMode('single');
                } else {
                  setPlaybackMode('infinite');
                }
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                playbackMode === 'infinite'
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-sm'
                  : 'bg-white/15 hover:bg-white/25 text-slate-200'
              }`}
              title="تفعيل/تعطيل التكرار اللانهائي للآية"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">∞</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar (Matching Storyboard: التفسير المبسط / تسجيل الحفظ / المزيد) */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-4 flex items-center justify-between z-30 shadow-lg">
        {/* Simplified Tafseer */}
        <button
          onClick={() => onOpenAyahTafseer(surah.ayahs[0])}
          className="flex-1 py-2 px-2 flex flex-col items-center justify-center gap-1 text-[#105C45] hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <BookOpen className="w-5 h-5 text-[#105C45]" />
          <span className="text-xs font-bold font-cairo">التفسير المبسط</span>
        </button>

        <div className="w-px h-7 bg-slate-200" />

        {/* Record Memorization */}
        <button
          onClick={onOpenLogMemorization}
          className="flex-1 py-2 px-2 flex flex-col items-center justify-center gap-1 text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 rounded-xl transition-colors mx-2"
        >
          <BookmarkCheck className="w-5 h-5 text-emerald-700" />
          <span className="text-xs font-bold font-cairo">تسجيل الحفظ</span>
        </button>

        <div className="w-px h-7 bg-slate-200" />

        {/* More */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex-1 py-2 px-2 flex flex-col items-center justify-center gap-1 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-xs font-bold font-cairo">المزيد</span>
        </button>
      </div>
    </div>
  );
};

