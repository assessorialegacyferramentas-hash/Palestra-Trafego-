import { FormData } from '../types';
import { WHATSAPP_PHONE_NORMALIZED } from '../config/assets';
import { sanitizeInput } from './masks';

/**
 * Builds the exact message requested for WhatsApp
 */
export function buildWhatsAppMessage(data: FormData): string {
  const nome = sanitizeInput(data.fullName);
  const whatsapp = sanitizeInput(data.whatsapp);
  const empresa = sanitizeInput(data.company) || 'Não informado';
  const instagram = sanitizeInput(data.instagram) || 'Não informado';

  const q1 = sanitizeInput(data.q1);
  const q2 = sanitizeInput(data.q2);
  const q3 = sanitizeInput(data.q3);
  const q4 = sanitizeInput(data.q4);
  const q5 = sanitizeInput(data.q5);

  return `Olá, Léo! Participei da dinâmica “Sua primeira campanha de tráfego na prática” e estas são as minhas respostas:

👤 Nome: ${nome}

📱 WhatsApp: ${whatsapp}

🏢 Empresa/Projeto: ${empresa}

📲 Instagram: ${instagram}

01 — Quem você quer atingir?

${q1}

02 — O que você vai oferecer?

${q2}

03 — Qual anúncio chamaria atenção?

${q3}

04 — Para onde você enviaria a pessoa?

${q4}

05 — Quanto você pode pagar por um cliente?

${q5}

Quero receber uma orientação da Legacy sobre a minha campanha.`;
}

/**
 * Returns the final WhatsApp URL with encoded message
 */
export function getWhatsAppURL(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NORMALIZED}?text=${encoded}`;
}
