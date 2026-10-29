import { Surah, BadgeItem, CertificateItem, ReciterId, RECITERS_LIST } from '../types';
import { ALL_114_SURAHS, ALL_30_AJZAA, QuranJuz } from './allQuranData';
import quranFullDatasetRaw from './quranFullDataset.json';

export { ALL_114_SURAHS, ALL_30_AJZAA, RECITERS_LIST };
export type { QuranJuz };

export const TOTAL_QURAN_AYAHS = 6236;
export const TOTAL_QURAN_SURAHS = 114;
export const JUZ_AMMA_SURAHS_COUNT = 37;
export const JUZ_AMMA_TOTAL_AYAHS = 564;

interface RawAyahDatasetItem {
  numberInSurah: number;
  text: string;
  tafseerText: string;
}

export const quranFullDataset = quranFullDatasetRaw as unknown as Record<string, RawAyahDatasetItem[]>;

// Detailed data for Surahs of Juz Amma
export const SURAHS_LIST_SUMMARY: Omit<Surah, 'ayahs'>[] = [
  { id: 78, name: 'النبأ', arabicName: 'سورة النَّبَإِ', revelationType: 'مكية', ayahsCount: 40, juz: 30, isLocked: false },
  { id: 79, name: 'النازعات', arabicName: 'سورة النَّازِعَاتِ', revelationType: 'مكية', ayahsCount: 46, juz: 30, isLocked: false },
  { id: 80, name: 'عبس', arabicName: 'سورة عَبَسَ', revelationType: 'مكية', ayahsCount: 42, juz: 30, isLocked: false },
  { id: 81, name: 'التكوير', arabicName: 'سورة التَّكْوِيرِ', revelationType: 'مكية', ayahsCount: 29, juz: 30, isLocked: false },
  { id: 82, name: 'الانفطار', arabicName: 'سورة الانْفِطَارِ', revelationType: 'مكية', ayahsCount: 19, juz: 30, isLocked: false },
  { id: 83, name: 'المطففين', arabicName: 'سورة المُطَفِّفِينَ', revelationType: 'مكية', ayahsCount: 36, juz: 30, isLocked: false },
  { id: 84, name: 'الانشقاق', arabicName: 'سورة الانْشِقَاقِ', revelationType: 'مكية', ayahsCount: 25, juz: 30, isLocked: false },
  { id: 85, name: 'البروج', arabicName: 'سورة البُرُوجِ', revelationType: 'مكية', ayahsCount: 22, juz: 30, isLocked: false },
  { id: 86, name: 'الطارق', arabicName: 'سورة الطَّارِقِ', revelationType: 'مكية', ayahsCount: 17, juz: 30, isLocked: false },
  { id: 87, name: 'الأعلى', arabicName: 'سورة الأَعْلَى', revelationType: 'مكية', ayahsCount: 19, juz: 30, isLocked: false },
  { id: 88, name: 'الغاشية', arabicName: 'سورة الغَاشِيَةِ', revelationType: 'مكية', ayahsCount: 26, juz: 30, isLocked: false },
  { id: 89, name: 'الفجر', arabicName: 'سورة الفَجْرِ', revelationType: 'مكية', ayahsCount: 30, juz: 30, isLocked: false },
  { id: 90, name: 'البلد', arabicName: 'سورة البَلَدِ', revelationType: 'مكية', ayahsCount: 20, juz: 30, isLocked: false },
  { id: 91, name: 'الشمس', arabicName: 'سورة الشَّمْسِ', revelationType: 'مكية', ayahsCount: 15, juz: 30, isLocked: false },
  { id: 92, name: 'الليل', arabicName: 'سورة اللَّيْلِ', revelationType: 'مكية', ayahsCount: 21, juz: 30, isLocked: false },
  { id: 93, name: 'الضحى', arabicName: 'سورة الضُّحَى', revelationType: 'مكية', ayahsCount: 11, juz: 30, isLocked: false },
  { id: 94, name: 'الشرح', arabicName: 'سورة الشَّرْحِ', revelationType: 'مكية', ayahsCount: 8, juz: 30, isLocked: false },
  { id: 95, name: 'التين', arabicName: 'سورة التِّينِ', revelationType: 'مكية', ayahsCount: 8, juz: 30, isLocked: false },
  { id: 96, name: 'العلق', arabicName: 'سورة العَلَقِ', revelationType: 'مكية', ayahsCount: 19, juz: 30, isLocked: false },
  { id: 97, name: 'القدر', arabicName: 'سورة القَدْرِ', revelationType: 'مكية', ayahsCount: 5, juz: 30, isLocked: false },
  { id: 98, name: 'البينة', arabicName: 'سورة البَيِّنَةِ', revelationType: 'مدنية', ayahsCount: 8, juz: 30, isLocked: false },
  { id: 99, name: 'الزلزلة', arabicName: 'سورة الزَّلْزَلَةِ', revelationType: 'مدنية', ayahsCount: 8, juz: 30, isLocked: false },
  { id: 100, name: 'العاديات', arabicName: 'سورة العَادِيَاتِ', revelationType: 'مكية', ayahsCount: 11, juz: 30, isLocked: false },
  { id: 101, name: 'القارعة', arabicName: 'سورة القَارِعَةِ', revelationType: 'مكية', ayahsCount: 11, juz: 30, isLocked: false },
  { id: 102, name: 'التكاثر', arabicName: 'سورة التَّكَاثُرِ', revelationType: 'مكية', ayahsCount: 8, juz: 30, isLocked: false },
  { id: 103, name: 'العصر', arabicName: 'سورة العَصْرِ', revelationType: 'مكية', ayahsCount: 3, juz: 30, isLocked: false },
  { id: 104, name: 'الهمزة', arabicName: 'سورة الهُمَزَةِ', revelationType: 'مكية', ayahsCount: 9, juz: 30, isLocked: false },
  { id: 105, name: 'الفيل', arabicName: 'سورة الفِيلِ', revelationType: 'مكية', ayahsCount: 5, juz: 30, isLocked: false },
  { id: 106, name: 'قريش', arabicName: 'سورة قُرَيْشٍ', revelationType: 'مكية', ayahsCount: 4, juz: 30, isLocked: false },
  { id: 107, name: 'الماعون', arabicName: 'سورة المَاعُونِ', revelationType: 'مكية', ayahsCount: 7, juz: 30, isLocked: false },
  { id: 108, name: 'الكوثر', arabicName: 'سورة الكَوْثَرِ', revelationType: 'مكية', ayahsCount: 3, juz: 30, isLocked: false },
  { id: 109, name: 'الكافرون', arabicName: 'سورة الكَافِرُونَ', revelationType: 'مكية', ayahsCount: 6, juz: 30, isLocked: false },
  { id: 110, name: 'النصر', arabicName: 'سورة النَّصْرِ', revelationType: 'مدنية', ayahsCount: 3, juz: 30, isLocked: false },
  { id: 111, name: 'المسد', arabicName: 'سورة المَسَدِ', revelationType: 'مكية', ayahsCount: 5, juz: 30, isLocked: false },
  { id: 112, name: 'الإخلاص', arabicName: 'سورة الإِخْلَاصِ', revelationType: 'مكية', ayahsCount: 4, juz: 30, isLocked: false },
  { id: 113, name: 'الفلق', arabicName: 'سورة الفَلَقِ', revelationType: 'مكية', ayahsCount: 5, juz: 30, isLocked: false },
  { id: 114, name: 'الناس', arabicName: 'سورة النَّاسِ', revelationType: 'مكية', ayahsCount: 6, juz: 30, isLocked: false },
];

