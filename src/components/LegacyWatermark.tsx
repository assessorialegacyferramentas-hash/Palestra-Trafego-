import React from 'react';
import { INSTITUTIONAL_ICON_URL, INSTITUTIONAL_ICON_FALLBACK_URL, INSTITUTIONAL_ICON_ALT } from '../config/assets';
import { SafeImage } from './SafeImage';

export const LegacyWatermark: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Subtle radial ambient warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#C5A880]/5 via-transparent to-transparent opacity-80 blur-3xl" />
      
      {/* Subtle institutional icon watermark in background */}
      <div className="hidden md:block absolute -right-24 top-1/4 opacity-[0.035] transform rotate-12 scale-150">
        <SafeImage
          src={INSTITUTIONAL_ICON_URL}
          fallbackSrc={INSTITUTIONAL_ICON_FALLBACK_URL}
          alt={INSTITUTIONAL_ICON_ALT}
          className="w-96 h-96 object-contain"
        />
      </div>

      <div className="hidden md:block absolute -left-24 bottom-1/4 opacity-[0.03] transform -rotate-12 scale-150">
        <SafeImage
          src={INSTITUTIONAL_ICON_URL}
          fallbackSrc={INSTITUTIONAL_ICON_FALLBACK_URL}
          alt={INSTITUTIONAL_ICON_ALT}
          className="w-96 h-96 object-contain"
        />
      </div>

      {/* Discrete architectural thin border lines for desktop */}
      <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A880]/15 to-transparent" />
      <div className="hidden lg:block absolute right-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A880]/15 to-transparent" />
      
      {/* Subtle corner architectural crosses */}
      <div className="hidden lg:block absolute left-7 top-16 w-3 h-3 text-[#C5A880]/30 font-thin text-xs">
        +
      </div>
      <div className="hidden lg:block absolute right-7 top-16 w-3 h-3 text-[#C5A880]/30 font-thin text-xs">
        +
      </div>
    </div>
  );
};
