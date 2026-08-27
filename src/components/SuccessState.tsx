import React, { useState } from 'react';
import { INSTITUTIONAL_ICON_URL, INSTITUTIONAL_ICON_FALLBACK_URL, INSTITUTIONAL_ICON_ALT } from '../config/assets';
import { SafeImage } from './SafeImage';
import { CheckCircle2, RotateCcw, MessageSquare, Copy, Check, ExternalLink } from 'lucide-react';

interface SuccessStateProps {
  onReopenWhatsApp: () => void;
  onEditResponses: () => void;
  messageText: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  onReopenWhatsApp,
  onEditResponses,
  messageText,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  return (
    <div 
      id="state-sucesso" 
      className="w-full max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#C5A880]/50 shadow-lg text-center my-4 animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Icon header with Legacy Institutional Badge */}
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="relative mb-3">
          <SafeImage
            src={INSTITUTIONAL_ICON_URL}
            fallbackSrc={INSTITUTIONAL_ICON_FALLBACK_URL}
            alt={INSTITUTIONAL_ICON_ALT}
            className="w-14 h-14 object-contain"
            containerClassName="flex items-center justify-center"
            fallbackPlaceholder={
              <div className="w-14 h-14 rounded-full bg-[#0B2B26] border border-[#C5A880] flex items-center justify-center text-[#DFBE76]">
                <CheckCircle2 className="w-7 h-7 text-[#DFBE76]" />
              </div>
            }
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center border-2 border-white shadow-xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        <span className="text-[11px] font-semibold tracking-widest text-[#997D4D] uppercase mb-1">
          DINÂMICA CONCLUÍDA
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0B2B26]">
          Campanha estruturada!
        </h2>
      </div>

      {/* Confirmation text */}
      <p className="text-sm sm:text-base text-[#314840] leading-relaxed mb-6 max-w-md mx-auto">
        Agora é só confirmar o envio da mensagem no WhatsApp para a equipe da Legacy.
      </p>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <button
          id="btn-reopen-whatsapp"
          type="button"
          onClick={onReopenWhatsApp}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0B2B26] hover:bg-[#08201C] text-[#FAF8F5] border border-[#C5A880]/50 font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          Abrir WhatsApp novamente
          <ExternalLink className="w-3.5 h-3.5 text-[#DFBE76]" />
        </button>

        <button
          id="btn-edit-responses"
          type="button"
          onClick={onEditResponses}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#0B2B26] border border-[#E0D8CE] font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#8A958F]" />
          Editar minhas respostas
        </button>
      </div>

      {/* Fallback Copy Box in case popup or link is blocked */}
      <div className="pt-4 border-t border-[#F0EAE1] text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#62776E]">
            Se o WhatsApp não abriu automaticamente:
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs text-[#0B2B26] hover:text-[#997D4D] font-semibold py-1 px-2.5 rounded-md bg-[#0B2B26]/5 hover:bg-[#0B2B26]/10 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copiar mensagem</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E0D8CE] text-xs text-[#314840] font-mono whitespace-pre-wrap max-h-32 overflow-y-auto select-all">
          {messageText}
        </div>
      </div>
    </div>
  );
};