// Rich kid-friendly Ayahs text & Tafseer for key surahs
export const SURAH_78_NABA_AYAHS = [
  {
    numberInSurah: 1,
    text: 'عَمَّ يَتَسَآءَلُونَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078001.mp3',
    tafseer: {
      simplifiedForKid: 'يسأل الناس عن خبر مهم جداً، وهو يوم القيامة؛ لأنهم لا يعرفون ما سيحدث فيه ويتعجبون منه.',
      messageForYou: 'هذه الآية تعلمنا أن نبحث دائماً عن الحقائق المهمة في ديننا، وأن نفكر في الأمور الكبيرة التي تقربنا إلى الله.',
      islamicValue: 'التفكر في نعم الله وآياته العظيمة من أسمى علامات الإيمان ومحبة الله.',
      questionForReflection: 'هل تساءلت يوماً عن السماء الجميلة ومن خلقها؟'
    }
  },
  {
    numberInSurah: 2,
    text: 'عَنِ النَّبَإِ الْعَظِيمِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078002.mp3',
    tafseer: {
      simplifiedForKid: 'النبأ العظيم هو الخبر الهائل الذي جاء به القرآن الكريم عن البعث والجنة والنار وعظمة الخالق سبحانه.',
      messageForYou: 'القرآن الكريم كتاب يحمل لنا أهم وأعظم الأخبار في الكون ليرشدنا إلى طريق السعادة.',
      islamicValue: 'احترام كتاب الله والتصديق بكل ما جاء فيه من بشارات وهداية.',
      questionForReflection: 'ما هو أعظم كتاب نحبه ونقرأه كل يوم؟'
    }
  },
  {
    numberInSurah: 3,
    text: 'الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078003.mp3',
    tafseer: {
      simplifiedForKid: 'كان الناس قديماً في مكة مختلفين؛ فالمؤمنون صدقوا باليوم الآخر والمشركون شكوا فيه.',
      messageForYou: 'نحن نثق بوعد الله لأن الله هو الحق وكل ما يقوله يقع حتماً.',
      islamicValue: 'اليقين الصادق في القلب وثبات المؤمن على دينه.',
    }
  },
  {
    numberInSurah: 4,
    text: 'كَلَّا سَيَعْلَمُونَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078004.mp3',
    tafseer: {
      simplifiedForKid: 'سيعرف الجميع قريباً حقيقة هذا اليوم عندما يَرون عظمة قدرة الله بأعينهم.',
      messageForYou: 'الأشياء الحقيقية تظهر واضحة بالعمل والاجتهاد والوقت.',
      islamicValue: 'الاستعداد للغد بالعمل الصالح ومساعدة الآخرين.',
    }
  },
  {
    numberInSurah: 5,
    text: 'ثُمَّ كَلَّا سَيَعْلَمُونَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078005.mp3',
    tafseer: {
      simplifiedForKid: 'تأكيد قوي من الله أن الحقيقة ستتجلى واضحة لا ريب فيها لكل إنسان.',
      messageForYou: 'عندما يكرر القرآن أمراً فهذا يعني أنه بالغ الأهمية ويجب أن ننتبه له بقلوبنا.',
      islamicValue: 'التأمل والإنصات حين يُتلى كلام الله تعالى.',
    }
  },
  {
    numberInSurah: 6,
    text: 'أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078006.mp3',
    tafseer: {
      simplifiedForKid: 'جعل الله الأرض ممهدة ومريحة مثل الفراش الناعم لنعيش عليها ونسير ونبني بيوتنا بسهولة.',
      messageForYou: 'انظر كيف مهّد الله لنا كوكب الأرض لنلعب وندرس ونحيا بسلام وسعادة.',
      islamicValue: 'شكر الله على نعمة السكن والاستقرار على هذه الأرض الجميلة.',
    }
  },
  {
    numberInSurah: 7,
    text: 'وَالْجِبَالَ أَوْتَادًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078007.mp3',
    tafseer: {
      simplifiedForKid: 'الجبال الضخمة مثل الأوتاد التي تُثبّت الخيمة، فهي تثبت الأرض حتى لا تهتز بنا.',
      messageForYou: 'كل شيء خلقه الله له فائدة عظيمة حتى لو لم نكن نعرفها في البداية.',
      islamicValue: 'الإعجاز الإلهي في دقة توازن الطبيعة والكون.',
    }
  },
  {
    numberInSurah: 8,
    text: 'وَخَلَقْنَاكُمْ أَزْوَاجًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078008.mp3',
    tafseer: {
      simplifiedForKid: 'خلقنا الله بنين وبنات، آباءً وأمهات، لنتعاون ونتحابّ ونبني عائلات سعيدة.',
      messageForYou: 'عائلتك وأصدقاؤك نعمة من الله لتساندوا بعضكم بالحب والرحمة.',
      islamicValue: 'بر الوالدين وحب الإخوة والتعاون في الخير.',
    }
  },
  {
    numberInSurah: 9,
    text: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078009.mp3',
    tafseer: {
      simplifiedForKid: 'النوم راحة لجسمك وعقلك بعد يوم طويل من اللعب والدراسة لتستيقظ نشيطاً.',
      messageForYou: 'النوم المبكر يساعد عقلك الصغير على النمو ويمنحك طاقة وقوة.',
      islamicValue: 'المحافظة على الصحة وآداب النوم كأذكار النوم والوضوء.',
    }
  },
  {
    numberInSurah: 10,
    text: 'وَجَعَلْنَا اللَّيْلَ لِبَاسًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078010.mp3',
    tafseer: {
      simplifiedForKid: 'الليل يغطي العالم بظلامه الهادئ والستار الجميل كأنه ثوب يحمي هدوء الناس وراحتهم.',
      messageForYou: 'سكون الليل فرصة للراحة والهدوء وذكر الله قبل النوم.',
      islamicValue: 'تقدير تعاقب الليل والنهار كآية من آيات الرحمن.',
    }
  },
  {
    numberInSurah: 11,
    text: 'وَجَعَلْنَا النَّهَارَ مَعَاشًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078011.mp3',
    tafseer: {
      simplifiedForKid: 'في النهار تشرق الشمس لنذهب إلى المدرسة والعمل ونسعى للخير والرزق.',
      messageForYou: 'استثمر نهارك في التعلم ومساعدة والديك والقيام بأعمال نافعة.',
      islamicValue: 'الاجتهاد والنشاط والعمل النافع من صفات المؤمن الصالح.',
    }
  },
  {
    numberInSurah: 12,
    text: 'وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078012.mp3',
    tafseer: {
      simplifiedForKid: 'بنى الله فوقنا سبع سماوات عظيمة وقوية لا تسقط ولا تتشقق، تحمي الأرض وتزينها.',
      messageForYou: 'تأمل السماء ليلاً بنجومها ونهاراً بزرقتها الشاسعة، فالله هو الصانع المبدع.',
      islamicValue: 'عظمة قدرة الخالق في خلق الأكوان الواسعة.',
    }
  },
  {
    numberInSurah: 13,
    text: 'وَجَعَلْنَا سِرَاجًا وَهَّاجًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078013.mp3',
    tafseer: {
      simplifiedForKid: 'الشمس مصباح ضخم متوهج يمنحنا النور والدفء وتساعد النباتات والزهور على النمو.',
      messageForYou: 'بدون الشمس لكانت الأرض مظلمة وباردة، فالحمد لله على نعمة الشمس.',
      islamicValue: 'التسبيح والحمد لله المنعم بجميع النعم الظاهرة والباطنة.',
    }
  },
  {
    numberInSurah: 14,
    text: 'وَأَنزَلْنَا مِنَ الْمُعْصِرَاتِ مَاءً ثَجَّاجًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078014.mp3',
    tafseer: {
      simplifiedForKid: 'تنزل الغيوم الماطرة ماءً عذباً غزيراً وجميلاً يروي الأرض العطشى والحيوانات.',
      messageForYou: 'المطر رحمة من الله، وعندما يمطر ندعو: اللهم صيباً نافعاً!',
      islamicValue: 'الدعاء عند نزول المطر والمحافظة على نعمة الماء وعدم الإسراف.',
    }
  },
  {
    numberInSurah: 15,
    text: 'لِّنُخْرِجَ بِهِ حَبًّا وَنَبَاتًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078015.mp3',
    tafseer: {
      simplifiedForKid: 'بفضل ماء المطر، ينبت الله القمح والأرز والخضروات اللذيذة التي نأكلها.',
      messageForYou: 'الحبة الصغيرة في التراب تصبح شجرة كبيرة بإذن الله، فسبحان الله!',
      islamicValue: 'حب الزراعة والاعتناء بالنباتات وشكر الرازق سبحانه.',
    }
  },
  {
    numberInSurah: 16,
    text: 'وَجَنَّاتٍ أَلْفَافًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078016.mp3',
    tafseer: {
      simplifiedForKid: 'بساتين وحدائق خضراء رائعة، أغصانها ملتفة وثمارها متنوعة وشهية.',
      messageForYou: 'جمال الحدائق والورود دليل على حب الله للجمال ولطفه بعباده.',
      islamicValue: 'حب الطبيعة والمحافظة على نظافة البيئة والحدائق.',
    }
  },
  {
    numberInSurah: 17,
    text: 'إِنَّ يَوْمَ الْفَصْلِ كَانَ مِيقَاتًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078017.mp3',
    tafseer: {
      simplifiedForKid: 'يوم القيامة هو اليوم الذي يفصل الله فيه بين الحق والباطل، وله موعد محدد عند الله.',
      messageForYou: 'الله عادل يحب العدل، وسيكافئ كل من فعل خيراً في هذه الحياة.',
      islamicValue: 'الأمانة والصدق وتجنب ظلم أي إنسان أو حيوان.',
    }
  },
  {
    numberInSurah: 18,
    text: 'يَوْمَ يُنفَخُ فِي الصُّورِ فَتَأْتُونَ أَفْوَاجًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078018.mp3',
    tafseer: {
      simplifiedForKid: 'يأمر الله الملك إسرافيل بالنفخ في البوق، فيجتمع الناس جميعاً أفواجاً وأمماً.',
      messageForYou: 'المؤمنون يأتون آمنين مطمئنين فرحين بما أعد الله لهم من الكرامة.',
      islamicValue: 'الشوق إلى لقاء الله والعمل بما يرضيه لنكون في زمرة الفائزين.',
    }
  },
  {
    numberInSurah: 19,
    text: 'وَفُتِحَتِ السَّمَاءُ فَكَانَتْ أَبْوَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078019.mp3',
    tafseer: {
      simplifiedForKid: 'تُفتح السماء وتنزل الملائكة الكرام بأمر الله سبحانه وتعالى في مشهد مهيب.',
      messageForYou: 'الملائكة يحبون الأطفال الصالحين الذين يذكرون الله ويقرأون القرآن.',
      islamicValue: 'الإيمان بالملائكة الكرام واستشعار مراقبة الله في كل وقت.',
    }
  },
  {
    numberInSurah: 20,
    text: 'وَسُيِّرَتِ الْجِبَالُ فَكَانَتْ سَرَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078020.mp3',
    tafseer: {
      simplifiedForKid: 'الجبال الصلبة الضخمة تصبح مثل الغبار الناعم، دلالة على تبدل الكون لعالم الآخرة.',
      messageForYou: 'كل شيء في هذه الدنيا يزول، ويبقى العمل الصالح والكلمة الطيبة.',
      islamicValue: 'التعلق بالباقيات الصالحات أكثر من المظاهر الزائلة.',
    }
  },
  {
    numberInSurah: 21,
    text: 'إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078021.mp3',
    tafseer: {
      simplifiedForKid: 'النار تترصد الظالمين الذين أذوا الناس ورفضوا طريق الخير والرحمة.',
      messageForYou: 'نسأل الله دائماً أن يحفظنا من كل شر وأن يدخلنا جنات النعيم.',
      islamicValue: 'الابتعاد عن الذنوب والإساءة إلى الآخرين.',
    }
  },
  {
    numberInSurah: 22,
    text: 'لِّلطَّاغِينَ مَآبًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078022.mp3',
    tafseer: {
      simplifiedForKid: 'مكان عاقبة المعتدين الذين تجاوزوا حدود الله ولم يتوبوا.',
      messageForYou: 'كن دائماً لطيفاً وذا خلق طيب مع أصدقائك ولا تتنمر أو تعتدي.',
      islamicValue: 'حسن الخلق والرفق والتسامح.',
    }
  },
  {
    numberInSurah: 23,
    text: 'لَّابِثِينَ فِيهَا أَحْقَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078023.mp3',
    tafseer: {
      simplifiedForKid: 'يبقون فيها أزمنة متتالية نتيجة أفعالهم السيئة وإصرارهم على الظلم.',
      messageForYou: 'التوبة الصادقة تمحو الخطأ، والله غفور رحيم يحب من يستغفره.',
      islamicValue: 'المبادرة إلى الاعتذار والاستغفار عند الخطأ.',
    }
  },
  {
    numberInSurah: 24,
    text: 'لَّا يَذُوقُونَ فِيهَا بَرْدًا وَلَا شَرَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078024.mp3',
    tafseer: {
      simplifiedForKid: 'لا يجدون فيها نسيماً يبرد عليهم ولا شراباً لذيذاً يرويهم، عكس نعيم الجنة البارد العذب.',
      messageForYou: 'نطلب من الله الجنة بنعيمها وأنهارها وأشجارها الوارفة.',
      islamicValue: 'الشوق لنعيم الجنة والعمل للوصول إليها.',
    }
  },
  {
    numberInSurah: 25,
    text: 'إِلَّا حَمِيمًا وَغَسَّاقًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078025.mp3',
    tafseer: {
      simplifiedForKid: 'شراب شديد الحرارة والشدة عياذاً بالله من مصير الأشرار.',
      messageForYou: 'اللهم أجرنا من النار وأدخلنا الجنة مع الأبرار.',
      islamicValue: 'دعاء الله بالجنة والاستعاذة به من النار.',
    }
  },
  {
    numberInSurah: 26,
    text: 'جَزَاءً وِفَاقًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078026.mp3',
    tafseer: {
      simplifiedForKid: 'جزاء عادل يناسب بالضبط ما فعلوه من إفساد وظلم في الدنيا دون ظلم من الله.',
      messageForYou: 'الله عادل تماماً لا يظلم مثقال ذرة، فكن مطمئناً أن عملك الطيب لن يضيع.',
      islamicValue: 'الإيمان بعدل الله المطلق.',
    }
  },
  {
    numberInSurah: 27,
    text: 'إِنَّهُمْ كَانُوا لَا يَرْجُونَ حِسَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078027.mp3',
    tafseer: {
      simplifiedForKid: 'لم يكونوا يفكرون في أن هناك يوماً سيحاسبهم الله فيه على أعمالهم وتصرفاتهم.',
      messageForYou: 'تذكر دائماً أن الله يرانا ويحب منا الأعمال الصادقة والحسنة.',
      islamicValue: 'مراقبة الله تعالى في السر والعلن.',
    }
  },
  {
    numberInSurah: 28,
    text: 'وَكَذَّبُوا بِآيَاتِنَا كِذَّابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078028.mp3',
    tafseer: {
      simplifiedForKid: 'كذبوا بالقرآن وبالمعجزات التي تدل على وحدانية الله وصدق نبيه.',
      messageForYou: 'المؤمن يستمع لآيات الله بحب ويصدق بها ويعمل بما فيها من هداية.',
      islamicValue: 'الصدق في القول والعمل وحب القرآن الكريم.',
    }
  },
  {
    numberInSurah: 29,
    text: 'وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ كِتَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078029.mp3',
    tafseer: {
      simplifiedForKid: 'كل عمل صغير أو كبير مكتوب ومحفوظ عند الله بدقة متناهية، حتى الابتسامة في وجه أخيك.',
      messageForYou: 'حتى لو لم يرك أحد وأنت تساعد الآخرين أو تطعم قطة، فالله رآك وسجل لك ذلك حسنة.',
      islamicValue: 'فعل الخير في كل وقت لأن كل حسنة مسجلة عند الله.',
    }
  },
  {
    numberInSurah: 30,
    text: 'فَذُوقُوا فَلَن نَّزِيدَكُمْ إِلَّا عَذَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078030.mp3',
    tafseer: {
      simplifiedForKid: 'توبيخ للظالمين الذين اختاروا الباطل وأعرضوا عن طريق الخير والرحمة.',
      messageForYou: 'نحن نختار طريق النور والقرآن ومحبة الله ورسوله صلى الله عليه وسلم.',
      islamicValue: 'الالتزام بطريق الحق ومرافقة الصالحين.',
    }
  },
  {
    numberInSurah: 31,
    text: 'إِنَّ لِلْمُتَّقِينَ مَفَازًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078031.mp3',
    tafseer: {
      simplifiedForKid: 'يا له من خبر سعيد! المؤمنون المتقون الذين أطاعوا الله لهم الفوز العظيم بالجنة وسعادة أبدية.',
      messageForYou: 'أنت بحفظك للقرآن وأخلاقك الجميلة تسير في طريق الفائزين برضا الله.',
      islamicValue: 'التقوى والبشائر العظيمة للمؤمنين الصادقين.',
    }
  },
  {
    numberInSurah: 32,
    text: 'حَدَائِقَ وَأَعْنَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078032.mp3',
    tafseer: {
      simplifiedForKid: 'في الجنة بساتين فائقة الجمال وعناقيد عنب لذيذة جداً لا تنتهي ومذاقها لا يوصف.',
      messageForYou: 'تخيل أجمل حديقة في العالم، جنة الله أجمل منها بملايين المرات!',
      islamicValue: 'الرغبة في الجنة ونعيمها الدائم.',
    }
  },
  {
    numberInSurah: 33,
    text: 'وَكَوَاعِبَ أَتْرَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078033.mp3',
    tafseer: {
      simplifiedForKid: 'أزواج وأصحاب طيبون في الجنة متقاربون في السن والجمال والألفة والمحبة.',
      messageForYou: 'أهل الجنة يعيشون في سعادة وصداقة وسلام دائمين دون خصام.',
      islamicValue: 'الحب في الله والمودة بين المؤمنين.',
    }
  },
  {
    numberInSurah: 34,
    text: 'وَكَأْسًا دِهَاقًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078034.mp3',
    tafseer: {
      simplifiedForKid: 'كؤوس مليئة بأطيب الأشربة الطاهرة اللذيذة الصافية التي لا تسبب صداعاً ولا أذى.',
      messageForYou: 'أنعام الجنة خالصة نقية أعدها الله لعباده الأبرار.',
      islamicValue: 'شكر الله وسؤاله من فضله العظيم.',
    }
  },
  {
    numberInSurah: 35,
    text: 'لَّا يَسْمَعُونَ فِيهَا لَغْوًا وَلَا كِذَّابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078035.mp3',
    tafseer: {
      simplifiedForKid: 'في الجنة لا تسمع أي كلام سيء ولا شتيمة ولا كذب، كل الكلام فيها سلام وطيب ومدح لله.',
      messageForYou: 'اجعل لسانك كأهل الجنة دائماً: قل خيراً أو اصمت، وابتعد عن الألفاظ السيئة.',
      islamicValue: 'طهارة اللسان والصدق وتجنب الكلام الباطل.',
    }
  },
  {
    numberInSurah: 36,
    text: 'جَزَاءً مِّن رَّبِّكَ عَطَاءً حِسَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078036.mp3',
    tafseer: {
      simplifiedForKid: 'كل هذا النعيم كرم عظيم من ربك الرحيم وعطاء كثير كافٍ يزيد ويفيض.',
      messageForYou: 'عطاء الله واسع جداً، كلما تقربت إلى الله متراً تقرب إليك أكثر.',
      islamicValue: 'حسن الظن بالله والثقة في سعة كرمه وجوده.',
    }
  },
  {
    numberInSurah: 37,
    text: 'رَّبِّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الرَّحْمَٰنِ ۖ لَا يَمْلِكُونَ مِنْهُ خِطَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078037.mp3',
    tafseer: {
      simplifiedForKid: 'الله هو مالك وخالق السماوات والأرض، وهو الرحمن الذي وسعت رحمته كل شيء، وله الهيبة والجلال.',
      messageForYou: 'اسم الله "الرحمن" يملأ قلوبنا أملاً ورجاءً وحباً لخالقنا العظيم.',
      islamicValue: 'تعظيم الله ومحبته واستشعار سعة رحمته.',
    }
  },
  {
    numberInSurah: 38,
    text: 'يَوْمَ يَقُومُ الرُّوحُ وَالْمَلَائِكَةُ صَفًّا ۖ لَّا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ الرَّحْمَٰنُ وَقَالَ صَوَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078038.mp3',
    tafseer: {
      simplifiedForKid: 'يقف جبريل عليه السلام ومعه الملائكة في صفوف منتظمة بخشوع واحترام لله تعالى.',
      messageForYou: 'النظام والخشوع في الصلاة صفة يتعلمها المسلم من اصطفاف الملائكة.',
      islamicValue: 'النظام والخشوع والأدب في حضرة كلام الله وتلاوته.',
    }
  },
  {
    numberInSurah: 39,
    text: 'ذَٰلِكَ الْيَوْمُ الْحَقُّ ۖ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ مَآبًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078039.mp3',
    tafseer: {
      simplifiedForKid: 'هذا اليوم قادم لا محالة، فمن أراد النجاة فليعمل الصالحات ويرجع إلى ربه تائباً.',
      messageForYou: 'الباب مفتوح أمامك اليوم لتكون بطلاً في حفظ القرآن والعمل به.',
      islamicValue: 'المبادرة إلى التوبة والاستقامة في الصغر والكبر.',
    }
  },
  {
    numberInSurah: 40,
    text: 'إِنَّا أَنذَرْنَاكُمْ عَذَابًا قَرِيبًا يَوْمَ يَنظُرُ الْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ الْكَافِرُ يَا لَيْتَنِي كُنتُ تُرَابًا',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/078040.mp3',
    tafseer: {
      simplifiedForKid: 'يرى كل إنسان ما عمله في الدنيا من خير أو شر، والمؤمن يفرح بحسناته وحفظه للقرآن، بينما يندم المفرط.',
      messageForYou: 'اجعل يومك مليئاً بالخيرات حتى تفرح بصحيفتك وبأوسمتك القرآنية يوم القيامة!',
      islamicValue: 'المحاسبة الإيجابية للنفس والحرص على الحسنات.',
      questionForReflection: 'ما هي أحسن حسنة فعلتها اليوم لتسعد والديك؟'
    }
  }
];

