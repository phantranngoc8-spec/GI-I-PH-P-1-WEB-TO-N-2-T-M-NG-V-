import React from 'react';

interface CharacterProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  speech?: string;
}

export const CharacterNam: React.FC<CharacterProps> = ({ className = '', size = 'md', speech }) => {
  const dimensions = {
    sm: { w: 60, h: 90 },
    md: { w: 90, h: 135 },
    lg: { w: 120, h: 180 },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {speech && (
        <div className="absolute -top-12 z-10 bg-white border-2 border-sky-400 text-sky-900 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-2xl shadow-md whitespace-nowrap animate-bounce">
          {speech}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-sky-400" />
        </div>
      )}
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none"
        aria-label="Nhân vật bạn Nam: áo polo vàng nhạt, quần short xanh navy, giày trắng"
      >
        {/* Hair - back */}
        <path d="M28 35 C28 15, 72 15, 72 35 Z" fill="#3b2f2f" />
        {/* Ears */}
        <ellipse cx="28" cy="42" rx="4" ry="6" fill="#fcd3b8" />
        <ellipse cx="72" cy="42" rx="4" ry="6" fill="#fcd3b8" />
        {/* Head */}
        <ellipse cx="50" cy="42" rx="22" ry="24" fill="#fde3cf" />
        {/* Hair - front bangs */}
        <path d="M28 35 Q50 20 72 35 Q65 24 50 24 Q35 24 28 35 Z" fill="#2d2222" />
        <path d="M30 30 Q45 26 52 35 Q40 28 30 30 Z" fill="#2d2222" />
        {/* Eyes */}
        <circle cx="42" cy="40" r="3" fill="#1e293b" />
        <circle cx="58" cy="40" r="3" fill="#1e293b" />
        <circle cx="43" cy="39" r="1" fill="#ffffff" />
        <circle cx="59" cy="39" r="1" fill="#ffffff" />
        {/* Cheeks */}
        <ellipse cx="37" cy="46" rx="3.5" ry="2" fill="#fda4af" opacity="0.6" />
        <ellipse cx="63" cy="46" rx="3.5" ry="2" fill="#fda4af" opacity="0.6" />
        {/* Smile */}
        <path d="M44 47 Q50 54 56 47" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Neck */}
        <rect x="45" y="64" width="10" height="8" fill="#fcd3b8" />
        {/* Arms */}
        <ellipse cx="30" cy="85" rx="6" ry="16" transform="rotate(12 30 85)" fill="#fde3cf" />
        <ellipse cx="70" cy="85" rx="6" ry="16" transform="rotate(-12 70 85)" fill="#fde3cf" />
        {/* Polo Shirt - Light yellow (#fef08a / #fef9c3) */}
        <path d="M32 70 L68 70 L72 104 L28 104 Z" fill="#fef08a" stroke="#facc15" strokeWidth="1.5" />
        {/* Polo Collar */}
        <path d="M40 70 L50 82 L44 82 Z" fill="#fef9c3" stroke="#eab308" strokeWidth="1" />
        <path d="M60 70 L50 82 L56 82 Z" fill="#fef9c3" stroke="#eab308" strokeWidth="1" />
        <circle cx="50" cy="88" r="1.5" fill="#ca8a04" />
        {/* Navy Short Pants */}
        <path d="M32 103 L68 103 L70 124 L52 124 L50 112 L48 124 L30 124 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
        {/* Legs */}
        <rect x="36" y="124" width="7" height="15" fill="#fde3cf" />
        <rect x="57" y="124" width="7" height="15" fill="#fde3cf" />
        {/* White Shoes */}
        <ellipse cx="38" cy="142" rx="9" ry="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
        <ellipse cx="62" cy="142" rx="9" ry="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
      <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mt-1 border border-amber-300">
        Bạn Nam
      </span>
    </div>
  );
};

