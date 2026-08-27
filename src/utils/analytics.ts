import { AnalyticsEventType, AnalyticsPayload } from '../types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatches tracking events to Google Tag Manager (dataLayer),
 * Google Analytics 4 (gtag), and Meta Pixel (fbq) if available.
 */
export function trackEvent(eventName: AnalyticsEventType, payload: AnalyticsPayload = {}) {
  // 1. Google Tag Manager / dataLayer
  if (typeof window !== 'undefined') {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push({
      event: eventName,
      ...payload,
      timestamp: new Date().toISOString(),
    });

    // 2. Google Analytics 4 (gtag)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }

    // 3. Meta Pixel (fbq)
    if (typeof window.fbq === 'function') {
      if (eventName === 'lead_form_submit') {
        window.fbq('track', 'Lead', payload);
      } else if (eventName === 'whatsapp_open') {
        window.fbq('trackCustom', 'WhatsAppOpen', payload);
      } else {
        window.fbq('trackCustom', eventName, payload);
      }
    }

    // Development / Debug logging
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Event] ${eventName}:`, payload);
    }
  }
}
