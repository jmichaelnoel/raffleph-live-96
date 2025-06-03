
export type RaffleCategory = 'Gadgets' | 'Cars' | 'Cash' | 'Motorcycle';

export interface Raffle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: RaffleCategory;
  prize: number;
  bettingCost: number;
  winningPercentage: number;
  drawDate: string | null;
  organization: string;
  location: string;
  externalJoinUrl: string;
  organizerFacebookUrl: string;
  entriesLeft: number | null;
  convertibleToCash: boolean;
  featured: boolean;
}

export type DrawDateStatus = 'confirmed' | 'tbd' | 'all';
