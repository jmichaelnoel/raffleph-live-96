
import DOMPurify from 'dompurify';

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation and sanitization
export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  if (!validateUrl(url)) {
    return '';
  }
  return url.trim();
};

// HTML sanitization to prevent XSS
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
};

// Text sanitization for user inputs
export const sanitizeText = (text: string): string => {
  return text.trim().replace(/[<>]/g, '');
};

// Number validation with range checking
export const validateNumber = (value: any, min?: number, max?: number): boolean => {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};

// Prize validation
export const validatePrize = (prize: number): boolean => {
  return validateNumber(prize, 1, 100000000); // 1 to 100M
};

// Betting cost validation
export const validateBettingCost = (cost: number): boolean => {
  return validateNumber(cost, 1, 10000); // 1 to 10K
};

// Category validation
export const VALID_CATEGORIES = ['Cash', 'Cars', 'Motorcycle', 'Gadgets'];
export const validateCategory = (category: string): boolean => {
  return VALID_CATEGORIES.includes(category);
};

// File validation
export const validateFileType = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
};

// Comprehensive form validation
export interface SubmissionValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateSubmissionForm = (data: any): SubmissionValidationResult => {
  const errors: string[] = [];

  // Title validation
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  if (data.title && data.title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }

  // Description validation
  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  if (data.description && data.description.length > 2000) {
    errors.push('Description must not exceed 2000 characters');
  }

  // Prize validation
  if (!validatePrize(data.prize)) {
    errors.push('Prize must be between ₱1 and ₱100,000,000');
  }

  // Category validation
  if (!validateCategory(data.category)) {
    errors.push('Please select a valid category');
  }

  // Betting cost validation (if provided)
  if (data.betting_cost && !validateBettingCost(data.betting_cost)) {
    errors.push('Betting cost must be between ₱1 and ₱10,000');
  }

  // URL validations (if provided)
  if (data.organizer_facebook_url && !validateUrl(data.organizer_facebook_url)) {
    errors.push('Facebook URL is not valid');
  }
  if (data.raffle_details_url && !validateUrl(data.raffle_details_url)) {
    errors.push('Raffle details URL is not valid');
  }
  if (data.slot_inquiry_url && !validateUrl(data.slot_inquiry_url)) {
    errors.push('Slot inquiry URL is not valid');
  }

  // Entries left validation (if provided)
  if (data.entries_left && !validateNumber(data.entries_left, 1, 1000000)) {
    errors.push('Entries left must be between 1 and 1,000,000');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