// Short surahs with full data
export const SURAH_112_IKHLAS_AYAHS = [
  {
    numberInSurah: 1,
    text: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3',
    tafseer: {
      simplifiedForKid: 'الله سبحانه واحد لا شريك له، ليس له مثيل ولا يشبهه أحد في صفاته العظيمة.',
      messageForYou: 'نعبد الله وحده ونحبه فوق كل شيء وندعوه في كل وقت.',
      islamicValue: 'التوحيد الخالص هو أساس الدين وأجمل ما يعتقده المسلم.',
    }
  },
  {
    numberInSurah: 2,
    text: 'اللَّهُ الصَّمَدُ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3',
    tafseer: {
      simplifiedForKid: 'الصمد يعني الذي يحتاجه كل المخلوقات في كل شيء، وهو سبحانه لا يحتاج لأحد.',
      messageForYou: 'إذا احتجت أي مساعدة أو شعرت بالخوف، اطلب العون من الله الصمد مباشرة.',
      islamicValue: 'التوكل على الله والاستعانة به دائماً.',
    }
  },
  {
    numberInSurah: 3,
    text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3',
    tafseer: {
      simplifiedForKid: 'ليس لله ولد ولا والد ولا أسرة، فهو الخالق الأزلي الأبدي.',
      messageForYou: 'الله منزه عن النقص والضعف، كامل في قدرته وجلاله.',
      islamicValue: 'تنزيه الله تعالى عن كل نقص.',
    }
  },
  {
    numberInSurah: 4,
    text: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3',
    tafseer: {
      simplifiedForKid: 'لا يوجد أحد يماثل الله أو يساويه في عظمته أو علمه أو رحمته.',
      messageForYou: 'قراءة سورة الإخلاص تعدل ثلث القرآن في الأجر، فاحرص على قراءتها ثلاث مرات!',
      islamicValue: 'محبة سورة الإخلاص والإكثار من تلاوتها.',
    }
  }
];

