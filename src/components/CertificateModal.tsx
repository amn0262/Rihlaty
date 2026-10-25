import React, { useState } from 'react';
import { ArrowRight, Printer, Download, Share2, Star, Check } from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  certificate: CertificateItem;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `شهادة إنجاز قرآني للبطل ${certificate.childName}`,
        text: `مبروك للبطل ${certificate.childName} إتمام ${certificate.title} في تطبيق رحلتي مع القرآن!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `🎉 شهادة إنجاز قرآني للبطل ${certificate.childName} تقديراً لحفظه ${certificate.surahName} (${certificate.ayahsCount} آية) في تطبيق رحلتي مع القرآن! 🌟`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownload = () => {
    // For web download, printing to PDF is standard and accessible
    window.print();
  };

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#F8F5EE] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20 pb-4">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-amber-100 flex items-center justify-between shrink-0 no-print">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
          title="رجوع"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-black text-[#105C45] font-cairo">
          شهادة إنجاز
        </h2>
        <div className="w-10" />
      </div>

      {/* Printable Certificate Frame */}
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
        <div
          id="printable-certificate"
          className="relative w-full rounded-3xl bg-gradient-to-b from-[#FFFDF7] via-[#FFFDF5] to-[#FBF7EB] p-6 border-4 border-[#D4AF37] shadow-xl text-center flex flex-col justify-between min-h-[560px]"
        >
          {/* Ornate Frame Corners */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Hanging Lanterns Top Border */}
          <div className="flex justify-between items-start px-2 opacity-80 mb-2">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-600" />
              <div className="w-3.5 h-5 rounded bg-amber-400 border border-amber-600" />
            </div>
            {/* Top Brand Logo */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#105C45] font-cairo">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>رِحْلَتِي مَعَ الْقُرْآنِ</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-600" />
              <div className="w-3.5 h-5 rounded bg-amber-400 border border-amber-600" />
            </div>
          </div>

          {/* Certificate Main Title */}
          <div className="my-2">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-900 text-[11px] font-bold mb-2">
              شهادة فخر واعتزاز
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#105C45] font-cairo tracking-wide">
              شَهَادَةُ إِنْجَازٍ قُرْآنِيّ
            </h1>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              تُمنَحُ بِكُلِّ فَخْرٍ وَاعْتِزَازٍ لِلْبَطَلِ / لِلْبَطَلَةِ:
            </p>
          </div>

          {/* Child Name Calligraphy Display */}
          <div className="my-3 py-2 px-6 rounded-2xl bg-amber-50/80 border-2 border-dashed border-amber-300 max-w-xs mx-auto">
            <span className="text-3xl md:text-4xl font-black text-[#105C45] font-cairo tracking-wide">
              {certificate.childName}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium px-4">
            تَقْدِيراً لِجُهْدِهِ وَاجْتِهَادِهِ فِي حِفْظِ وَفَهْمِ كِتَابِ اللَّهِ تَعَالَى
          </p>

          {/* Badge Ribbon (Matching Storyboard: بداية مباركة) */}
          <div className="my-3 flex justify-center">
            <div className="px-5 py-2 rounded-full bg-[#105C45] text-amber-200 font-bold text-sm shadow-md border-2 border-amber-300 flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{certificate.badgeTitle}</span>
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>
          </div>

          {/* Details Table */}
          <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 text-xs text-slate-700 space-y-1.5 max-w-xs mx-auto text-right w-full shadow-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">الإنجاز:</span>
              <span className="font-bold text-[#105C45] font-cairo">{certificate.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">السورة:</span>
              <span className="font-bold text-slate-800 font-cairo">{certificate.surahName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">الآيات المحفوظة:</span>
              <span className="font-bold text-slate-800">
                <span className="font-mono tabular-nums ml-1">{certificate.ayahsCount}</span>
                <span>آية</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">تاريخ الإنجاز:</span>
              <span className="font-bold text-slate-800 font-mono tabular-nums">{certificate.date}</span>
            </div>
          </div>

          {/* Blessing Footer & Mosque Silhouettes */}
          <div className="mt-4 pt-3 border-t border-amber-200/60">
            <p className="text-xs font-bold text-[#105C45] font-cairo">
              بَارَكَ اللَّهُ فِيكَ وَجَعَلَ الْقُرْآنَ رَفِيقَ دَرْبِكَ دَائِماً
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons (Matching Storyboard: طباعة | تحميل PDF | مشاركة) */}
      <div className="p-4 bg-white border-t border-amber-100 flex items-center gap-2 shrink-0 no-print">
        <button
          onClick={handlePrint}
          className="flex-1 py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 py-3 px-3 rounded-2xl bg-[#105C45] hover:bg-[#0c4735] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>تحميل PDF</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 py-3 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'تم النسخ!' : 'مشاركة'}</span>
        </button>
      </div>
    </div>
  );
};
