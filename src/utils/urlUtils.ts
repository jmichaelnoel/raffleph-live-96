
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
