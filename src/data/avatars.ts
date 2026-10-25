export interface AvatarOption {
  id: string;
  name: string;
  gender: 'boy' | 'girl';
  svgColor: string;
  hatColor: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'boy-omar', name: 'عمر (قبعة بيضاء)', gender: 'boy', svgColor: '#105c45', hatColor: '#FFFFFF' },
  { id: 'boy-green', name: 'يوسف (طاقية خضراء)', gender: 'boy', svgColor: '#059669', hatColor: '#105c45' },
  { id: 'boy-casual', name: 'علي (شعر بني)', gender: 'boy', svgColor: '#3B82F6', hatColor: '#6366F1' },
  { id: 'girl-blue', name: 'فاطمة (حجاب أزرق)', gender: 'girl', svgColor: '#0284C7', hatColor: '#38BDF8' },
  { id: 'girl-pink', name: 'مريم (حجاب وردي)', gender: 'girl', svgColor: '#DB2777', hatColor: '#F472B6' },
  { id: 'girl-purple', name: 'عائشة (حجاب بنفسجي)', gender: 'girl', svgColor: '#7C3AED', hatColor: '#A78BFA' },
];
