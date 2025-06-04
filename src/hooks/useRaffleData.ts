
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SortOption, sortRaffles } from '@/utils/raffleUtils';

export type RaffleCategory = 'Cash' | 'Cars' | 'Motorcycle' | 'Gadgets';

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
  externalJoinUrl: string;
  organizerFacebookUrl: string;
  convertibleToCash: boolean;
}

export const useRaffleData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('prize-high-to-low');
  const [selectedCategories, setSelectedCategories] = useState<RaffleCategory[]>([]);
  const [allRaffles, setAllRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const maxPrize = Math.max(...allRaffles.map(raffle => raffle.prize), 0);
  const maxBet = Math.max(...allRaffles.map(raffle => raffle.bettingCost), 0);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [betRange, setBetRange] = useState<[number, number]>([0, 0]);
  const [winRateRange, setWinRateRange] = useState<[number, number]>([0, 0.02]);
  
  const [filteredRaffles, setFilteredRaffles] = useState<Raffle[]>([]);

  // Fetch approved raffles from Supabase
  useEffect(() => {
    const fetchRaffles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('approved_raffles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching raffles:', error);
          return;
        }

        // Transform the data to match the expected Raffle interface
        const transformedRaffles: Raffle[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.image_url,
          category: item.category as RaffleCategory,
          prize: Number(item.prize),
          bettingCost: Number(item.betting_cost),
          winningPercentage: Number(item.winning_percentage),
          endDate: item.draw_date, // Use draw_date from the database
          organization: item.organization,
          location: item.location,
          featured: item.featured,
          entriesLeft: item.entries_left,
          externalJoinUrl: item.external_join_url,
          organizerFacebookUrl: item.organizer_facebook_url,
          convertibleToCash: item.convertible_to_cash
        }));

        setAllRaffles(transformedRaffles);
        
        // Update ranges based on fetched data
        const newMaxPrize = Math.max(...transformedRaffles.map(raffle => raffle.prize), 0);
        const newMaxBet = Math.max(...transformedRaffles.map(raffle => raffle.bettingCost), 0);
        
        setPriceRange([0, newMaxPrize]);
        setBetRange([0, newMaxBet]);
        
      } catch (error) {
        console.error('Unexpected error fetching raffles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaffles();
  }, []);

  // Filter and sort raffles
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
    isLoading,
  };
};
