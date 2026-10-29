import React from 'react';
import { TajweedRuleType, TajweedRuleOccurrence } from '../types';

export interface TajweedCatalogItem {
  id: TajweedRuleType;
  name: string;
  category: string;
  colorHex: string;
  tailwindText: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
  howToPronounce: string;
  sampleWord: string;
  mizanCount?: string;
}

export const TAJWEED_RULES_CATALOG: TajweedCatalogItem[] = [
  {
    id: 'madd_obligatory',
    name: 'المد اللازم (6 حركات)',
    category: 'المدود',
    colorHex: '#B91C1C', // Dark Crimson
    tailwindText: 'text-rose-700',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-800',
    badgeBorder: 'border-rose-300',
    description: 'يحدث عند مجيء حرف مد بعده سكون أصلي أو حرف مشدد في نفس الكلمة.',
    howToPronounce: 'يُمَدّ الصوت بمقدار 6 حركات كاملة دون زيادة أو نقصان بصوت واضح وقوي.',
    sampleWord: 'ٱلضَّآلِّينَ • الحَآقَّةُ',
    mizanCount: '6 حركات',
  },
  {
    id: 'madd_permissible',
    name: 'المد الواجب والجائز (4 - 5 حركات)',
    category: 'المدود',
    colorHex: '#DC2626', // Bright Red
    tailwindText: 'text-red-600',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-800',
    badgeBorder: 'border-red-300',
    description: 'مد متصل إذا جاءت الهمزة بعد المد في نفس الكلمة، أو منفصل في كلمتين.',
    howToPronounce: 'يُمَدّ الصوت بمقدار 4 إلى 5 حركات بمد لطيف متوازن عند علامة المد ( ٓ ).',
    sampleWord: 'يَتَسَآءَلُونَ • جَآءَ • بِمَآ أُنزِلَ',
    mizanCount: '4 - 5 حركات',
  },
  {
    id: 'ghunnah',
    name: 'الغنة المشددة والإدغام بغنة',
    category: 'الغنة',
    colorHex: '#059669', // Emerald Green
    tailwindText: 'text-emerald-700',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-300',
    description: 'النون والميم المشددتان، أو النون الساكنة والتنوين عند حروف (ينمو).',
    howToPronounce: 'صوت رخيم يخرج من الخيشوم (الأنف) بمقدار حركتين بلطف ودون تكلف.',
    sampleWord: 'عَمَّ • إِنَّ • مَن يَقُولُ',
    mizanCount: 'حركتان',
  },
  {
    id: 'ikhfa',
    name: 'الإخفاء الحقيقي والشفوي',
    category: 'الإخفاء',
    colorHex: '#16A34A', // Green
    tailwindText: 'text-green-600',
    badgeBg: 'bg-green-50',
    badgeText: 'text-green-800',
    badgeBorder: 'border-green-300',
    description: 'ستر النون الساكنة أو التنوين عند حروف الإخفاء الـ 15، أو الميم قبل الباء.',
    howToPronounce: 'نطق النون بحالة بين الإظهار والإدغام مع بقاء غنة لطيفة دون تشديد.',
    sampleWord: 'مِن قَبْلِ • كِتَٰبٌ كَرِيمٌ • هُم بِهِ',
    mizanCount: 'حركتان',
  },
  {
    id: 'qalqalah',
    name: 'القلقلة (قطب جد)',
    category: 'القلقلة',
    colorHex: '#0284C7', // Sky Blue
    tailwindText: 'text-sky-600',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-800',
    badgeBorder: 'border-sky-300',
    description: 'اضطراب واهتزاز في مخرج الحرف عند النطق به ساكناً حتى يُسمع له نبرة قوية.',
    howToPronounce: 'اهتزاز لطيف على حروف (ق، ط، ب، ج، د) الساكنة أو الموقوف عليها.',
    sampleWord: 'نَجْعَلِ • أَطْعَمَهُم • الفَلَقْ • حَبْلٌ',
    mizanCount: 'نبرة اهتزاز',
  },
  {
    id: 'iqlab',
    name: 'الإقلاب (قلب النون ميماً)',
    category: 'الإقلاب',
    colorHex: '#D97706', // Amber / Orange
    tailwindText: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    badgeBorder: 'border-amber-300',
    description: 'قلب النون الساكنة أو التنوين ميماً مخفاة بغنة إذا جاء بعدها حرف الباء ( ۢ ).',
    howToPronounce: 'تُنطق النون ميماً خفيفة دون إطباق الشفتين بقوة مع غنة بمقدار حركتين.',
    sampleWord: 'مِنۢ بَعْدِ • لَيُنۢبَذَنَّ • عَلِيمٌۢ بِذَاتِ',
    mizanCount: 'حركتان',
  },
  {
    id: 'idgham_no_ghunnah',
    name: 'الإدغام بغير غنة وما لا يُلفظ',
    category: 'الإدغام والصلة',
    colorHex: '#64748B', // Slate / Gray
    tailwindText: 'text-slate-400',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-300',
    description: 'إدخال النون في (اللام والراء) بدون غنة، وحروف الصلة والهمزات التي لا تلفظ وصلاً.',
    howToPronounce: 'يتم إسقاط الحرف تماماً والانتقال مباشرة للحرف التالي دون مد ولا غنة.',
    sampleWord: 'مِن رَّبِّهِم • هُدًى لِّلْمُتَّقِينَ • ٱلَّذِينَ',
    mizanCount: 'بدون غنة',
  },
];

