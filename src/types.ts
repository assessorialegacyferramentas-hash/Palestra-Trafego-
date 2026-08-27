export interface FormData {
  fullName: string;
  whatsapp: string;
  company: string;
  instagram: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  consent: boolean;
}

export interface FormErrors {
  fullName?: string;
  whatsapp?: string;
  company?: string;
  instagram?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
  consent?: string;
}

export type AnalyticsEventType = 
  | 'form_start'
  | 'question_completed'
  | 'lead_form_submit'
  | 'whatsapp_open';

export interface AnalyticsPayload {
  questionNumber?: number;
  questionTitle?: string;
  hasCompany?: boolean;
  hasInstagram?: boolean;
  value?: string | number;
  [key: string]: unknown;
}
