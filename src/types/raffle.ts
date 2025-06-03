
export interface Raffle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  prize: number;
  bettingCost: number;
  winningPercentage: number;
  drawDate: string | null; // Changed from endDate to drawDate
  organization: string;
  location: string;
  externalJoinUrl: string;
  organizerFacebookUrl: string;
  entriesLeft: number | null;
  convertibleToCash: boolean;
  featured: boolean;
}

export type DrawDateStatus = 'confirmed' | 'tbd' | 'all';
