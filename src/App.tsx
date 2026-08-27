import React, { useState, useEffect, useRef } from 'react';
import { FormData, FormErrors } from './types';
import { isValidBrazilianPhone } from './utils/masks';
import { buildWhatsAppMessage, getWhatsAppURL } from './utils/whatsapp';
import { trackEvent } from './utils/analytics';
import { Header } from './components/Header';
import { Presentation } from './components/Presentation';
import { PhraseSticker } from './components/PhraseSticker';
import { IdentificationSection } from './components/IdentificationSection';
import { DynamicQuestions } from './components/DynamicQuestions';
import { ConsentAndSubmit } from './components/ConsentAndSubmit';
import { SuccessState } from './components/SuccessState';
import { LegacyWatermark } from './components/LegacyWatermark';

const STORAGE_KEY = 'legacy_campanha_dinamica_form_v1';

const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  whatsapp: '',
  company: '',
  instagram: '',
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
  consent: false,
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_FORM_DATA, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore localStorage errors
    }
    return INITIAL_FORM_DATA;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');

  const formStartedRef = useRef<boolean>(false);
  const completedQuestionsRef = useRef<Set<number>>(new Set());

  // Save progress to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignore quota errors
    }
  }, [formData]);

  // Validation logic
  const validateField = (field: keyof FormData, value: unknown): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Informe seu nome completo (mínimo 3 caracteres)';
        }
        return undefined;
      case 'whatsapp':
        if (!value || typeof value !== 'string' || !isValidBrazilianPhone(value)) {
          return 'Informe um número de WhatsApp válido com DDD';
        }
        return undefined;
      case 'q1':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Responda quem você deseja atingir';
        }
        return undefined;
      case 'q2':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Responda o que você vai oferecer';
        }
        return undefined;
      case 'q3':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Responda qual anúncio chamaria atenção';
        }
        return undefined;
      case 'q4':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Responda para onde você enviaria o lead';
        }
        return undefined;
      case 'q5':
        if (!value || typeof value !== 'string' || value.trim() === '' || value === 'R$ 0,00') {
          return 'Informe quanto pode pagar por cliente';
        }
        return undefined;
      case 'consent':
        if (!value) {
          return 'É necessário concordar para prosseguir com o envio';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const fieldsToValidate: (keyof FormData)[] = [
      'fullName',
      'whatsapp',
      'q1',
      'q2',
      'q3',
      'q4',
      'q5',
      'consent',
    ];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Quick validity checker for enabling/disabling button
  const isFormValid =
    formData.fullName.trim().length >= 3 &&
    isValidBrazilianPhone(formData.whatsapp) &&
    formData.q1.trim().length >= 3 &&
    formData.q2.trim().length >= 3 &&
    formData.q3.trim().length >= 3 &&
    formData.q4.trim().length >= 3 &&
    Boolean(formData.q5.trim() && formData.q5 !== 'R$ 0,00') &&
    formData.consent;

  // Handle field change with automatic tracking
  const handleFieldChange = (field: keyof FormData, value: string | boolean) => {
    // Track form_start on first interaction
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent('form_start');
    }

    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });

    // Clear error if touched
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }

    // Track question_completed event
    if (['q1', 'q2', 'q3', 'q4', 'q5'].includes(field) && typeof value === 'string') {
      const qIndexMap: Record<string, number> = { q1: 1, q2: 2, q3: 3, q4: 4, q5: 5 };
      const qNum = qIndexMap[field];
      if (value.trim().length >= 5 && !completedQuestionsRef.current.has(qNum)) {
        completedQuestionsRef.current.add(qNum);
        trackEvent('question_completed', {
          questionNumber: qNum,
          questionTitle: `Pergunta 0${qNum}`,
        });
      }
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  // WhatsApp trigger
  const executeOpenWhatsApp = (message: string) => {
    const targetUrl = getWhatsAppURL(message);
    trackEvent('whatsapp_open', {
      hasCompany: Boolean(formData.company),
      hasInstagram: Boolean(formData.instagram),
    });

    // Open WhatsApp in new tab / app
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // If popup blocker intervened, fallback to top level or let success state handle copy/direct link
      window.location.href = targetUrl;
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    if (!validateAll()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[class*="border-red-"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);

    // Track lead submission
    trackEvent('lead_form_submit', {
      hasCompany: Boolean(formData.company),
      hasInstagram: Boolean(formData.instagram),
      cacStated: formData.q5,
    });

    const msg = buildWhatsAppMessage(formData);
    setGeneratedMessage(msg);

    // Brief smooth transition
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmittedSuccess(true);
      executeOpenWhatsApp(msg);
      // Scroll to top of success card
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#162420] flex flex-col items-center relative overflow-x-hidden">
      {/* Background Watermark & Architectural Accents */}
      <LegacyWatermark />

      {/* Main Container - max-w ~700px for tight, conversion-focused layout */}
      <main className="w-full max-w-[700px] mx-auto px-3.5 sm:px-5 py-2 sm:py-4 z-10 flex flex-col">
        {/* Top Header */}
        <Header />

        {/* Presentation Header */}
        <Presentation />

        {/* Institutional Phrase Sticker */}
        <PhraseSticker />

        {/* State Conditional: Form vs Success State */}
        {isSubmittedSuccess ? (
          <SuccessState
            messageText={generatedMessage || buildWhatsAppMessage(formData)}
            onReopenWhatsApp={() => executeOpenWhatsApp(generatedMessage || buildWhatsAppMessage(formData))}
            onEditResponses={() => {
              setIsSubmittedSuccess(false);
            }}
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="w-full">
            {/* Identification Section */}
            <IdentificationSection
              formData={formData}
              errors={errors}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />

            {/* Dynamic Questions (01 to 05) */}
            <DynamicQuestions
              formData={formData}
              errors={errors}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />

            {/* Consent Checkbox, Submit CTA & Concept Sticker */}
            <ConsentAndSubmit
              consent={formData.consent}
              onConsentChange={(checked) => handleFieldChange('consent', checked)}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isFormValid={isFormValid}
              errors={errors}
            />
          </form>
        )}

        {/* Minimalist Footer */}
        <footer className="mt-4 pt-3 pb-6 border-t border-[#E8E1D7] text-center text-xs text-[#8A958F]">
          <p className="font-medium text-[#4E625A]">
            Legacy Growth Partner © {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-[#A2ADA7] mt-0.5">
            Dinâmica prática para participantes da palestra
          </p>
        </footer>
      </main>
    </div>
  );
}
