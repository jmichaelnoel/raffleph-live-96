
export interface Raffle {
  id: string;
  title: string;
  organization: string;
  description: string;
  prize: number; // Prize value in PHP
  winningPercentage: number; // Percentage as a decimal (0.01 = 1%)
  bettingCost: number; // Cost in PHP
  endDate: string; // ISO Date string
  imageUrl: string;
  location: string;
  category: RaffleCategory;
  featured: boolean;
  ticketsLeft: number;
}

export type RaffleCategory = 'Cash' | 'Electronics' | 'Cars' | 'Property' | 'Charity' | 'Travel';

export const raffles: Raffle[] = [
  {
    id: '1',
    title: 'Mega Million Jackpot',
    organization: 'PCSO',
    description: 'Win the biggest cash prize of the year in our nationwide lottery draw.',
    prize: 10000000, // 10 million PHP
    winningPercentage: 0.0001,
    bettingCost: 20,
    endDate: '2026-01-15T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Metro Manila',
    category: 'Cash',
    featured: true,
    ticketsLeft: 50000
  },
  {
    id: '2',
    title: 'Brand New Toyota Vios',
    organization: 'SM Supermalls',
    description: 'Get a chance to drive home a brand new Toyota Vios 2024 model.',
    prize: 850000,
    winningPercentage: 0.002,
    bettingCost: 100,
    endDate: '2025-12-25T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Nationwide',
    category: 'Cars',
    featured: true,
    ticketsLeft: 2500
  },
  {
    id: '3',
    title: 'iPhone 16 Pro Giveaway',
    organization: 'Digital Walker',
    description: 'Win the latest iPhone 16 Pro with 512GB storage.',
    prize: 89000,
    winningPercentage: 0.01,
    bettingCost: 50,
    endDate: '2025-08-30T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Makati',
    category: 'Electronics',
    featured: false,
    ticketsLeft: 1200
  },
  {
    id: '4',
    title: 'Boracay Dream Vacation',
    organization: 'Cebu Pacific',
    description: 'Win a 5-day all-expense-paid vacation for two in Boracay.',
    prize: 120000,
    winningPercentage: 0.005,
    bettingCost: 200,
    endDate: '2025-10-15T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Aklan',
    category: 'Travel',
    featured: false,
    ticketsLeft: 1500
  },
  {
    id: '5',
    title: 'Condo Unit in BGC',
    organization: 'Ayala Land',
    description: 'Win a fully furnished studio unit in BGC worth 8 million pesos.',
    prize: 8000000,
    winningPercentage: 0.0005,
    bettingCost: 5000,
    endDate: '2026-03-01T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Taguig',
    category: 'Property',
    featured: true,
    ticketsLeft: 500
  },
  {
    id: '6',
    title: 'PS5 Pro Gaming Bundle',
    organization: 'DataBlitz',
    description: 'Win a PlayStation 5 Pro with 5 games and accessories.',
    prize: 50000,
    winningPercentage: 0.02,
    bettingCost: 100,
    endDate: '2025-09-20T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Quezon City',
    category: 'Electronics',
    featured: false,
    ticketsLeft: 800
  },
  {
    id: '7',
    title: 'Help Children with Cancer',
    organization: 'Philippine Cancer Society',
    description: 'Join our charity raffle and help children battling cancer. Win cash prizes while supporting a good cause.',
    prize: 300000,
    winningPercentage: 0.008,
    bettingCost: 500,
    endDate: '2025-11-30T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Manila',
    category: 'Charity',
    featured: true,
    ticketsLeft: 3000
  },
  {
    id: '8',
    title: 'Gaming PC Setup',
    organization: 'PC Express',
    description: 'Win a complete high-end gaming PC setup with RTX 4090.',
    prize: 250000,
    winningPercentage: 0.015,
    bettingCost: 300,
    endDate: '2025-08-15T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Cebu',
    category: 'Electronics',
    featured: false,
    ticketsLeft: 600
  },
  {
    id: '9',
    title: 'Honda Motorcycle',
    organization: 'Honda Philippines',
    description: 'Win a brand new Honda PCX 160 scooter.',
    prize: 150000,
    winningPercentage: 0.012,
    bettingCost: 150,
    endDate: '2025-10-01T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Davao',
    category: 'Cars',
    featured: false,
    ticketsLeft: 2000
  },
  {
    id: '10',
    title: 'Home Makeover Package',
    organization: 'SM Home',
    description: 'Win a complete home makeover worth P500,000.',
    prize: 500000,
    winningPercentage: 0.004,
    bettingCost: 250,
    endDate: '2025-12-01T00:00:00Z',
    imageUrl: '/placeholder.svg',
    location: 'Pasig',
    category: 'Property',
    featured: true,
    ticketsLeft: 1800
  }
];

// Categories for filtering
export const raffleCategories: RaffleCategory[] = [
  'Cash', 'Electronics', 'Cars', 'Property', 'Charity', 'Travel'
];