/**
 * Analyzes an Ayah text and extracts all detected Tajweed rules with snippets and explanations.
 */
export function detectAyahTajweedRules(text: string): TajweedRuleOccurrence[] {
  const rules: TajweedRuleOccurrence[] = [];
  const words = text.split(/\s+/).filter(Boolean);

  // 1. Check for Madd اللازم (Maddah followed by Shaddah in same word)
  for (const word of words) {
    if (word.includes('\u0653') && word.includes('\u0651')) {
      rules.push({
        type: 'madd_obligatory',
        name: 'مد لازم كلمي (6 حركات)',
        ruleTitle: 'مد لازم 6 حركات',
        colorName: 'أحمر داكن',
        colorHex: '#B91C1C',
        snippet: word,
        description: `في كلمة «${word}»: جاء بعد حرف المد حرف مشدد في نفس الكلمة.`,
        pronunciationTip: 'يُمدّ الصوت بمقدار 6 حركات متصلة بصوت قوي ومثبت.',
      });
      break;
    }
  }

  // 2. Check for Madd الواجب / الجائز (Maddah symbol ٓ)
  for (const word of words) {
    if (word.includes('\u0653') && !word.includes('\u0651')) {
      rules.push({
        type: 'madd_permissible',
        name: 'مد واجب متصل أو جائز منفصل',
        ruleTitle: 'مد 4 إلى 5 حركات',
        colorName: 'أحمر',
        colorHex: '#DC2626',
        snippet: word,
        description: `في كلمة «${word}»: لوجود علامة المد ( ٓ ) يعقبها حرف الهمزة.`,
        pronunciationTip: 'يُمدّ حرف المد بمقدار 4 إلى 5 حركات متوازنة لجمال التلاوة.',
      });
      break;
    }
  }

  // 3. Check for Ghunnah مشددة (نّ or مّ)
  for (const word of words) {
    if (/(?:[نم][\u064B-\u0650\u0652]*[\u0651]|[\u0651][\u064B-\u0650\u0652]*[نم])/u.test(word) ||
        word.includes('نَّ') || word.includes('نِّ') || word.includes('نُّ') ||
        word.includes('مَّ') || word.includes('مِّ') || word.includes('مُّ') ||
        word.includes('عَمَّ') || word.includes('إِنَّ') || word.includes('ثُمَّ')) {
      rules.push({
        type: 'ghunnah',
        name: 'غنة مشددة (حركتان)',
        ruleTitle: 'غنة في النون أو الميم المشددة',
        colorName: 'أخضر زمردي',
        colorHex: '#059669',
        snippet: word,
        description: `في كلمة «${word}»: النون أو الميم المشددة لها غنة تخرج من الخيشوم.`,
        pronunciationTip: 'اضغط على الحرف المشدد برفق واحبس الغنة بمقدار حركتين (كالقبض والبسط).',
      });
      break;
    }
  }

  // 4. Check for Qalqalah (حروف قطب جد الساكنة أو الموقوف عليها: ق، ط، ب، ج، د)
  const qalqalahRegex = /[قطبجد](?:[\u0652\u06E1]|[\u064B-\u065F\u0670\u06D6-\u06ED]*$)/u;
  for (const word of words) {
    if (qalqalahRegex.test(word) || /[قطبجد]ْ/u.test(word)) {
      rules.push({
        type: 'qalqalah',
        name: 'قلقلة في حروف (ق، ط، ب، ج، د)',
        ruleTitle: 'قلقلة اهتزازية',
        colorName: 'أزرق سماوي',
        colorHex: '#0284C7',
        snippet: word,
        description: `في كلمة «${word}»: الحرف ساكن فيضطرب مخرجه عند النطق ليصدر صوتاً نبرياً جميلاً.`,
        pronunciationTip: 'انطق الحرف باهتزاز لطيف وسريع في المخرج دون إمالة للفتحة أو الضمة.',
      });
      break;
    }
  }

  // 5. Check for Iqlab (الميم الصغيرة ۢ فوق النون أو التنوين)
  for (const word of words) {
    if (word.includes('\u06E2') || word.includes('ۢ') || (word.includes('ن') && word.includes('ب'))) {
      if (word.includes('\u06E2') || word.includes('ۢ')) {
        rules.push({
          type: 'iqlab',
          name: 'إقلاب النون إلى ميم مخفاة',
          ruleTitle: 'إقلاب مع ميم صغيرة',
          colorName: 'عنبري / برتقالي',
          colorHex: '#D97706',
          snippet: word,
          description: `في كلمة «${word}»: قلبت النون أو التنوين ميماً مخفاة لمجيء الباء بعدها.`,
          pronunciationTip: 'اقلب النون ميماً مع تلامس الشفتين برفق تام وبقاء الغنة بمقدار حركتين.',
        });
        break;
      }
    }
  }

  // 6. Check for Idgham بغير غنة (مِن رَّبِّهِم، لِّلْمُتَّقِينَ)
  if (text.includes(' رَّ') || text.includes(' لَّ') || text.includes('مِّن رَّ') || text.includes('غَفُورٌ رَّ')) {
    rules.push({
      type: 'idgham_no_ghunnah',
      name: 'إدغام بغير غنة',
      ruleTitle: 'إدغام كامل في اللام والراء',
      colorName: 'رمادي',
      colorHex: '#64748B',
      snippet: 'حرف النون / التنوين المدغم',
      description: 'إدخال النون الساكنة أو التنوين في اللام أو الراء إدخالاً تاماً دون غنة.',
      pronunciationTip: 'انتقل مباشرة لنطق اللام أو الراء المشددة دون أي غنة أنفية.',
    });
  }

  return rules;
}

