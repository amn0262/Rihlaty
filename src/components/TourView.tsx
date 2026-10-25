import React, { useState } from 'react';
import { ArrowRight, Lightbulb, BookOpen, Award, CheckCircle2 } from 'lucide-react';

interface TourViewProps {
  onComplete: () => void;
  onBack: () => void;
}

export const TourView: React.FC<TourViewProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'شرح مبسط للأطفال',
      description: 'اضغط على أي آية لعرض شرح يفهمه الأطفال مع قيم إسلامية ورسائل تربوية لطيفة.',
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      tag: 'فهم وتدبر',
      previewType: 'ayah-tap',
    },
    {
      title: 'استمع وكرر مع القارئ',
      description: 'استمع للتلاوة بصوت عذب وكرر مع التكرار التلقائي لحفظ أسهل وأسرع.',
      icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
      tag: 'استماع وتكرار',
      previewType: 'audio-repeat',
    },
    {
      title: 'سجل حفظك واجمع الأوسمة',
      description: 'حدد الآيات التي أتقنت حفظها واحصل على أوسمة ذهبية وشهادات إنجاز باسمك!',
      icon: <Award className="w-8 h-8 text-amber-600" />,
      tag: 'تحفيز ومكافآت',
      previewType: 'badges',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = steps[currentStep];

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between p-5 sm:p-6 bg-[#FDFBF7] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
            title="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-[#105C45] bg-[#E8F5E9] px-3 py-1 rounded-full">
            جولة تعريفية {currentStep + 1} من 3
          </span>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold text-[#105C45] font-cairo">
            جولة سريعة في التطبيق
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            لنستكشف أهم الأجزاء معاً
          </p>
        </div>

        {/* Center Phone Mockup Illustration */}
        <div className="mt-6 flex flex-col items-center">
          <div className="relative w-64 h-80 rounded-[32px] bg-[#1E293B] p-3 shadow-2xl border-4 border-amber-300/60 flex flex-col">
            {/* Phone Screen Glass */}
            <div className="relative w-full h-full bg-[#FFFDF7] rounded-[24px] overflow-hidden p-3 flex flex-col border border-amber-200">
              {/* Fake Quran Page Header */}
              <div className="text-center pb-2 border-b border-amber-100">
                <span className="text-[11px] font-bold text-emerald-900 bg-amber-100/70 px-2.5 py-0.5 rounded-full font-cairo">
                  سورة النبأ
                </span>
              </div>

              {/* Quran Text Mock */}
              <div className="mt-2 text-right space-y-1.5 opacity-70">
                <p className="text-[13px] font-quran text-slate-800 leading-relaxed">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-[12px] font-quran text-slate-700 bg-emerald-50/60 p-1 rounded-lg">
                  عَمَّ يَتَسَآءَلُونَ ﴿١﴾ عَنِ النَّبَإِ الْعَظِيمِ ﴿٢﴾
                </p>
              </div>

              {/* Callout Bubble on the phone */}
              <div className="mt-auto mb-2 bg-white rounded-2xl p-3 shadow-lg border border-amber-200 relative animate-bounce-subtle">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{step.title}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  {step.description}
                </p>
              </div>

              {/* Hand Tapping Icon illustration */}
              <div className="absolute bottom-16 left-6 pointer-events-none">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 animate-ping absolute -top-1 -left-1" />
                  <span className="text-2xl drop-shadow">👆</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStep ? 'w-8 bg-[#105C45]' : 'w-2.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 space-y-2">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#105C45] hover:bg-[#0d4a37] text-white font-bold text-base shadow-lg shadow-emerald-900/20 transition-all transform active:scale-[0.98]"
        >
          {currentStep === steps.length - 1 ? 'جاهز للبدء!' : 'التالي'}
        </button>

        <button
          onClick={onComplete}
          className="w-full py-2.5 text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          تخطي
        </button>
      </div>
    </div>
  );
};
