import React from 'react';
import { ArrowRight, Star, Eye, Check, ExternalLink } from 'lucide-react';
import { AppScreen } from '../types';

interface StoryboardOverviewModalProps {
  onClose: () => void;
  onNavigateToScreen: (screen: AppScreen) => void;
}

export const StoryboardOverviewModal: React.FC<StoryboardOverviewModalProps> = ({
  onClose,
  onNavigateToScreen,
}) => {
  const screensList: { id: AppScreen; title: string; subtitle: string; row: number; col: number }[] = [
    { id: 'splash', title: '1. شاشة البداية والترحيب', subtitle: 'رحلتي مع القرآن - خطوة خطوة', row: 1, col: 1 },
    { id: 'profile-setup', title: '2. معلومات الطفل', subtitle: 'اختيار الاسم، العمر والصورة', row: 1, col: 2 },
    { id: 'tour', title: '3. جولة سريعة في التطبيق', subtitle: 'شرح مبسط، استمع وكرر', row: 1, col: 3 },
    { id: 'home', title: '4. لوحة المتابعة الرئيسية', subtitle: 'نسبة الحفظ 24%، سورة النبأ، أهداف اليوم', row: 1, col: 4 },
    { id: 'surahs-list', title: '5. قائمة سور جزء عم', subtitle: '37 سورة مع نسب الإنجاز', row: 1, col: 5 },
    { id: 'surah-reader', title: '6. قراءة وتلاوة السورة', subtitle: 'البسملة المزخرفة، استماع وحفظ الآيات', row: 2, col: 1 },
    { id: 'tafseer-detail', title: '7. التفسير المبسط للأطفال', subtitle: 'المعنى المبسط، رسالة لك، قيمة إسلامية', row: 2, col: 2 },
    { id: 'log-memorization', title: '8. نافذة تسجيل الحفظ', subtitle: 'تحديد نطاق الآيات ومدة الجلسة', row: 2, col: 3 },
    { id: 'achievements', title: '9. الأوسمة والشهادات', subtitle: 'بداية مباركة، صاحب الهمة، نجم الحفظ', row: 2, col: 4 },
    { id: 'certificate', title: '10. شهادة إنجاز قرآني', subtitle: 'شهادة تقدير مزخرفة قابلة للطباعة والمشاركة', row: 2, col: 5 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col p-4 md:p-6 overflow-y-auto">
      {/* Top Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-white/10 text-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="إغلاق"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-amber-300 font-cairo">
              مخطط الواجهات الكامل (Storyboard Layout)
            </h2>
            <p className="text-xs text-emerald-200">
              التصميم المعتمد لتطبيق جزء عم للأطفال · تصميم أيمن بكور
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-[#105C45] hover:bg-[#0c4a37] text-white text-xs font-bold transition-all shadow"
        >
          العودة للتطبيق التفاعلي
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto my-6 space-y-8 flex-1">
        {/* Storyboard Original Asset Image */}
        <div className="rounded-3xl overflow-hidden border-4 border-amber-400/40 shadow-2xl bg-[#0F172A] p-2">
          <div className="text-xs font-bold text-amber-300 py-2 px-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              مخطط التصميم الملون للشاشات العشر
            </span>
            <span className="text-[11px] text-slate-400">
              انقر على أي بطاقة بالأسفل لفتح الشاشة في التطبيق التفاعلي
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl">
            <img
              src="/public/assets/aistudio/Bunte_Kinder-Quran-App_im_Storyboard_Layout_5b951d78.png"
              alt="Bunte Kinder-Quran-App im Storyboard Layout"
              className="w-full h-auto min-w-[800px] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Interactive Screen Selector Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-cairo">
            شاشات التطبيق التفاعلية العشر (انقر لتجربة الشاشة مباشرة):
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {screensList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigateToScreen(item.id);
                  onClose();
                }}
                className="bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-400 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between group shadow-sm text-right"
              >
                <div>
                  <div className="text-xs font-bold text-amber-300 font-cairo group-hover:text-amber-200">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {item.subtitle}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-300 font-bold">
                  <span>فتح الشاشة</span>
                  <ArrowRight className="w-3.5 h-3.5 transform rotate-180 group-hover:translate-x-[-2px] transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