export const SURAH_113_FALAQ_AYAHS = [
  {
    numberInSurah: 1,
    text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113001.mp3',
    tafseer: {
      simplifiedForKid: 'أحتمي وألتجئ إلى الله رب الصبح والنور الذي يشق الظلام.',
      messageForYou: 'عندما تخاف من الظلام، استعذ برب الفلق فهو يحميك ويملأ قلبك طمأنينة.',
      islamicValue: 'الاستعاذة بالله واللجوء إليه عند الخوف.',
    }
  },
  {
    numberInSurah: 2,
    text: 'مِن شَرِّ مَا خَلَقَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113002.mp3',
    tafseer: {
      simplifiedForKid: 'من كل أذى أو شر قد يوجد في أي مخلوق من حشرات أو حيوانات أو أشياء مؤذية.',
      messageForYou: 'الله خلق كل شيء وقادر على حمايتك من أي مكروه.',
      islamicValue: 'اليقين بأن الحافظ هو الله سبحانه.',
    }
  },
  {
    numberInSurah: 3,
    text: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113003.mp3',
    tafseer: {
      simplifiedForKid: 'من شر ظلمة الليل إذا دخلت وانتشرت.',
      messageForYou: 'نقرأ المعوذات قبل النوم لتنام بأمان وحفظ ملائكي.',
      islamicValue: 'الحرص على أذكار الصباح والمساء.',
    }
  },
  {
    numberInSurah: 4,
    text: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113004.mp3',
    tafseer: {
      simplifiedForKid: 'من شر كل من يحاول إيذاء الناس بالحيل والأعمال الخبيثة.',
      messageForYou: 'القرآن الكريم حصن منيع يحميك ويحفظ عائلتك دائماً.',
      islamicValue: 'الاعتصام بالقرآن الكريم حصناً وحفظاً.',
    }
  },
  {
    numberInSurah: 5,
    text: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113005.mp3',
    tafseer: {
      simplifiedForKid: 'من شر الذي يكره أن يرى غيره مسروراً أو ناجحاً ويتمنى زوال نعمته.',
      messageForYou: 'إذا رأيت شيئاً جميلاً عند غيرك قل: ما شاء الله تبارك الله، وتمن الخير للجميع.',
      islamicValue: 'سلامة الصدر ومحبة الخير للناس والتبريك عند رؤية النعم.',
    }
  }
];

