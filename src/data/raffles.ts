
export type RaffleCategory = 'Electronics' | 'Cars' | 'Cash Prizes' | 'Property' | 'Travel' | 'Gadgets' | 'Motorcycles';

export const raffleCategories: RaffleCategory[] = [
  'Electronics',
  'Cars', 
  'Cash Prizes',
  'Property',
  'Travel',
  'Gadgets',
  'Motorcycles'
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
  entriesLeft?: number;
  externalJoinUrl: string; // New field for external join links
  organizerFacebookUrl: string; // New field for organizer's FB page
  convertibleToCash: boolean; // New field from PRD
}

export const raffles: Raffle[] = [
  {
    id: '1',
    title: 'iPhone 16 Pro Max Giveaway',
    description: 'Win the latest iPhone 16 Pro Max with 1TB storage. Brand new, sealed, and unlocked for all networks in the Philippines. Drawing will be done via Facebook Live.',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Electronics',
    prize: 89000,
    bettingCost: 50,
    winningPercentage: 0.001,
    endDate: '2025-06-15T23:59:59',
    organization: 'TechPH Raffles',
    location: 'Manila',
    featured: true,
    entriesLeft: 1500,
    externalJoinUrl: 'https://m.me/techphraffles',
    organizerFacebookUrl: 'https://facebook.com/techphraffles',
    convertibleToCash: false
  },
  {
    id: '2',
    title: 'Brand New Toyota Vios 2025',
    description: 'Drive home a brand new Toyota Vios 2025 model. Complete with 3-year warranty and full insurance coverage. Perfect for your family needs!',
    imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Cars',
    prize: 850000,
    bettingCost: 200,
    winningPercentage: 0.0005,
    endDate: '2025-09-30T23:59:59',
    organization: 'AutoDream PH',
    location: 'Quezon City',
    featured: true,
    entriesLeft: 2000,
    externalJoinUrl: 'https://m.me/autodreamph',
    organizerFacebookUrl: 'https://facebook.com/autodreamph',
    convertibleToCash: true
  },
  {
    id: '3',
    title: 'Cash Prize ₱100,000',
    description: 'Win ₱100,000 cash directly deposited to your bank account. No questions asked, pure cash prize. Drawing every Sunday via Facebook Live.',
    imageUrl: 'https://images.unsplash.com/photo-1554672723-d42a16e533db?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Cash Prizes',
    prize: 100000,
    bettingCost: 25,
    winningPercentage: 0.002,
    endDate: '2025-06-20T23:59:59',
    organization: 'CashWin Philippines',
    location: 'Nationwide',
    featured: false,
    entriesLeft: 5000,
    externalJoinUrl: 'https://m.me/cashwinph',
    organizerFacebookUrl: 'https://facebook.com/cashwinphilippines',
    convertibleToCash: true
  },
  {
    id: '4',
    title: 'MacBook Pro M4 16-inch',
    description: 'Latest MacBook Pro with M4 chip, 32GB RAM, 1TB SSD. Perfect for professionals and creatives. Brand new with 1-year Apple warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Electronics',
    prize: 180000,
    bettingCost: 75,
    winningPercentage: 0.0008,
    endDate: '2025-08-01T23:59:59',
    organization: 'AppleFans PH',
    location: 'Makati',
    featured: true,
    entriesLeft: 800,
    externalJoinUrl: 'https://m.me/applefansph',
    organizerFacebookUrl: 'https://facebook.com/applefansphilippines',
    convertibleToCash: false
  },
  {
    id: '5',
    title: 'Yamaha NMAX 155 2025 Model',
    description: 'Brand new Yamaha NMAX 155 with complete papers and registration. Perfect for Metro Manila traffic. Color: Matte Black.',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Motorcycles',
    prize: 120000,
    bettingCost: 100,
    winningPercentage: 0.001,
    endDate: '2025-07-15T23:59:59',
    organization: 'Moto Raffle PH',
    location: 'Pasig',
    featured: true,
    entriesLeft: 1000,
    externalJoinUrl: 'https://m.me/motorafflesph',
    organizerFacebookUrl: 'https://facebook.com/motorafflesph',
    convertibleToCash: true
  },
  {
    id: '6',
    title: 'Japan Travel Package for 2',
    description: '7-day Japan tour package for 2 people including flights, accommodation, and guided tours. Tokyo-Kyoto-Osaka itinerary with JR Pass included.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Travel',
    prize: 150000,
    bettingCost: 100,
    winningPercentage: 0.001,
    endDate: '2025-06-30T23:59:59',
    organization: 'TravelBuddy PH',
    location: 'Manila',
    featured: false,
    entriesLeft: 1200,
    externalJoinUrl: 'https://m.me/travelbuddyph',
    organizerFacebookUrl: 'https://facebook.com/travelbuddyphilippines',
    convertibleToCash: false
  },
  {
    id: '7',
    title: 'Gaming Setup Ultimate',
    description: 'Complete gaming setup with RTX 4090, Intel i9, 4K monitor, mechanical keyboard, and gaming chair. Total value ₱250,000.',
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Gadgets',
    prize: 250000,
    bettingCost: 150,
    winningPercentage: 0.0006,
    endDate: '2025-10-15T23:59:59',
    organization: 'GamersHub PH',
    location: 'Cebu',
    featured: true,
    entriesLeft: 600,
    externalJoinUrl: 'https://m.me/gamershubph',
    organizerFacebookUrl: 'https://facebook.com/gamershubphilippines',
    convertibleToCash: true
  },
  {
    id: '8',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Latest Samsung Galaxy S24 Ultra 512GB with S Pen. Brand new, factory unlocked. Perfect for photography and productivity.',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Electronics',
    prize: 75000,
    bettingCost: 40,
    winningPercentage: 0.0015,
    endDate: '2025-06-25T23:59:59',
    organization: 'MobileWorld PH',
    location: 'Taguig',
    featured: false,
    entriesLeft: 2500,
    externalJoinUrl: 'https://m.me/mobileworldph',
    organizerFacebookUrl: 'https://facebook.com/mobileworldphilippines',
    convertibleToCash: false
  },
  {
    id: '9',
    title: 'Honda Beat 2025 Motorcycle',
    description: 'Brand new Honda Beat 2025 model, fuel efficient and perfect for daily commute. Complete with registration and OR/CR.',
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Motorcycles',
    prize: 85000,
    bettingCost: 60,
    winningPercentage: 0.0012,
    endDate: '2025-08-20T23:59:59',
    organization: 'RideOn Raffles',
    location: 'Marikina',
    featured: false,
    entriesLeft: 1800,
    externalJoinUrl: 'https://m.me/rideonraffles',
    organizerFacebookUrl: 'https://facebook.com/rideonrafflesph',
    convertibleToCash: true
  },
  {
    id: '10',
    title: 'Cash Prize ₱250,000',
    description: 'Quarter million pesos cash prize! Direct bank transfer upon winning. Drawing done via Facebook Live with independent witness.',
    imageUrl: 'https://images.unsplash.com/photo-1619375181207-60d0cf2e6ca9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Cash Prizes',
    prize: 250000,
    bettingCost: 80,
    winningPercentage: 0.0008,
    endDate: '2025-12-25T23:59:59',
    organization: 'MegaCash PH',
    location: 'Nationwide',
    featured: true,
    entriesLeft: 3000,
    externalJoinUrl: 'https://m.me/megacashph',
    organizerFacebookUrl: 'https://facebook.com/megacashphilippines',
    convertibleToCash: true
  },
  {
    id: '11',
    title: 'Mitsubishi Mirage G4 2025',
    description: 'Brand new Mitsubishi Mirage G4 sedan with 5-year warranty. Fuel efficient and perfect for families. Color: Pearl White.',
    imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Cars',
    prize: 750000,
    bettingCost: 180,
    winningPercentage: 0.0006,
    endDate: '2025-11-15T23:59:59',
    organization: 'CarDreams PH',
    location: 'Las Piñas',
    featured: false,
    entriesLeft: 1500,
    externalJoinUrl: 'https://m.me/cardreamsph',
    organizerFacebookUrl: 'https://facebook.com/cardreamsphilippines',
    convertibleToCash: true
  },
  {
    id: '12',
    title: 'Condominium Studio Unit BGC',
    description: 'Fully furnished studio unit in Bonifacio Global City. Ready for occupancy with 5-year warranty. Perfect investment property.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    category: 'Property',
    prize: 3500000,
    bettingCost: 400,
    winningPercentage: 0.0002,
    endDate: '2025-12-31T23:59:59',
    organization: 'PropertyDreams PH',
    location: 'Taguig',
    featured: true,
    entriesLeft: 500,
    externalJoinUrl: 'https://m.me/propertydreamsph',
    organizerFacebookUrl: 'https://facebook.com/propertydreamsphilippines',
    convertibleToCash: false
  }
];