export const CharacterMai: React.FC<CharacterProps> = ({ className = '', size = 'md', speech }) => {
  const dimensions = {
    sm: { w: 60, h: 90 },
    md: { w: 90, h: 135 },
    lg: { w: 120, h: 180 },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {speech && (
        <div className="absolute -top-12 z-10 bg-white border-2 border-pink-400 text-pink-900 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-2xl shadow-md whitespace-nowrap animate-bounce">
          {speech}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-pink-400" />
        </div>
      )}
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm select-none"
        aria-label="Nhân vật bạn Mai: tóc buộc thấp ruy băng xanh, áo trắng, váy yếm xanh da trời, giày trắng"
      >
        {/* Hair - Back low ponytail with blue ribbons */}
        <path d="M25 36 C25 14, 75 14, 75 36 C75 58, 25 58, 25 36 Z" fill="#2d1f1f" />
        {/* Low ponytails on both sides */}
        <ellipse cx="22" cy="54" rx="8" ry="12" fill="#2d1f1f" />
        <ellipse cx="78" cy="54" rx="8" ry="12" fill="#2d1f1f" />
        {/* Blue Ribbons */}
        <circle cx="23" cy="46" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
        <circle cx="77" cy="46" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
        {/* Ears */}
        <ellipse cx="28" cy="42" rx="4" ry="5.5" fill="#fcd3b8" />
        <ellipse cx="72" cy="42" rx="4" ry="5.5" fill="#fcd3b8" />
        {/* Head */}
        <ellipse cx="50" cy="42" rx="21" ry="23" fill="#fde3cf" />
        {/* Hair bangs */}
        <path d="M29 35 Q50 25 71 35 Q65 24 50 24 Q35 24 29 35 Z" fill="#1f1616" />
        <path d="M32 32 Q42 38 48 35 Q40 28 32 32 Z" fill="#1f1616" />
        {/* Eyes */}
        <circle cx="42" cy="40" r="3" fill="#1e293b" />
        <circle cx="58" cy="40" r="3" fill="#1e293b" />
        <circle cx="43" cy="39" r="1" fill="#ffffff" />
        <circle cx="59" cy="39" r="1" fill="#ffffff" />
        {/* Cheeks */}
        <ellipse cx="36" cy="45" rx="4" ry="2.2" fill="#f43f5e" opacity="0.5" />
        <ellipse cx="64" cy="45" rx="4" ry="2.2" fill="#f43f5e" opacity="0.5" />
        {/* Smile */}
        <path d="M44 47 Q50 54 56 47" stroke="#be123c" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Neck */}
        <rect x="46" y="64" width="8" height="7" fill="#fcd3b8" />
        {/* White shirt sleeves */}
        <ellipse cx="30" cy="82" rx="6" ry="14" transform="rotate(12 30 82)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <ellipse cx="70" cy="82" rx="6" ry="14" transform="rotate(-12 70 82)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        {/* White Shirt base */}
        <path d="M33 70 L67 70 L69 90 L31 90 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        {/* Sky-blue Pinafore Dress (Váy yếm xanh da trời) */}
        {/* Straps */}
        <rect x="38" y="70" width="5" height="18" fill="#38bdf8" />
        <rect x="57" y="70" width="5" height="18" fill="#38bdf8" />
        {/* Bib */}
        <rect x="38" y="82" width="24" height="12" fill="#38bdf8" />
        {/* Skirt */}
        <path d="M30 94 L70 94 L78 122 L22 122 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
        {/* Pocket */}
        <path d="M44 100 L56 100 L54 110 L46 110 Z" fill="#38bdf8" opacity="0.8" />
        {/* Legs */}
        <rect x="38" y="122" width="6" height="16" fill="#fde3cf" />
        <rect x="56" y="122" width="6" height="16" fill="#fde3cf" />
        {/* White Shoes */}
        <ellipse cx="39" cy="142" rx="8.5" ry="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
        <ellipse cx="61" cy="142" rx="8.5" ry="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
      <span className="text-xs font-extrabold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full mt-1 border border-sky-300">
        Bạn Mai
      </span>
    </div>
  );
};
