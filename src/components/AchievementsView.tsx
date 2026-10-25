import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Star,
  Download,
  Eye,
  Lock,
  CheckCircle2,
  Trophy,
  Compass,
  FileCheck2
} from 'lucide-react';
import { BadgeItem, CertificateItem, ChildProfile } from '../types';

interface AchievementsViewProps {
  badges: BadgeItem[];
  certificates: CertificateItem[];
  profile: ChildProfile;
  onViewCertificate: (cert: CertificateItem) => void;
  onBack: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  badges,
  certificates,
  profile,
  onViewCertificate,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'certificates' | 'upcoming'>('badges');

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#F8F5EE] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20 pb-6">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-amber-100 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
            title="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-slate-800 font-cairo">
            الإنجازات والشهادات
          </h2>
          <div className="w-10" />
        </div>

        {/* Tab Controls (Matching Storyboard: الأوسمة | الشهادات | الإنجازات القادمة) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F1EDE1] rounded-2xl">
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'badges'
                ? 'bg-[#105C45] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الأوسمة
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'certificates'
                ? 'bg-[#105C45] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الشهادات
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'upcoming'
                ? 'bg-[#105C45] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الإنجازات القادمة
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* TAB 1: BADGES (Matching Storyboard: Gold Star, Green Shield, Bronze Medal) */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                    badge.isUnlocked
                      ? 'bg-white border-amber-200 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  {/* Badge Medallion Graphic */}
                  <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                    {badge.icon === 'star' ? (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-md border-2 border-yellow-200">
                        <Star className="w-8 h-8 text-white fill-white" />
                      </div>
                    ) : badge.icon === 'compass' ? (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md border-2 border-emerald-200">
                        <Compass className="w-8 h-8 text-white" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 flex items-center justify-center shadow-md border-2 border-amber-300">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    )}
                    {badge.isUnlocked && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-white absolute bottom-0 right-0 shadow" />
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 font-cairo">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>

            {/* More Badges */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-amber-100 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 font-cairo">
                أوسمة متقدمة
              </h3>
              <div className="space-y-2.5">
                {badges.slice(3).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FFFDF9] border border-amber-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{badge.title}</div>
                        <div className="text-[11px] text-slate-500">{badge.description}</div>
                      </div>
                    </div>
                    {badge.isUnlocked ? (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        مكتمل
                      </span>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATES (Matching Storyboard: شهاداتك list) */}
        {(activeTab === 'certificates' || activeTab === 'badges') && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 font-cairo flex items-center justify-between">
              <span>شهاداتك المكتسبة</span>
              <span className="text-xs text-emerald-700 font-bold">{certificates.length} شهادات</span>
            </h3>

            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-amber-100 flex items-center justify-between gap-3"
                >
                  {/* Certificate Mini Preview Thumbnail */}
                  <div
                    onClick={() => onViewCertificate(cert)}
                    className="w-16 h-20 rounded-xl bg-[#FFFBF0] border-2 border-amber-300/80 p-1 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500 transition-colors shrink-0 shadow-xs"
                  >
                    <div className="w-4 h-4 rounded-full bg-amber-200 mb-1 flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 text-amber-700 fill-amber-700" />
                    </div>
                    <div className="text-[7px] font-bold text-amber-900 leading-none">
                      شهادة إنجاز
                    </div>
                    <div className="text-[6px] text-emerald-800 font-bold mt-1">
                      {cert.childName}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 font-cairo">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {cert.date}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      {cert.badgeTitle}
                    </span>
                  </div>

                  {/* Actions (عرض الشهادة / تنزيل) */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => onViewCertificate(cert)}
                      className="px-3 py-1.5 rounded-xl bg-[#105C45] hover:bg-[#0c4735] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      عرض الشهادة
                    </button>
                    <button
                      onClick={() => onViewCertificate(cert)}
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                      title="تنزيل الشهادة"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: UPCOMING */}
        {activeTab === 'upcoming' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 font-cairo">
              أهدافك القادمة في جزء عم
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>إتمام سورة النازعات (46 آية)</span>
                  <span className="text-emerald-700">الهدف التالي</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className="w-1/4 h-full bg-[#105C45] rounded-full" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>الوصول إلى 50% من جزء عم (282 آية)</span>
                  <span className="text-slate-500">24% حالياً</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200">
                  <div className="w-1/2 h-full bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
