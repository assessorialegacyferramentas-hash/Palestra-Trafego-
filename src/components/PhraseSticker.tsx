import React from 'react';
import { STICKER_PHRASE_URL, STICKER_PHRASE_FALLBACK_URL, STICKER_PHRASE_ALT } from '../config/assets';
import { SafeImage } from './SafeImage';

export const PhraseSticker: React.FC = () => {
  return (
    <section id="section-phrase-sticker" className="w-full flex justify-center items-center py-2 sm:py-3 px-3">
      <div className="w-full max-w-[320px] sm:max-w-[380px] flex justify-center">
        <SafeImage
          src={STICKER_PHRASE_URL}
          fallbackSrc={STICKER_PHRASE_FALLBACK_URL}
          alt={STICKER_PHRASE_ALT}
          className="w-full h-auto object-contain drop-shadow-xs transition-transform duration-200 hover:scale-[1.01]"
          containerClassName="w-full flex justify-center"
          fallbackPlaceholder={
            <div className="w-full p-3.5 rounded-xl border border-[#C5A880]/35 bg-[#0B2B26]/[0.03] text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#997D4D] font-semibold block mb-0.5">
                Legacy Mindset
              </span>
              <p className="font-serif-luxury text-base sm:text-lg text-[#0B2B26] italic leading-snug">
                “Não basta gerar demanda. É preciso estar preparado para convertê-la. Crescer é construir legado.”
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
};
