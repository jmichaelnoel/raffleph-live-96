
export const sanitizeHtml = (input: string): string => {
  // Basic HTML sanitization - remove script tags and event handlers
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  if (!validateUrl(url)) {
    throw new Error('Invalid URL format');
  }
  
  // Remove any javascript: or data: protocols
  const cleanUrl = url.replace(/javascript:|data:/gi, '');
  
  // Validate again after cleaning
  if (!validateUrl(cleanUrl)) {
    throw new Error('URL failed security validation');
  }
  
  return cleanUrl;
};

export const validateImageUrl = (url: string): boolean => {
  if (!validateUrl(url)) return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const urlLower = url.toLowerCase();
  
  return imageExtensions.some(ext => urlLower.includes(ext)) || 
         urlLower.includes('image') || 
         urlLower.includes('img');
};

export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return sanitizeHtml(input).slice(0, maxLength);
};

export const validatePrize = (prize: number): boolean => {
  return typeof prize === 'number' && prize > 0 && prize <= 10000000; // Max 10M
};

export const validateBettingCost = (cost: number): boolean => {
  return typeof cost === 'number' && cost > 0 && cost <= 100000; // Max 100K
};

export const validateEntriesLeft = (entries: number): boolean => {
  return typeof entries === 'number' && entries >= 0 && entries <= 1000000; // Max 1M entries
};
