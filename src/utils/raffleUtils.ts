
import { Raffle } from '@/data/raffles';

export type SortOption = 
  | 'newest'
  | 'prize-high-to-low'
  | 'prize-low-to-high'
  | 'win-high-to-low'
  | 'win-low-to-high'
  | 'bet-high-to-low'
  | 'bet-low-to-high'
  | 'end-date-asc'
  | 'end-date-desc';

export interface FilterState {
  category: string;
  prizeRange: [number, number];
  organization: string;
}

export const applyFilters = (raffles: Raffle[], filters: FilterState): Raffle[] => {
  return raffles.filter(raffle => {
    // Category filter
    if (filters.category !== 'all' && raffle.category !== filters.category) {
      return false;
    }
    
    // Prize range filter
    if (raffle.prize < filters.prizeRange[0] || raffle.prize > filters.prizeRange[1]) {
      return false;
    }
    
    // Organization filter
    if (filters.organization !== 'all' && raffle.organization !== filters.organization) {
      return false;
    }
    
    return true;
  });
};

export const applySorting = (raffles: Raffle[], sortBy: string): Raffle[] => {
  const sortedRaffles = [...raffles];
  
  switch (sortBy) {
    case 'newest':
      return sortedRaffles.sort((a, b) => 
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
    case 'prize-high-to-low':
      return sortedRaffles.sort((a, b) => b.prize - a.prize);
    case 'prize-low-to-high':
      return sortedRaffles.sort((a, b) => a.prize - b.prize);
    case 'win-high-to-low':
      return sortedRaffles.sort((a, b) => b.winningPercentage - a.winningPercentage);
    case 'win-low-to-high':
      return sortedRaffles.sort((a, b) => a.winningPercentage - b.winningPercentage);
    case 'bet-high-to-low':
      return sortedRaffles.sort((a, b) => b.bettingCost - a.bettingCost);
    case 'bet-low-to-high':
      return sortedRaffles.sort((a, b) => a.bettingCost - b.bettingCost);
    case 'end-date-asc':
      return sortedRaffles.sort((a, b) => 
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );
    case 'end-date-desc':
      return sortedRaffles.sort((a, b) => 
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
    default:
      return sortedRaffles;
  }
};

export const sortRaffles = (rafflesToSort: Raffle[], option: SortOption): Raffle[] => {
  const sortedRaffles = [...rafflesToSort];
  
  switch (option) {
    case 'prize-high-to-low':
      return sortedRaffles.sort((a, b) => b.prize - a.prize);
    case 'prize-low-to-high':
      return sortedRaffles.sort((a, b) => a.prize - b.prize);
    case 'win-high-to-low':
      return sortedRaffles.sort((a, b) => b.winningPercentage - a.winningPercentage);
    case 'win-low-to-high':
      return sortedRaffles.sort((a, b) => a.winningPercentage - b.winningPercentage);
    case 'bet-high-to-low':
      return sortedRaffles.sort((a, b) => b.bettingCost - a.bettingCost);
    case 'bet-low-to-high':
      return sortedRaffles.sort((a, b) => a.bettingCost - b.bettingCost);
    case 'end-date-asc':
      return sortedRaffles.sort((a, b) => 
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );
    case 'end-date-desc':
      return sortedRaffles.sort((a, b) => 
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
    default:
      return sortedRaffles;
  }
};
