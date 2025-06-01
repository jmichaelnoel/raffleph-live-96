export type RaffleCategory = 'Electronics' | 'Cars' | 'Cash Prizes' | 'Property' | 'Travel' | 'Gadgets';

export const raffleCategories: RaffleCategory[] = [
  'Electronics',
  'Cars', 
  'Cash Prizes',
  'Property',
  'Travel',
  'Gadgets'
];

export interface Raffle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: RaffleCategory;
  prize: number;
  bettingCost: number;
  winningPercentage: number;
  endDate: string;
  organization: string;
  location: string;
  featured: boolean;
  entriesLeft?: number; // Add this optional property
}

export const raffles: Raffle[] = [
  {
    id: '1',
    title: 'iPhone 16 Pro Max Giveaway',
    description: 'Win the latest iPhone 16 Pro Max with 1TB storage. Brand new, sealed, and unlocked for all networks in the Philippines.',
    imageUrl: '/placeholder.svg',
    category: 'Electronics',
    prize: 89000,
    bettingCost: 50,
    winningPercentage: 0.001,
    endDate: '2025-08-15T23:59:59',
    organization: 'TechPH Raffles',
    location: 'Manila',
    featured: true,
    entriesLeft: 1500
  },
  {
    id: '2',
    title: 'Brand New Toyota Vios 2025',
    description: 'Drive home a brand new Toyota Vios 2025 model. Complete with 3-year warranty and full insurance coverage.',
    imageUrl: '/placeholder.svg',
    category: 'Cars',
    prize: 850000,
    bettingCost: 200,
    winningPercentage: 0.0005,
    endDate: '2025-09-30T23:59:59',
    organization: 'AutoDream PH',
    location: 'Quezon City',
    featured: true,
    entriesLeft: 2000
  },
  {
    id: '3',
    title: 'Cash Prize ₱100,000',
    description: 'Win ₱100,000 cash directly deposited to your bank account. No questions asked, pure cash prize.',
    imageUrl: '/placeholder.svg',
    category: 'Cash Prizes',
    prize: 100000,
    bettingCost: 25,
    winningPercentage: 0.002,
    endDate: '2025-07-20T23:59:59',
    organization: 'CashWin Philippines',
    location: 'Nationwide',
    featured: false,
    entriesLeft: 5000
  },
  {
    id: '4',
    title: 'MacBook Pro M4 16-inch',
    description: 'Latest MacBook Pro with M4 chip, 32GB RAM, 1TB SSD. Perfect for professionals and creatives.',
    imageUrl: '/placeholder.svg',
    category: 'Electronics',
    prize: 180000,
    bettingCost: 75,
    winningPercentage: 0.0008,
    endDate: '2025-08-01T23:59:59',
    organization: 'AppleFans PH',
    location: 'Makati',
    featured: true,
    entriesLeft: 800
  },
  {
    id: '5',
    title: 'Condo Unit in BGC',
    description: '1-bedroom fully furnished condo unit in Bonifacio Global City. Ready for occupancy with 5-year warranty.',
    imageUrl: '/placeholder.svg',
    category: 'Property',
    prize: 5500000,
    bettingCost: 500,
    winningPercentage: 0.0001,
    endDate: '2025-12-31T23:59:59',
    organization: 'PropertyDreams PH',
    location: 'Taguig',
    featured: true,
    entriesLeft: 300
  },
  {
    id: '6',
    title: 'Japan Travel Package for 2',
    description: '7-day Japan tour package for 2 people including flights, accommodation, and guided tours.',
    imageUrl: '/placeholder.svg',
    category: 'Travel',
    prize: 150000,
    bettingCost: 100,
    winningPercentage: 0.001,
    endDate: '2025-06-30T23:59:59',
    organization: 'TravelBuddy PH',
    location: 'Manila',
    featured: false,
    entriesLeft: 1200
  },
  {
    id: '7',
    title: 'Gaming Setup Ultimate',
    description: 'Complete gaming setup with RTX 4090, Intel i9, 4K monitor, mechanical keyboard, and gaming chair.',
    imageUrl: '/placeholder.svg',
    category: 'Gadgets',
    prize: 250000,
    bettingCost: 150,
    winningPercentage: 0.0006,
    endDate: '2025-10-15T23:59:59',
    organization: 'GamersHub PH',
    location: 'Cebu',
    featured: true,
    entriesLeft: 600
  }
];