export const SURAH_114_NAS_AYAHS = [
  {
    numberInSurah: 1,
    text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114001.mp3',
    tafseer: {
      simplifiedForKid: 'ألتجئ وأحتمي بالله خالق جميع البشر ومربيهم برحمته.',
      messageForYou: 'الله ربك ورب جميع أصحابك، يحبنا ويحفظنا دائماً.',
      islamicValue: 'الشعور بالأمان في كنف رعاية الله.',
    }
  },
  {
    numberInSurah: 2,
    text: 'مَلِكِ النَّاسِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114002.mp3',
    tafseer: {
      simplifiedForKid: 'الملك الحقيقي الذي يدبر أمورنا ويحمينا وله الحكم كله.',
      messageForYou: 'لا تخف من أحد لأن الله هو الملك الأقوى فوق الجميع.',
      islamicValue: 'الشجاعة والتوكل على الله الملك الحق.',
    }
  },
  {
    numberInSurah: 3,
    text: 'إِلَٰهِ النَّاسِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114003.mp3',
    tafseer: {
      simplifiedForKid: 'المعبود بحق وحده، لا نعبد سواه ولا نطلب المغفرة إلا منه.',
      messageForYou: 'صلاتك ودعاؤك لله وحده تجعل قلبك مليئاً بالسكينة والنور.',
      islamicValue: 'محبة عبادة الله والتنافس في الصلاة وقراءة القرآن.',
    }
  },
  {
    numberInSurah: 4,
    text: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114004.mp3',
    tafseer: {
      simplifiedForKid: 'من شر الشيطان الذي يوسوس بالأفكار السيئة، فإذا ذكرت الله هرب واختفى خائفاً!',
      messageForYou: 'إذا وسوس لك الشيطان بأن تكسل عن الصلاة أو تكذب، قل فوراً: أعوذ بالله من الشيطان الرجيم!',
      islamicValue: 'ذكر الله سلاح قوي يهزم وساوس الشيطان ويزرع الهدوء.',
    }
  },
  {
    numberInSurah: 5,
    text: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114005.mp3',
    tafseer: {
      simplifiedForKid: 'يحاول الشيطان أن يهمس بأفكار الغضب والكسل والأنانية في صدور الناس.',
      messageForYou: 'قلبك بيت للإيمان والمحبة، املأه بالقرآن والكلام الطيب ليظل منيراً.',
      islamicValue: 'نقاء السريرة وطهارة القلب بحفظ كتاب الله.',
    }
  },
  {
    numberInSurah: 6,
    text: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114006.mp3',
    tafseer: {
      simplifiedForKid: 'الوسوسة قد تأتي من شياطين الجن، أو من رفقاء السوء من البشر الذين يشجعون على الخطأ.',
      messageForYou: 'اختر دائماً الأصدقاء الطيبين الذين يشجعونك على الصلاة وحفظ القرآن والتفوق.',
      islamicValue: 'اختيار الصديق الصالح والبعد عن رفقاء السوء.',
    }
  }
];

