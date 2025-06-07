
import { useState, useEffect } from 'react';
import { Raffle, RaffleCategory } from '@/data/raffles';
import { SortOption, sortRaffles } from '@/utils/raffleUtils';
import { useSupabaseRaffles } from './useSupabaseRaffles';
import { convertSupabaseRaffleToRaffle } from '@/utils/raffleConverter';

export const useSupabaseRaffleData = () => {
  const { raffles: supabaseRaffles, loading, error, refetch } = useSupabaseRaffles();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('prize-high-to-low');
  const [selectedCategories, setSelectedCategories] = useState<RaffleCategory[]>([]);
  
  // Convert Supabase raffles to the existing format
  const allRaffles: Raffle[] = supabaseRaffles.map(convertSupabaseRaffleToRaffle);
  
  const maxPrize = allRaffles.length > 0 ? Math.max(...allRaffles.map(raffle => raffle.prize), 0) : 1000000;
  const maxBet = allRaffles.length > 0 ? Math.max(...allRaffles.map(raffle => raffle.bettingCost), 0) : 1000;
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrize]);
  const [betRange, setBetRange] = useState<[number, number]>([0, maxBet]);
  const [winRateRange, setWinRateRange] = useState<[number, number]>([0, 0.02]);
  
  const [filteredRaffles, setFilteredRaffles] = useState<Raffle[]>([]);

  // Update ranges when raffles data changes
  useEffect(() => {
    if (allRaffles.length > 0) {
      const newMaxPrize = Math.max(...allRaffles.map(raffle => raffle.prize), 0);
      const newMaxBet = Math.max(...allRaffles.map(raffle => raffle.bettingCost), 0);
      
      setPriceRange(prev => [prev[0], Math.max(prev[1], newMaxPrize)]);
      setBetRange(prev => [prev[0], Math.max(prev[1], newMaxBet)]);
    }
  }, [supabaseRaffles]);

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
  }, [searchQuery, sortOption, selectedCategories, priceRange, betRange, winRateRange, allRaffles]);

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
    loading,
    error,
    refetch
  };
};
