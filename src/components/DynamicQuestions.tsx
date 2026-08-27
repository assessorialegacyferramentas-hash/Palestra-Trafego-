import React from 'react';
import { FormData, FormErrors } from '../types';
import { AutoGrowingTextarea } from './AutoGrowingTextarea';
import { formatCurrencyBRL } from '../utils/masks';
import { DollarSign, HelpCircle, Users, Sparkles, Megaphone, Compass, Layers } from 'lucide-react';

interface DynamicQuestionsProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
}

export const DynamicQuestions: React.FC<DynamicQuestionsProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <div id="section-dinamica" className="w-full space-y-3.5 sm:space-y-4 mb-4 sm:mb-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-[#0B2B26] text-[#DFBE76] flex items-center justify-center text-xs shrink-0">
            <Layers className="w-3 h-3" />
          </span>
          <h2 className="font-serif-luxury text-xl sm:text-2xl font-semibold text-[#0B2B26]">
            Estruture sua campanha
          </h2>
        </div>
        <span className="text-[11px] text-[#997D4D] font-medium hidden sm:inline-block">
          5 perguntas objetivas
        </span>
      </div>

      {/* PERGUNTA 01 */}
      <div 
        id="card-pergunta-01" 
        className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4.5 border border-[#E8E1D7] shadow-xs transition-all duration-150 hover:border-[#C5A880]/60"
      >
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
          <span className="font-display-luxury text-[#997D4D] font-bold text-base sm:text-lg shrink-0 pt-0.5 tracking-wider">
            01
          </span>
          <div className="flex-1">
            <label htmlFor="field-q1" className="block font-serif-luxury text-base sm:text-lg font-semibold text-[#0B2B26] leading-snug">
              Quem você quer atingir? <span className="text-[#997D4D] font-bold">*</span>
            </label>
            <p className="text-[11px] sm:text-xs text-[#62776E] mt-0.5">
              Público-alvo, nicho, segmento ou perfil de cliente ideal.
            </p>
          </div>
        </div>
        <AutoGrowingTextarea
          id="field-q1"
          value={formData.q1}
          onChange={(e) => onChange('q1', e.target.value)}
          onBlur={() => onBlur('q1')}
          placeholder="Descreva o público que você deseja alcançar."
          error={errors.q1}
        />
      </div>

      {/* PERGUNTA 02 */}
      <div 
        id="card-pergunta-02" 
        className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4.5 border border-[#E8E1D7] shadow-xs transition-all duration-150 hover:border-[#C5A880]/60"
      >
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
          <span className="font-display-luxury text-[#997D4D] font-bold text-base sm:text-lg shrink-0 pt-0.5 tracking-wider">
            02
          </span>
          <div className="flex-1">
            <label htmlFor="field-q2" className="block font-serif-luxury text-base sm:text-lg font-semibold text-[#0B2B26] leading-snug">
              O que você vai oferecer? <span className="text-[#997D4D] font-bold">*</span>
            </label>
            <p className="text-[11px] sm:text-xs text-[#62776E] mt-0.5">
              Produto principal, serviço, diagnóstico, consultoria ou oportunidade.
            </p>
          </div>
        </div>
        <AutoGrowingTextarea
          id="field-q2"
          value={formData.q2}
          onChange={(e) => onChange('q2', e.target.value)}
          onBlur={() => onBlur('q2')}
          placeholder="Explique qual produto, serviço ou oportunidade será oferecida."
          error={errors.q2}
        />
      </div>

      {/* PERGUNTA 03 */}
      <div 
        id="card-pergunta-03" 
        className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4.5 border border-[#E8E1D7] shadow-xs transition-all duration-150 hover:border-[#C5A880]/60"
      >
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
          <span className="font-display-luxury text-[#997D4D] font-bold text-base sm:text-lg shrink-0 pt-0.5 tracking-wider">
            03
          </span>
          <div className="flex-1">
            <label htmlFor="field-q3" className="block font-serif-luxury text-base sm:text-lg font-semibold text-[#0B2B26] leading-snug">
              Qual anúncio chamaria atenção? <span className="text-[#997D4D] font-bold">*</span>
            </label>
            <p className="text-[11px] sm:text-xs text-[#62776E] mt-0.5">
              Gancho, dor principal, benefício imediato ou frase de impacto.
            </p>
          </div>
        </div>
        <AutoGrowingTextarea
          id="field-q3"
          value={formData.q3}
          onChange={(e) => onChange('q3', e.target.value)}
          onBlur={() => onBlur('q3')}
          placeholder="Descreva a ideia, mensagem ou criativo que despertaria interesse."
          error={errors.q3}
        />
      </div>

      {/* PERGUNTA 04 */}
      <div 
        id="card-pergunta-04" 
        className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4.5 border border-[#E8E1D7] shadow-xs transition-all duration-150 hover:border-[#C5A880]/60"
      >
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
          <span className="font-display-luxury text-[#997D4D] font-bold text-base sm:text-lg shrink-0 pt-0.5 tracking-wider">
            04
          </span>
          <div className="flex-1">
            <label htmlFor="field-q4" className="block font-serif-luxury text-base sm:text-lg font-semibold text-[#0B2B26] leading-snug">
              Para onde você enviaria a pessoa? <span className="text-[#997D4D] font-bold">*</span>
            </label>
            <p className="text-[11px] sm:text-xs text-[#62776E] mt-0.5">
              Canal de conversão e atendimento (ex.: WhatsApp, direct, landing page).
            </p>
          </div>
        </div>
        <AutoGrowingTextarea
          id="field-q4"
          value={formData.q4}
          onChange={(e) => onChange('q4', e.target.value)}
          onBlur={() => onBlur('q4')}
          placeholder="Ex.: WhatsApp, landing page, direct do Instagram, loja física."
          error={errors.q4}
        />
      </div>

      {/* PERGUNTA 05 (Campo Monetário em Reais) */}
      <div 
        id="card-pergunta-05" 
        className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 sm:p-4.5 border border-[#E8E1D7] shadow-xs transition-all duration-150 hover:border-[#C5A880]/60"
      >
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
          <span className="font-display-luxury text-[#997D4D] font-bold text-base sm:text-lg shrink-0 pt-0.5 tracking-wider">
            05
          </span>
          <div className="flex-1">
            <label htmlFor="field-q5" className="block font-serif-luxury text-base sm:text-lg font-semibold text-[#0B2B26] leading-snug">
              Quanto você pode pagar por um cliente? <span className="text-[#997D4D] font-bold">*</span>
            </label>
            <p className="text-[11px] sm:text-xs text-[#62776E] mt-0.5">
              Custo de Aquisição de Cliente (CAC) estimado ou teto viável.
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A958F]">
              <DollarSign className="w-4 h-4" />
            </div>
            <input
              id="field-q5"
              type="text"
              inputMode="numeric"
              value={formData.q5}
              onChange={(e) => {
                const formatted = formatCurrencyBRL(e.target.value);
                onChange('q5', formatted);
              }}
              onBlur={() => onBlur('q5')}
              placeholder="R$ 0,00"
              className={`w-full h-11 pl-9 pr-3.5 text-sm sm:text-[15px] font-medium bg-[#FAF8F5] border rounded-xl 
                transition-all duration-150 text-[#162420] placeholder-[#8A958F] outline-none
                ${
                  errors.q5
                    ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200/50'
                    : 'border-[#E0D8CE] focus:border-[#C5A880] focus:bg-white focus:ring-2 focus:ring-[#C5A880]/20'
                }`}
            />
          </div>
          {errors.q5 && (
            <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
              <span>•</span> {errors.q5}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
