import React from 'react';
import { FormErrors } from '../types';
import { STICKER_CONCEPT_URL } from '../config/assets';
import { SafeImage } from './SafeImage';
import { Check, Loader2, ArrowRight } from 'lucide-react';

interface ConsentAndSubmitProps {
  consent: boolean;
  onConsentChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isFormValid: boolean;
  errors: FormErrors;
}

export const ConsentAndSubmit: React.FC<ConsentAndSubmitProps> = ({
  consent,
  onConsentChange,
  onSubmit,
  isLoading,
  isFormValid,
  errors,
}) => {
  return (
    <div id="section-submit" className="w-full pt-1 pb-4 sm:pb-6">
      {/* Concept Sticker Element - Compact */}
      <div className="flex justify-center mb-3">
        <SafeImage
          src={STICKER_CONCEPT_URL}
          alt="Conceito da Figurinha Legacy"
          className="max-h-14 sm:max-h-16 w-auto object-contain drop-shadow-2xs"
          containerClassName="flex items-center justify-center"
        />
      </div>

      {/* Checkbox de Consentimento */}
      <div className="mb-4">
        <label 
          htmlFor="checkbox-consent"
          className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer select-none
            ${
              errors.consent
                ? 'bg-red-50/30 border-red-300'
                : consent
                ? 'bg-[#0B2B26]/[0.03] border-[#C5A880]/60'
                : 'bg-white/80 border-[#E0D8CE] hover:border-[#C5A880]/40'
            }`}
        >
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              id="checkbox-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => onConsentChange(e.target.checked)}
              className="sr-only peer"
            />
            <div 
              className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-150
                ${
                  consent
                    ? 'bg-[#0B2B26] border-[#0B2B26] text-[#DFBE76]'
                    : errors.consent
                    ? 'border-red-400 bg-white'
                    : 'border-[#C5A880] bg-white peer-focus:ring-2 peer-focus:ring-[#C5A880]/30'
                }`}
            >
              {consent && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

          <span className="text-xs sm:text-sm text-[#1A2621] leading-snug">
            Concordo em enviar estas informações para a equipe da Legacy pelo WhatsApp. <span className="text-[#997D4D] font-bold">*</span>
          </span>
        </label>

        {errors.consent && (
          <p className="text-xs text-red-600 font-medium mt-1 pl-1 flex items-center gap-1">
            <span>•</span> {errors.consent}
          </p>
        )}
      </div>

      {/* Botão Principal de Envio */}
      <div className="w-full">
        <button
          id="btn-submit-whatsapp"
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !isFormValid}
          className={`w-full relative group overflow-hidden rounded-xl font-medium text-base sm:text-lg min-h-[50px] sm:min-h-[54px]
            px-5 py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md active:scale-[0.99]
            ${
              isFormValid
                ? 'bg-[#0B2B26] hover:bg-[#08201C] text-[#FAF8F5] border border-[#C5A880]/50 shadow-[#0B2B26]/15 hover:shadow-lg cursor-pointer'
                : 'bg-[#0B2B26]/50 text-[#FAF8F5]/60 border border-[#C5A880]/20 cursor-not-allowed'
            }`}
        >
          {/* Subtle gold shimmer on hover */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C5A880]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#DFBE76]" />
              <span className="font-sans-clean font-semibold tracking-wide">Preparando envio...</span>
            </>
          ) : (
            <>
              {/* WhatsApp SVG Icon */}
              <svg 
                className="w-5 h-5 shrink-0 text-[#25D366] drop-shadow-xs" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span className="font-sans-clean font-semibold tracking-wide">
                Enviar minha campanha pelo WhatsApp
              </span>
              <ArrowRight className="w-4 h-4 text-[#DFBE76] transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {/* Microtexto abaixo do botão */}
        <p className="text-center text-[11px] sm:text-xs text-[#62776E] mt-2 font-normal">
          Suas respostas serão organizadas e abertas no WhatsApp para envio ao Léo.
        </p>
      </div>
    </div>
  );
};
