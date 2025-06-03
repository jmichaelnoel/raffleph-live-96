
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sortRaffles, SortOption } from '@/utils/raffleUtils';
import { Raffle, RaffleCategory } from '@/types/raffle';

export const useRaffleData = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedCategories, setSelectedCategories] = useState<RaffleCategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [betRange, setBetRange] = useState<[number, number]>([0, 0]);
  const [winRateRange, setWinRateRange] = useState<[number, number]>([0, 0.02]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const { data, error } = await supabase
          .from('approved_raffles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching raffles:', error);
          toast({
            title: "Error",
            description: "Failed to fetch raffles",
            variant: "destructive",
          });
          return;
        }

        const formattedRaffles: Raffle[] = (data || []).map(raffle => ({
          id: raffle.id,
          title: raffle.title,
          description: raffle.description,
          imageUrl: raffle.image_url || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
          category: raffle.category as RaffleCategory,
          prize: raffle.prize,
          bettingCost: raffle.betting_cost,
          winningPercentage: raffle.winning_percentage || 0.001,
          drawDate: raffle.draw_date,
          organization: raffle.organization,
          location: raffle.location || 'Philippines',
          externalJoinUrl: raffle.external_join_url,
          organizerFacebookUrl: raffle.organizer_facebook_url,
          entriesLeft: raffle.entries_left,
          convertibleToCash: raffle.convertible_to_cash || false,
          featured: raffle.featured || false
        }));

        setRaffles(formattedRaffles);

        // Set initial range values based on actual data
        if (formattedRaffles.length > 0) {
          const maxPrize = Math.max(...formattedRaffles.map(r => r.prize));
          const maxBet = Math.max(...formattedRaffles.map(r => r.bettingCost));
          
          setPriceRange([0, maxPrize]);
          setBetRange([0, maxBet]);
        }

      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaffles();
  }, [toast]);

  const filteredRaffles = useMemo(() => {
    let filtered = raffles.filter(raffle => {
      const matchesSearch = raffle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        raffle.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        raffle.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(raffle.category);
      const matchesPrice = raffle.prize >= priceRange[0] && raffle.prize <= priceRange[1];
      const matchesBet = raffle.bettingCost >= betRange[0] && raffle.bettingCost <= betRange[1];
      const matchesWinRate = raffle.winningPercentage >= winRateRange[0] && raffle.winningPercentage <= winRateRange[1];

      return matchesSearch && matchesCategories && matchesPrice && matchesBet && matchesWinRate;
    });

    return sortRaffles(filtered, sortOption);
  }, [raffles, searchQuery, selectedCategories, priceRange, betRange, winRateRange, sortOption]);

  const maxPrize = useMemo(() => raffles.length > 0 ? Math.max(...raffles.map(r => r.prize)) : 1000000, [raffles]);
  const maxBet = useMemo(() => raffles.length > 0 ? Math.max(...raffles.map(r => r.bettingCost)) : 1000, [raffles]);

  return {
    raffles,
    isLoading,
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
