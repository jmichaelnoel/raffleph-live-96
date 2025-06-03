
import { Raffle } from '@/hooks/useRaffleData';

export type SortOption = 'featured' | 'prize-high' | 'prize-low' | 'win-rate-high' | 'win-rate-low' | 'cost-low' | 'cost-high' | 'draw-date';

export const sortRaffles = (raffles: Raffle[], sortOption: SortOption): Raffle[] => {
  const sorted = [...raffles];

  switch (sortOption) {
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.prize - a.prize;
      });
    
    case 'prize-high':
      return sorted.sort((a, b) => b.prize - a.prize);
    
    case 'prize-low':
      return sorted.sort((a, b) => a.prize - b.prize);
    
    case 'win-rate-high':
      return sorted.sort((a, b) => b.winningPercentage - a.winningPercentage);
    
    case 'win-rate-low':
      return sorted.sort((a, b) => a.winningPercentage - b.winningPercentage);
    
    case 'cost-low':
      return sorted.sort((a, b) => a.bettingCost - b.bettingCost);
    
    case 'cost-high':
      return sorted.sort((a, b) => b.bettingCost - a.bettingCost);
    
    case 'draw-date':
      return sorted.sort((a, b) => {
        // Items with draw dates come first, sorted by date
        if (a.drawDate && b.drawDate) {
          return new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime();
        }
        // Items with draw dates come before TBD items
        if (a.drawDate && !b.drawDate) return -1;
        if (!a.drawDate && b.drawDate) return 1;
        // Both TBD, sort by prize (high to low)
        return b.prize - a.prize;
      });
    
    default:
      return sorted;
  }
};
