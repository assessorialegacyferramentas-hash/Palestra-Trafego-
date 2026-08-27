import React from 'react';
import { FormData, FormErrors } from '../types';
import { formatBrazilianPhone } from '../utils/masks';
import { User, Phone, Building2, Instagram } from 'lucide-react';

interface IdentificationSectionProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
}

export const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <div id="section-identificacao" className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#E8E1D7] shadow-xs mb-4 sm:mb-5">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-[#F0EAE1]">
        <div className="w-5 h-5 rounded-md bg-[#0B2B26] text-[#DFBE76] flex items-center justify-center text-xs font-semibold shrink-0">
          <User className="w-3 h-3" />
        </div>
        <div>
          <h2 className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#0B2B26] leading-tight">
            Antes de começar, conte quem é você
          </h2>
          <p className="text-[11px] sm:text-xs text-[#62776E]">
            Seus dados para identificação e retorno da equipe
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {/* Nome Completo */}
        <div className="sm:col-span-2">
          <label htmlFor="field-full-name" className="block text-xs sm:text-sm font-medium text-[#1A2621] mb-1">
            Nome completo <span className="text-[#997D4D] font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A958F]">
              <User className="w-4 h-4" />
            </div>
            <input
              id="field-full-name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={() => onBlur('fullName')}
              placeholder="Digite seu nome completo"
              className={`w-full h-11 pl-9 pr-3.5 text-sm sm:text-[15px] bg-[#FAF8F5] border rounded-xl 
                transition-all duration-150 text-[#162420] placeholder-[#8A958F] outline-none
                ${
                  errors.fullName
                    ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200/50'
                    : 'border-[#E0D8CE] focus:border-[#C5A880] focus:bg-white focus:ring-2 focus:ring-[#C5A880]/20'
                }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
              <span>•</span> {errors.fullName}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="sm:col-span-2">
          <label htmlFor="field-whatsapp" className="block text-xs sm:text-sm font-medium text-[#1A2621] mb-1">
            WhatsApp <span className="text-[#997D4D] font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A958F]">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="field-whatsapp"
              type="tel"
              name="tel"
              autoComplete="tel"
              inputMode="numeric"
              value={formData.whatsapp}
              onChange={(e) => onChange('whatsapp', formatBrazilianPhone(e.target.value))}
              onBlur={() => onBlur('whatsapp')}
              placeholder="(84) 99999-9999"
              className={`w-full h-11 pl-9 pr-3.5 text-sm sm:text-[15px] bg-[#FAF8F5] border rounded-xl 
                transition-all duration-150 text-[#162420] placeholder-[#8A958F] outline-none
                ${
                  errors.whatsapp
                    ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200/50'
                    : 'border-[#E0D8CE] focus:border-[#C5A880] focus:bg-white focus:ring-2 focus:ring-[#C5A880]/20'
                }`}
            />
          </div>
          {errors.whatsapp && (
            <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
              <span>•</span> {errors.whatsapp}
            </p>
          )}
        </div>

        {/* Empresa / Projeto (Opcional) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="field-company" className="block text-xs sm:text-sm font-medium text-[#1A2621]">
              Empresa ou ideia
            </label>
            <span className="text-[10px] text-[#8A958F]">Opcional</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A958F]">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              id="field-company"
              type="text"
              value={formData.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="Seu negócio ou ideia"
              className="w-full h-11 pl-9 pr-3.5 text-sm sm:text-[15px] bg-[#FAF8F5] border border-[#E0D8CE] rounded-xl 
                transition-all duration-150 text-[#162420] placeholder-[#8A958F] outline-none
                focus:border-[#C5A880] focus:bg-white focus:ring-2 focus:ring-[#C5A880]/20"
            />
          </div>
        </div>

        {/* Instagram (Opcional) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="field-instagram" className="block text-xs sm:text-sm font-medium text-[#1A2621]">
              Instagram
            </label>
            <span className="text-[10px] text-[#8A958F]">Opcional</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A958F]">
              <Instagram className="w-4 h-4" />
            </div>
            <input
              id="field-instagram"
              type="text"
              value={formData.instagram}
              onChange={(e) => {
                let val = e.target.value.trim();
                if (val && !val.startsWith('@') && !val.includes('/')) {
                  val = `@${val}`;
                }
                onChange('instagram', val);
              }}
              placeholder="@seuperfil"
              className="w-full h-11 pl-9 pr-3.5 text-sm sm:text-[15px] bg-[#FAF8F5] border border-[#E0D8CE] rounded-xl 
                transition-all duration-150 text-[#162420] placeholder-[#8A958F] outline-none
                focus:border-[#C5A880] focus:bg-white focus:ring-2 focus:ring-[#C5A880]/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
