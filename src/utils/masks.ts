/**
 * Utility functions for masks and data sanitization
 */

/**
 * Format Brazilian phone number: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 */
export function formatBrazilianPhone(value: string): string {
  if (!value) return '';
  
  // Extract only numbers
  const digits = value.replace(/\D/g, '').slice(0, 11);
  
  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Validate Brazilian phone (must have 10 or 11 digits with valid area code)
 */
export function isValidBrazilianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) return false;
  
  // Area code (DDD) validation: 11-99
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;

  // If 11 digits, the 3rd digit should be 9 for mobile in Brazil
  if (digits.length === 11 && digits[2] !== '9') return false;

  return true;
}

/**
 * Format Currency in Brazilian Real (BRL) - R$ 0,00
 */
export function formatCurrencyBRL(value: string | number): string {
  if (value === '' || value === null || value === undefined) return '';

  let numericValue: number;
  if (typeof value === 'number') {
    numericValue = value;
  } else {
    // Remove all non-digits
    const cleanDigits = value.toString().replace(/\D/g, '');
    if (!cleanDigits) return '';
    numericValue = parseInt(cleanDigits, 10) / 100;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

/**
 * Sanitize user input strings (remove excess whitespace, prevent dangerous control characters)
 */
export function sanitizeInput(value: string): string {
  if (!value) return '';
  return value
    .replace(/[\r\n]{3,}/g, '\n\n') // Normalize multiple linebreaks
    .trim();
}
