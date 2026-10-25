import React from 'react';
import { ArrowRight, ExternalLink, Heart, Star, Palette, Share2, Layers, CheckCircle2 } from 'lucide-react';

interface DeveloperSectionProps {
  onBack: () => void;
  onOpenStoryboard: () => void;
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({
  onBack,
  onOpenStoryboard,
}) => {
  const BEHANCE_URL = 'https://www.behance.net/aymenbakkour';
  const FACEBOOK_URL = 'https://www.facebook.com/bakkour.aymen';

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between bg-[#F8F5EE] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20 pb-6">
      {/* Top Header */}
      <div className="p-4 bg-white border-b border-amber-100 flex items-center justify-between shrink-0 shadow-sm">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
          title="رجوع"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-black text-[#105C45] font-cairo">
          عن المطور والمصمم
        </h2>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Profile Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e4836] via-[#105C45] to-[#15803d] text-white p-6 shadow-lg text-center flex flex-col items-center">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Designer Avatar Badge */}
          <div className="relative w-24 h-24 rounded-full bg-white/10 border-4 border-amber-300/80 p-1 mb-3 shadow-inner flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-200 to-amber-100 text-[#105C45] flex items-center justify-center font-bold text-3xl font-cairo shadow">
              أ ب
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-white font-cairo tracking-wide">
            أيمن بكور
          </h3>
          <p className="text-amber-200 text-xs font-semibold mt-1">
            Aymen Bakkour · UI/UX Designer & App Creator
          </p>

          <p className="text-xs text-emerald-100 mt-3 leading-relaxed max-w-xs font-medium">
            مُصمم واجهات وتجربة مستخدم شغوف بابتكار تطبيقات هادفة وتعليمية للأطفال تجمع بين الأصالة والتقنية الحديثة.
          </p>
        </div>

        {/* Links Cards (Behance & Facebook) */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-800 font-cairo px-1">
            حسابات المطور الرسمية
          </h4>

          {/* Behance Link Card */}
          <a
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-3xl bg-white border-2 border-[#0057ff]/20 hover:border-[#0057ff] hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              {/* Behance Brand Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#0057ff] text-white flex items-center justify-center font-bold text-xl font-mono shadow-sm shrink-0">
                Bē
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 font-cairo">
                  <span>معرض الأعمال على Behance</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0057ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  behance.net/aymenbakkour
                </div>
                <div className="text-[11px] text-[#0057ff] font-medium mt-1">
                  استكشف مشاريع وتصاميم واجهات المستخدم
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0057ff] flex items-center justify-center shrink-0 group-hover:translate-x-[-2px] transition-transform">
              <ArrowRight className="w-4 h-4 transform rotate-180" />
            </div>
          </a>

          {/* Facebook Link Card */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-3xl bg-white border-2 border-[#1877f2]/20 hover:border-[#1877f2] hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              {/* Facebook Brand Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#1877f2] text-white flex items-center justify-center font-bold text-xl font-mono shadow-sm shrink-0">
                f
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 font-cairo">
                  <span>الحساب الشخصي على فيسبوك</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1877f2] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  facebook.com/bakkour.aymen
                </div>
                <div className="text-[11px] text-[#1877f2] font-medium mt-1">
                  تواصل مباشر ومتابعة التحديثات والأفكار
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1877f2] flex items-center justify-center shrink-0 group-hover:translate-x-[-2px] transition-transform">
              <ArrowRight className="w-4 h-4 transform rotate-180" />
            </div>
          </a>
        </div>

        {/* Project Vision & Story */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-3">
          <div className="flex items-center gap-2 text-[#105C45] font-bold text-sm font-cairo">
            <Palette className="w-4 h-4" />
            <span>رؤية تطبيق "رحلتي مع القرآن"</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium text-right">
            يهدف هذا العمل الإبداعي إلى تقريب كلام الله لأفئدة الأطفال الصغار من خلال:
          </p>

          <ul className="space-y-2 text-xs text-slate-700 text-right pr-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>تبسيط المعاني وتفسير الآيات بأسلوب قصصي تفاعلي يناسب مدارك الطفل.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ربط كل آية برسالة وقيمة إسلامية عملية تطبق في السلوك اليومي.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>التحفيز الإيجابي المستمر بالأوسمة وشهادات التقدير القابلة للطباعة والمشاركة.</span>
            </li>
          </ul>
        </div>

        {/* Storyboard View Button */}
        <button
          onClick={onOpenStoryboard}
          className="w-full py-3.5 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <Layers className="w-4 h-4 text-amber-700" />
          <span>معاينة مخطط الواجهات العشر (Storyboard Layout)</span>
        </button>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[11px] text-slate-400 font-medium px-4 pt-2">
        تصميم وتطوير أيمن بكور © جميع الحقوق محفوظة
      </div>
    </div>
  );
};
