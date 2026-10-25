import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Surah } from '../types';

interface LogMemorizationModalProps {
  surah: Surah;
  onSave: (fromAyah: number, toAyah: number, durationMinutes?: number, notes?: string) => void;
  onClose: () => void;
}

export const LogMemorizationModal: React.FC<LogMemorizationModalProps> = ({
  surah,
  onSave,
  onClose,
}) => {
  const [fromAyah, setFromAyah] = useState<number>(1);
  const [toAyah, setToAyah] = useState<number>(Math.min(5, surah.ayahsCount));
  const [duration, setDuration] = useState<string>('15 دقيقة');
  const [notes, setNotes] = useState<string>('حفظ متقن وممتاز ما شاء الله');

  const ayahsAddedCount = Math.max(0, toAyah - fromAyah + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (toAyah < fromAyah) {
      alert('يجب أن تكون نهاية النطاق أكبر من أو تساوي بدايته');
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // non-blocking
    }

    onSave(fromAyah, toAyah, parseInt(duration) || 15, notes);
  };

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between p-5 sm:p-6 bg-[#FDFBF7] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
            title="إلغاء"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="text-xs font-semibold text-[#105C45] bg-[#E8F5E9] px-3 py-1 rounded-full">
            سورة {surah.name} ({surah.ayahsCount} آية)
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold text-[#105C45] font-cairo">
            تسجيل الحفظ
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            اختر نطاق الآيات التي حفظها الطفل
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Range Selection Dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            {/* From Ayah */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
                من الآية
              </label>
              <select
                value={fromAyah}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFromAyah(val);
                  if (toAyah < val) setToAyah(val);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E2D8C3] focus:border-[#105C45] text-slate-800 font-bold text-center shadow-sm outline-none cursor-pointer"
              >
                {Array.from({ length: surah.ayahsCount }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* To Ayah */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
                إلى الآية
              </label>
              <select
                value={toAyah}
                onChange={(e) => setToAyah(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E2D8C3] focus:border-[#105C45] text-slate-800 font-bold text-center shadow-sm outline-none cursor-pointer"
              >
                {Array.from({ length: surah.ayahsCount }, (_, i) => i + 1)
                  .filter((num) => num >= fromAyah)
                  .map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Ayahs Count Indicator Box (Matching Storyboard: سيتم إضافة X آيات) */}
          <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-3xl p-5 text-center flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-emerald-800">
              سيتم إضافة
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-black text-[#105C45] font-cairo">
                {ayahsAddedCount}
              </span>
              <span className="text-lg font-bold text-[#105C45]">آيات</span>
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
          </div>

          {/* Duration (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>مدة الجلسة (اختياري)</span>
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="مثال: 15 دقيقة"
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E2D8C3] focus:border-[#105C45] text-slate-800 text-sm font-medium shadow-sm outline-none text-right"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>ملاحظات (اختياري)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: حفظ جيد، بحاجة لمراجعة المدود"
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E2D8C3] focus:border-[#105C45] text-slate-800 text-sm font-medium shadow-sm outline-none text-right"
            />
          </div>

          {/* Submit Save Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#105C45] hover:bg-[#0c4a37] text-white font-bold text-lg shadow-lg shadow-emerald-950/20 transition-all transform active:scale-[0.98] mt-6"
          >
            حفظ
          </button>
        </form>
      </div>
    </div>
  );
};
