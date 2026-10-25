import React from 'react';

interface ChildAvatarProps {
  avatarId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export const ChildAvatar: React.FC<ChildAvatarProps> = ({
  avatarId,
  size = 'md',
  className = '',
  showBorder = true,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const isGirl = avatarId.startsWith('girl');
  const isOmar = avatarId === 'boy-omar';
  const isGreen = avatarId === 'boy-green';
  const isPink = avatarId === 'girl-pink';
  const isPurple = avatarId === 'girl-purple';

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center shrink-0 ${sizeMap[size]} ${
        showBorder ? 'ring-4 ring-[#E6AF2E] shadow-md bg-[#FFF7E8]' : 'bg-[#FFF7E8]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow */}
        <circle cx="60" cy="60" r="60" fill={isGirl ? '#FDF2F8' : '#F0FDF4'} />

        {/* Shoulders / Clothes */}
        <path
          d="M20 120C20 98 38 88 60 88C82 88 100 98 100 120H20Z"
          fill={
            isOmar
              ? '#105C45'
              : isGreen
              ? '#047857'
              : isPink
              ? '#DB2777'
              : isPurple
              ? '#7C3AED'
              : '#0284C7'
          }
        />
        {/* Collar */}
        <path d="M50 88L60 98L70 88H50Z" fill="#FFFFFF" opacity="0.9" />

        {/* Neck */}
        <rect x="52" y="74" width="16" height="18" rx="8" fill="#F8CBA6" />

        {/* Head / Face */}
        <circle cx="60" cy="54" r="28" fill="#FFDFC4" />

        {/* Cheeks (Blushing) */}
        <circle cx="44" cy="58" r="4.5" fill="#FCA5A5" opacity="0.6" />
        <circle cx="76" cy="58" r="4.5" fill="#FCA5A5" opacity="0.6" />

        {/* Eyes */}
        <ellipse cx="48" cy="52" rx="3.5" ry="4.5" fill="#2C1810" />
        <ellipse cx="72" cy="52" rx="3.5" ry="4.5" fill="#2C1810" />
        {/* Eye highlights */}
        <circle cx="49.5" cy="50.5" r="1.5" fill="#FFFFFF" />
        <circle cx="73.5" cy="50.5" r="1.5" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path
          d="M44 45C47 43 51 44 52 46"
          stroke="#5C3828"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M76 45C73 43 69 44 68 46"
          stroke="#5C3828"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Happy smile */}
        <path
          d="M52 62C56 66 64 66 68 62"
          stroke="#853A26"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Headwear / Hair */}
        {isGirl ? (
          // Hijab
          <g>
            <path
              d="M32 50C32 30 42 22 60 22C78 22 88 30 88 50C88 64 86 78 82 84C76 90 44 90 38 84C34 78 32 64 32 50Z"
              fill={isPink ? '#F472B6' : isPurple ? '#A78BFA' : '#38BDF8'}
            />
            {/* Inner frame around face */}
            <path
              d="M36 50C36 34 46 26 60 26C74 26 84 34 84 50C84 62 82 72 78 76C72 80 48 80 42 76C38 72 36 62 36 50Z"
              fill="#FFDFC4"
            />
            {/* Retouch cheeks & eyes inside */}
            <circle cx="44" cy="58" r="4.5" fill="#FCA5A5" opacity="0.6" />
            <circle cx="76" cy="58" r="4.5" fill="#FCA5A5" opacity="0.6" />
            <ellipse cx="48" cy="52" rx="3.5" ry="4.5" fill="#2C1810" />
            <ellipse cx="72" cy="52" rx="3.5" ry="4.5" fill="#2C1810" />
            <circle cx="49.5" cy="50.5" r="1.5" fill="#FFFFFF" />
            <circle cx="73.5" cy="50.5" r="1.5" fill="#FFFFFF" />
            <path
              d="M53 61C56 64 64 64 67 61"
              stroke="#853A26"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Hijab drapery wrap */}
            <path
              d="M36 74C42 84 78 84 84 74C88 88 78 96 60 96C42 96 32 88 36 74Z"
              fill={isPink ? '#DB2777' : isPurple ? '#7C3AED' : '#0284C7'}
            />
          </g>
        ) : (
          // Boy with Taqiyah / Islamic Cap or Hair
          <g>
            {/* Hair peeking */}
            <path
              d="M36 46C38 38 48 34 60 34C72 34 82 38 84 46"
              fill="#3A2016"
            />
            {/* Cap (Kufi / Taqiyah) */}
            <path
              d="M36 42C36 24 46 16 60 16C74 16 84 24 84 42C76 43 44 43 36 42Z"
              fill={isOmar ? '#FFFFFF' : isGreen ? '#059669' : '#3B82F6'}
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            {/* Cap texture pattern */}
            <circle cx="60" cy="28" r="3" fill="#D4AF37" opacity="0.8" />
            <circle cx="50" cy="30" r="2.5" fill="#D4AF37" opacity="0.6" />
            <circle cx="70" cy="30" r="2.5" fill="#D4AF37" opacity="0.6" />
            {/* Ears */}
            <circle cx="34" cy="56" r="6" fill="#F8CBA6" />
            <circle cx="86" cy="56" r="6" fill="#F8CBA6" />
          </g>
        )}
      </svg>
    </div>
  );
};
