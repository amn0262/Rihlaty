import React, { useState } from 'react';
import { ArrowRight, Camera, ChevronDown } from 'lucide-react';
import { ChildProfile } from '../types';
import { AVATAR_OPTIONS } from '../data/avatars';
import { ChildAvatar } from './ChildAvatar';

interface ProfileSetupViewProps {
  initialProfile: ChildProfile;
  onSave: (profile: ChildProfile) => void;
  onBack: () => void;
}

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  initialProfile,
  onSave,
  onBack,
}) => {
  const [name, setName] = useState(initialProfile.name || 'عمر');
  const [age, setAge] = useState<number>(initialProfile.age || 7);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(initialProfile.avatarId || 'boy-omar');
  const [error, setError] = useState<string>('');

  const handleNext = () => {
    if (!name.trim()) {
      setError('يرجى إدخال اسم الطفل');
      return;
    }
    setError('');
    onSave({
      ...initialProfile,
      name: name.trim(),
      age,
      avatarId: selectedAvatar,
    });
  };

  return (
    <div className="relative min-h-screen sm:min-h-[780px] w-full max-w-md mx-auto sm:rounded-[36px] overflow-hidden sm:shadow-2xl flex flex-col justify-between p-5 sm:p-6 bg-[#FDFBF7] text-[#1E293B] border-0 sm:border-8 sm:border-[#105C45]/20">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#EDE7D9] hover:bg-[#E2D9C6] flex items-center justify-center text-[#105C45] transition-colors"
            title="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="text-xs font-semibold text-[#105C45] bg-[#E8F5E9] px-3 py-1 rounded-full">
            الخطوة 1 من 3
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold text-[#105C45] font-cairo">
            أهلاً بك في رحلتك المباركة
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            لنبدأ بإضافة بعض المعلومات
          </p>
        </div>

        {/* Big Avatar with camera icon */}
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="relative">
            <ChildAvatar avatarId={selectedAvatar} size="xl" />
            <button
              type="button"
              onClick={() => {
                // Cycle avatar
                const idx = AVATAR_OPTIONS.findIndex(a => a.id === selectedAvatar);
                const next = AVATAR_OPTIONS[(idx + 1) % AVATAR_OPTIONS.length];
                setSelectedAvatar(next.id);
              }}
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#105C45] text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-[#0d4a37] transition-transform active:scale-90"
              title="تغيير الصورة"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="mt-6 space-y-4">
          {/* Child Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
              اسم الطفل
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="مثال: عمر"
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E2D8C3] focus:border-[#105C45] focus:ring-2 focus:ring-[#105C45]/20 text-slate-800 font-medium text-center shadow-sm transition-all text-base outline-none"
            />
            {error && (
              <p className="text-xs text-rose-500 mt-1 text-center font-medium">{error}</p>
            )}
          </div>

          {/* Child Age */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
              العمر
            </label>
            <div className="relative">
              <select
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full appearance-none px-4 py-3 rounded-2xl bg-white border border-[#E2D8C3] focus:border-[#105C45] focus:ring-2 focus:ring-[#105C45]/20 text-slate-800 font-medium text-center shadow-sm transition-all text-base outline-none cursor-pointer"
              >
                {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((val) => (
                  <option key={val} value={val}>
                    {val} سنوات
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Choose Avatar Grid */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-right">
              اختر صورة
            </label>
            <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 px-1">
              {AVATAR_OPTIONS.map((item) => {
                const isSelected = selectedAvatar === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAvatar(item.id)}
                    className={`relative rounded-full transition-all transform active:scale-95 ${
                      isSelected
                        ? 'ring-4 ring-[#105C45] scale-110 shadow-md'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <ChildAvatar avatarId={item.id} size="sm" showBorder={false} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Stepper */}
      <div className="mt-8">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#105C45] hover:bg-[#0d4a37] text-white font-bold text-lg shadow-lg shadow-emerald-900/20 transition-all transform active:scale-[0.98]"
        >
          التالي
        </button>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-4 px-4 font-medium">
          <div className="flex items-center gap-1.5 text-[#105C45] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#105C45]" />
            <span>معلومات الطفل</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>جولة تعريفية</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>جاهز للبدء</span>
          </div>
        </div>
      </div>
    </div>
  );
};