// Helper to get EveryAyah audio URL for specific reciter (Saad Al-Ghamdi or Mishary Alafasy)
export function getAyahAudioUrl(
  surahId: number,
  ayahNumberInSurah: number,
  reciter: ReciterId = 'alafasy'
): string {
  const folder = reciter === 'ghamadi' ? 'Ghamadi_40kbps' : 'Alafasy_128kbps';
  const paddedSurah = String(surahId).padStart(3, '0');
  const paddedAyah = String(ayahNumberInSurah).padStart(3, '0');
  return `https://everyayah.com/data/${folder}/${paddedSurah}${paddedAyah}.mp3`;
}

// Helper to get full Surah data with complete authentic Uthmani ayahs (and audio for selected reciter)
export function getSurahWithAyahs(surahId: number, reciter: ReciterId = 'alafasy'): Surah {
  const meta =
    ALL_114_SURAHS.find((s) => s.id === surahId) ||
    SURAHS_LIST_SUMMARY.find((s) => s.id === surahId) ||
    SURAHS_LIST_SUMMARY[0];

  const datasetAyahs = quranFullDataset[String(meta.id)];

  // Specialized rich kid reflection overrides map (for key surahs)
  const specialSurahMap: Record<number, Array<{ numberInSurah: number; tafseer: any }>> = {
    78: SURAH_78_NABA_AYAHS,
    112: SURAH_112_IKHLAS_AYAHS,
    113: SURAH_113_FALAQ_AYAHS,
    114: SURAH_114_NAS_AYAHS,
  };

  if (datasetAyahs && datasetAyahs.length > 0) {
    const ayahs = datasetAyahs.map((item) => {
      const special = specialSurahMap[meta.id]?.find((a) => a.numberInSurah === item.numberInSurah);
      return {
        numberInSurah: item.numberInSurah,
        text: item.text,
        audioUrl: getAyahAudioUrl(meta.id, item.numberInSurah, reciter),
        tafseer: special?.tafseer || {
          simplifiedForKid:
            item.tafseerText ||
            `شرح وتفسير الآية (${item.numberInSurah}) من سورة ${meta.name}: تدعونا هذه الآية الكريمة إلى استشعار عظمة الله والعمل الصالح ومحبة الخير.`,
          messageForYou: `رسالة لك يا بطل: كل آية تحفظها وتتدبرها من سورة ${meta.name} ترفعك درجات في الجنة وتزيدك ذكاءً ونوراً.`,
          islamicValue: 'محبة القرآن الكريم وتطبيقه في حياتنا اليومية وحسن الخلق مع الجميع.',
          questionForReflection: `كيف نطبق معاني هذه الآية المباركة في تعاملاتنا مع أهلنا وأصدقائنا؟`
        }
      };
    });
    return { ...meta, ayahs };
  }

  return { ...meta, ayahs: [] };
}

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'badge-1',
    title: 'بداية مباركة',
    description: 'إتمام حفظ أول سورة كاملة من جزء عم',
    category: 'surah',
    icon: 'star',
    color: '#EAB308',
    isUnlocked: false,
    requiredTarget: 1
  },
  {
    id: 'badge-2',
    title: 'صاحب الهمة',
    description: 'حفظ 10% من جزء عم (أكثر من 56 آية)',
    category: 'percentage',
    icon: 'compass',
    color: '#10B981',
    isUnlocked: false,
    requiredTarget: 10
  },
  {
    id: 'badge-3',
    title: 'نجم الحفظ',
    description: 'حفظ 25% من جزء عم (141 آية)',
    category: 'percentage',
    icon: 'award',
    color: '#D97706',
    isUnlocked: false,
    requiredTarget: 25
  },
  {
    id: 'badge-4',
    title: 'فارس التلاوة',
    description: 'حفظ 50% من جزء عم (نصف الجزء المبارك)',
    category: 'percentage',
    icon: 'trophy',
    color: '#0284C7',
    isUnlocked: false,
    requiredTarget: 50
  },
  {
    id: 'badge-5',
    title: 'تاج الوقار',
    description: 'إتمام حفظ جزء عم كاملاً 564 آية مباركة',
    category: 'special',
    icon: 'crown',
    color: '#8B5CF6',
    isUnlocked: false,
    requiredTarget: 100
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [];

