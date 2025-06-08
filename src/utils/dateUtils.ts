
export const isValidDate = (dateString: string | null): boolean => {
  if (!dateString || dateString.toLowerCase() === 'tbd') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const calculateDaysLeft = (endDate: string | null): number | string => {
  if (!endDate || endDate.toLowerCase() === 'tbd') {
    return 'TBD';
  }
  
  const date = new Date(endDate);
  if (isNaN(date.getTime())) {
    return 'TBD';
  }
  
  const today = new Date();
  const timeDiff = date.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return Math.max(0, daysDiff);
};

export const formatDrawDate = (dateString: string | null): string => {
  if (!dateString || dateString.toLowerCase() === 'tbd') {
    return 'TBD';
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'TBD';
  }
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
