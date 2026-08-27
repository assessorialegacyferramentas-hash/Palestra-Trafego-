import React from 'react';

interface LegacyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LegacyLogo: React.FC<LegacyLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: {
      box: 'w-7 h-7 rounded-md border-[1.2px]',
      letter: 'text-sm font-semibold',
      brand: 'text-sm tracking-[0.16em]',
      tagline: 'text-[7.5px] tracking-[0.24em] mt-0.5',
      gap: 'gap-2',
    },
    md: {
      box: 'w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] border-[1.5px]',
      letter: 'text-lg sm:text-xl font-bold',
      brand: 'text-base sm:text-lg tracking-[0.18em]',
      tagline: 'text-[8.5px] sm:text-[9.5px] tracking-[0.28em] mt-1',
      gap: 'gap-2.5 sm:gap-3',
    },
    lg: {
      box: 'w-11 h-11 sm:w-13 sm:h-13 rounded-[10px] border-2',
      letter: 'text-xl sm:text-2xl font-bold',
      brand: 'text-xl sm:text-2xl tracking-[0.2em]',
      tagline: 'text-[10px] sm:text-[11.5px] tracking-[0.3em] mt-1.5',
      gap: 'gap-3 sm:gap-3.5',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div 
      id="legacy-official-logo" 
      className={`inline-flex items-center select-none ${currentSize.gap} ${className}`}
      aria-label="Legacy Growth Partner"
    >
      {/* Monogram Box with gold border and deep green background */}
      <div 
        className={`${currentSize.box} bg-[#0B2B26] border-[#C5A880] flex items-center justify-center shadow-xs shrink-0 transition-transform duration-200 hover:scale-[1.03]`}
      >
        <span className={`font-serif-luxury ${currentSize.letter} text-[#DFBE76] leading-none select-none pl-0.5 pt-0.5`}>
          L
        </span>
      </div>

      {/* Typography: Brand Name + Tagline */}
      <div className="flex flex-col justify-center text-left">
        <span 
          className={`font-serif-luxury ${currentSize.brand} font-bold text-[#0B2B26] uppercase leading-none`}
          style={{ letterSpacing: '0.22em' }}
        >
          LEGACY
        </span>
        <span 
          className={`font-sans ${currentSize.tagline} font-semibold text-[#997D4D] uppercase leading-none`}
          style={{ letterSpacing: '0.26em' }}
        >
          GROWTH PARTNER
        </span>
      </div>
    </div>
  );
};
