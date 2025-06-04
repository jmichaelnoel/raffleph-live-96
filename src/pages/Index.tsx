
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import RaffleCard from '@/components/RaffleCard';
import FilterSidebar from '@/components/FilterSidebar';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import MobileFilterButton from '@/components/MobileFilterButton';
import SortOptions, { SortOption } from '@/components/SortOptions';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Filters {
  categories: string[];
  prizeRange: [number, number];
  ticketPriceRange: [number, number];
  location: string;
  searchTerm: string;
}

const Index: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    prizeRange: [0, 1000000],
    ticketPriceRange: [0, 10000],
    location: '',
    searchTerm: '',
  });

  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { toast } = useToast();

  const { data: raffles, isLoading, error } = useQuery({
    queryKey: ['raffles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('approved_raffles')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
  });

  const filterRaffles = useCallback((raffleData: any[]) => {
    return raffleData.filter(raffle => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(raffle.category)) {
        return false;
      }

      // Prize range filter
      if (raffle.prize < filters.prizeRange[0] || raffle.prize > filters.prizeRange[1]) {
        return false;
      }

      // Ticket price range filter
      if (raffle.betting_cost < filters.ticketPriceRange[0] || raffle.betting_cost > filters.ticketPriceRange[1]) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm && 
          !raffle.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
          !raffle.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortRaffles = useCallback((raffleData: any[], sortOption: SortOption) => {
    const sorted = [...raffleData];
    
    switch (sortOption) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'ending-soon':
        return sorted.sort((a, b) => new Date(a.draw_date).getTime() - new Date(b.draw_date).getTime());
      case 'highest-prize':
        return sorted.sort((a, b) => b.prize - a.prize);
      case 'lowest-prize':
        return sorted.sort((a, b) => a.prize - b.prize);
      case 'highest-win-rate':
        return sorted.sort((a, b) => (b.winning_percentage || 0) - (a.winning_percentage || 0));
      case 'lowest-win-rate':
        return sorted.sort((a, b) => (a.winning_percentage || 0) - (b.winning_percentage || 0));
      case 'ticket-low-to-high':
        return sorted.sort((a, b) => a.betting_cost - b.betting_cost);
      case 'ticket-high-to-low':
        return sorted.sort((a, b) => b.betting_cost - a.betting_cost);
      case 'win-rate-high-to-low':
        return sorted.sort((a, b) => (b.winning_percentage || 0) - (a.winning_percentage || 0));
      case 'win-rate-low-to-high':
        return sorted.sort((a, b) => (a.winning_percentage || 0) - (b.winning_percentage || 0));
      default:
        return sorted;
    }
  }, []);

  const filteredAndSortedRaffles = raffles ? sortRaffles(filterRaffles(raffles), sortBy) : [];

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.categories && filters.categories.length > 0) count++;
    if (filters.location && filters.location.trim()) count++;
    if (filters.searchTerm && filters.searchTerm.trim()) count++;
    if (filters.prizeRange[0] > 0 || filters.prizeRange[1] < 1000000) count++;
    if (filters.ticketPriceRange[0] > 0 || filters.ticketPriceRange[1] < 10000) count++;
    return count;
  }, [filters]);

  // Handle error in useEffect to avoid render loop
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load raffles. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, prizeRange: range }));
  }, []);

  const handleTicketPriceRangeChange = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, ticketPriceRange: range }));
  }, []);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setFilters(prev => ({ ...prev, categories }));
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchTerm: query }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      categories: [],
      prizeRange: [0, 1000000],
      ticketPriceRange: [0, 10000],
      location: '',
      searchTerm: '',
    });
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-80 shrink-0">
              <FilterSidebar 
                priceRange={filters.prizeRange}
                setPriceRange={handlePriceRangeChange}
                maxPrize={1000000}
                selectedCategories={filters.categories as any[]}
                setSelectedCategories={handleCategoriesChange}
                betRange={filters.ticketPriceRange}
                setBetRange={handleTicketPriceRangeChange}
                maxBet={10000}
                winRateRange={[0, 0.02]}
                setWinRateRange={() => {}}
                searchQuery={filters.searchTerm}
                setSearchQuery={handleSearchChange}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Active Raffles
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {filteredAndSortedRaffles.length} raffle(s) available
                  </p>
                </div>
                
                <SortOptions 
                  sortOption={sortBy} 
                  onSortChange={setSortBy} 
                />
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-96"></div>
                    </div>
                  ))}
                </div>
              ) : filteredAndSortedRaffles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedRaffles.map((raffle) => (
                    <RaffleCard key={raffle.id} raffle={raffle} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No raffles match your current filters.</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-purple-600 hover:text-purple-700 underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Components */}
        <MobileFilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          priceRange={filters.prizeRange}
          setPriceRange={handlePriceRangeChange}
          maxPrize={1000000}
          selectedCategories={filters.categories as any[]}
          setSelectedCategories={handleCategoriesChange}
          betRange={filters.ticketPriceRange}
          setBetRange={handleTicketPriceRangeChange}
          maxBet={10000}
          winRateRange={[0, 0.02]}
          setWinRateRange={() => {}}
        />
        
        <MobileFilterButton
          onClick={() => setIsFilterDrawerOpen(true)}
          activeFiltersCount={getActiveFilterCount()}
        />
      </div>
    </Layout>
  );
};

export default Index;
