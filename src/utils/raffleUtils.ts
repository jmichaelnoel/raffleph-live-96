
import { Raffle } from '@/types/raffle';

export type SortOption = 
  | 'featured'
  | 'prize-high-to-low'
  | 'prize-low-to-high'
  | 'win-high-to-low'
  | 'win-low-to-high'
  | 'bet-high-to-low'
  | 'bet-low-to-high'
  | 'end-date-asc'
  | 'end-date-desc';

export const sortRaffles = (raffles: Raffle[], sortOption: SortOption): Raffle[] => {
  const sorted = [...raffles];

  switch (sortOption) {
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.prize - a.prize;
      });
    
    case 'prize-high-to-low':
      return sorted.sort((a, b) => b.prize - a.prize);
    
    case 'prize-low-to-high':
      return sorted.sort((a, b) => a.prize - b.prize);
    
    case 'win-high-to-low':
      return sorted.sort((a, b) => b.winningPercentage - a.winningPercentage);
    
    case 'win-low-to-high':
      return sorted.sort((a, b) => a.winningPercentage - b.winningPercentage);
    
    case 'bet-low-to-high':
      return sorted.sort((a, b) => a.bettingCost - b.bettingCost);
    
    case 'bet-high-to-low':
      return sorted.sort((a, b) => b.bettingCost - a.bettingCost);
    
    case 'end-date-asc':
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
    
    case 'end-date-desc':
      return sorted.sort((a, b) => {
        // Items with draw dates come first, sorted by date (desc)
        if (a.drawDate && b.drawDate) {
          return new Date(b.drawDate).getTime() - new Date(a.drawDate).getTime();
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