interface TajweedAyahTextProps {
  text: string;
  isColored?: boolean;
  className?: string;
  fontSize?: 'normal' | 'large';
}

/**
 * Component to display Ayah text with crisp, high-accuracy Tajweed color highlighting.
 */
export const TajweedAyahText: React.FC<TajweedAyahTextProps> = ({
  text,
  isColored = true,
  className = '',
  fontSize = 'normal',
}) => {
  if (!isColored) {
    return <span className={className}>{text}</span>;
  }

  // Tokenize text word by word or sub-word to safely colorize Tajweed letters
  const tokens = text.split(/(\s+|[ۘ-ۜ۩۞])/u);

  return (
    <span className={`tajweed-container ${className}`}>
      {tokens.map((token, idx) => {
        if (!token) return null;
        if (/^\s+$/.test(token)) {
          return <span key={idx}> </span>;
        }

        // Color check rules on this word:
        // 1. Madd obligatory (Maddah + Shaddah) -> Crimson #B91C1C
        if (token.includes('\u0653') && token.includes('\u0651')) {
          return (
            <span
              key={idx}
              className="text-[#B91C1C] font-semibold underline decoration-[#B91C1C]/40 decoration-wavy underline-offset-4"
              title="مد لازم كلمي (6 حركات)"
            >
              {token}
            </span>
          );
        }

        // 2. Madd permissible / obligatory (ٓ) -> Bright Red #DC2626
        if (token.includes('\u0653')) {
          return (
            <span
              key={idx}
              className="text-[#DC2626] font-semibold"
              title="مد متصل أو منفصل (4-5 حركات)"
            >
              {token}
            </span>
          );
        }

        // 3. Iqlab (with small meem ۢ) -> Amber #D97706
        if (token.includes('\u06E2') || token.includes('ۢ')) {
          return (
            <span
              key={idx}
              className="text-[#D97706] font-semibold"
              title="إقلاب مع ميم صغيرة بغنة"
            >
              {token}
            </span>
          );
        }

        // 4. Ghunnah on Noon or Meem with Shaddah -> Emerald #059669
        if (
          token.includes('نَّ') || token.includes('نِّ') || token.includes('نُّ') ||
          token.includes('مَّ') || token.includes('مِّ') || token.includes('مُّ') ||
          token.includes('عَمَّ') || token.includes('إِنَّ') || token.includes('ثُمَّ')
        ) {
          return (
            <span
              key={idx}
              className="text-[#059669] font-medium"
              title="غنة مشددة بمقدار حركتين"
            >
              {token}
            </span>
          );
        }

        // 5. Qalqalah (قطب جد with sukun) -> Sky Blue #0284C7
        if (/[قطبجد][\u0652\u06E1]/u.test(token) || /[قطبجد]ْ/u.test(token)) {
          return (
            <span
              key={idx}
              className="text-[#0284C7] font-medium"
              title="قلقلة في الحرف الساكن (قطب جد)"
            >
              {token}
            </span>
          );
        }

        // Default text color
        return (
          <span key={idx} className="text-slate-800">
            {token}
          </span>
        );
      })}
    </span>
  );
};
