
import { useState, useEffect } from 'react';
import { Raffle, RaffleCategory, raffles as allRaffles } from '@/data/raffles';
import { SortOption, sortRaffles } from '@/utils/raffleUtils';

export const useRaffleData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('prize-high-to-low');
  const [selectedCategories, setSelectedCategories] = useState<RaffleCategory[]>([]);
  
  const maxPrize = Math.max(...allRaffles.map(raffle => raffle.prize), 0);
  const maxBet = Math.max(...allRaffles.map(raffle => raffle.bettingCost), 0);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrize]);
  const [betRange, setBetRange] = useState<[number, number]>([0, maxBet]);
  const [winRateRange, setWinRateRange] = useState<[number, number]>([0, 0.02]); // Assuming max win rate for slider
  
  const [filteredRaffles, setFilteredRaffles] = useState<Raffle[]>(allRaffles);

  useEffect(() => {
    let result = [...allRaffles];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        raffle => 
          raffle.title.toLowerCase().includes(query) || 
          raffle.description.toLowerCase().includes(query) ||
          raffle.organization.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategories.length > 0) {
      result = result.filter(raffle => 
        selectedCategories.includes(raffle.category)
      );
    }
    
    result = result.filter(
      raffle => raffle.prize >= priceRange[0] && raffle.prize <= priceRange[1]
    );
    
    result = result.filter(
      raffle => raffle.bettingCost >= betRange[0] && raffle.bettingCost <= betRange[1]
    );
    
    result = result.filter(
      raffle => 
        raffle.winningPercentage >= winRateRange[0] && 
        raffle.winningPercentage <= winRateRange[1]
    );
    
    result = sortRaffles(result, sortOption);
    
    setFilteredRaffles(result);
  }, [searchQuery, sortOption, selectedCategories, priceRange, betRange, winRateRange]);

  return {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    betRange,
    setBetRange,
    winRateRange,
    setWinRateRange,
    filteredRaffles,
    maxPrize,
    maxBet,
  };
};
