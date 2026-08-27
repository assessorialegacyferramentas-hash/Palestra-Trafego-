import React from 'react';
import { INSTITUTIONAL_ICON_URL, INSTITUTIONAL_ICON_FALLBACK_URL, INSTITUTIONAL_ICON_ALT } from '../config/assets';
import { SafeImage } from './SafeImage';

export const Presentation: React.FC = () => {
  return (
    <section id="section-presentation" className="w-full text-center px-3 pt-2 pb-2">
      {/* Institutional Icon as visual accent */}
      <div className="flex justify-center mb-2">
        <div className="relative">
          <SafeImage
            src={INSTITUTIONAL_ICON_URL}
            fallbackSrc={INSTITUTIONAL_ICON_FALLBACK_URL}
            alt={INSTITUTIONAL_ICON_ALT}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            containerClassName="flex items-center justify-center"
            fallbackPlaceholder={
              <div className="w-8 h-8 rounded-full bg-[#0B2B26] border border-[#C5A880]/50 flex items-center justify-center text-[#DFBE76]">
                <svg className="w-4 h-4 text-[#DFBE76]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
            }
          />
        </div>
      </div>

      {/* Main Title */}
      <h1 
        id="main-title" 
        className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0B2B26] tracking-tight leading-tight max-w-xl mx-auto"
      >
        Sua primeira campanha de tráfego na prática
      </h1>

      {/* Main Description */}
      <p 
        id="main-description" 
        className="mt-2 text-sm sm:text-base text-[#314840] font-normal leading-snug max-w-lg mx-auto"
      >
        Responda às cinco perguntas abaixo e estruture sua campanha em minutos.
      </p>

      {/* Complementary Text */}
      <div className="mt-2.5 inline-block px-3.5 py-1.5 rounded-lg bg-[#0B2B26]/[0.03] border border-[#C5A880]/30 max-w-md mx-auto">
        <p className="text-[11px] sm:text-xs text-[#4E625A] italic leading-tight">
          “Não existe tráfego eficiente sem clareza sobre público, oferta, anúncio, destino e investimento.”
        </p>
      </div>
    </section>
  );
};
