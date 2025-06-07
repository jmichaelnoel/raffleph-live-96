
export const normalizeUrl = (url: string): string => {
  if (!url) return '';
  
  const trimmedUrl = url.trim();
  
  // If URL doesn't start with http:// or https://, add https://
  if (!trimmedUrl.match(/^https?:\/\//)) {
    return `https://${trimmedUrl}`;
  }
  
  return trimmedUrl;
};

export const isValidUrl = (url: string): boolean => {
  try {
    const normalizedUrl = normalizeUrl(url);
    new URL(normalizedUrl);
    return true;
  } catch {
    return false;
  }
};

export const validateUrls = (urls: string[]): { valid: string[], invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];
  
  urls.forEach(url => {
    if (isValidUrl(url)) {
      valid.push(normalizeUrl(url));
    } else {
      invalid.push(url);
    }
  });
  
  return { valid, invalid };
};
