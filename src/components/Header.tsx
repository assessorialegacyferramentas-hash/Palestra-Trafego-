import React from 'react';
import { LEGACY_LOGO_URL, LEGACY_LOGO_FALLBACK_URL, LEGACY_LOGO_ALT } from '../config/assets';
import { SafeImage } from './SafeImage';
import { LegacyLogo } from './LegacyLogo';

export const Header: React.FC = () => {
  return (
    <header id="legacy-header" className="w-full pt-2 pb-3 px-4 flex flex-col items-center justify-center relative">
      {/* Official Legacy Logo / Monogram Image */}
      <div className="flex items-center justify-center min-h-[44px] mb-2.5">
        <SafeImage
          src={LEGACY_LOGO_URL}
          fallbackSrc={LEGACY_LOGO_FALLBACK_URL}
          alt={LEGACY_LOGO_ALT}
          className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow-xs"
          style={{ objectFit: 'contain' }}
          containerClassName="flex items-center justify-center"
          fallbackPlaceholder={<LegacyLogo size="md" />}
        />
      </div>

      {/* Delicate Gold Architectural Line */}
      <div className="w-full max-w-xs sm:max-w-sm flex items-center justify-center gap-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent"></div>
        <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A880] bg-[#FAF8F5]"></div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent"></div>
      </div>
    </header>
  );
};

