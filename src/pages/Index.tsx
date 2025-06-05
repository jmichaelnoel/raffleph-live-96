
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CenteredHeroSection from '@/components/CenteredHeroSection';
import SimpleFooter from '@/components/SimpleFooter';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import MobileFilterButton from '@/components/MobileFilterButton';
import EnhancedSearch from '@/components/EnhancedSearch';
import VirtualRaffleGrid from '@/components/VirtualRaffleGrid';
import RaffleRecommendations from '@/components/RaffleRecommendations';
import SEOHead from '@/components/SEOHead';
import PerformanceAnalytics from '@/components/PerformanceAnalytics';
import { useToast } from '@/hooks/use-toast';
import { useRaffleData } from '@/hooks/useRaffleData';
import { SortOption } from '@/utils/raffleUtils';
import { trackEvent } from '@/components/PerformanceAnalytics';

const Index = () => {
  const { toast } = useToast();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
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
    maxBet
  } = useRaffleData();
  
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    trackEvent('Sort', 'Change', option);
    toast({
      title: "Sort Applied",
      description: `Sorting raffles by ${option.replace(/-/g, ' ')}`,
      duration: 2000
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      trackEvent('Search', 'Query', query, filteredRaffles.length);
    }
  };
  
  const hasActiveFilters = () => {
    return priceRange[0] > 0 || priceRange[1] < maxPrize || betRange[0] > 0 || betRange[1] < maxBet || winRateRange[0] > 0 || winRateRange[1] < 0.02;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead />
      <PerformanceAnalytics 
        config={{
          enableWebVitals: true,
          enableUserBehavior: true
        }}
      />
      
      <Navbar />
      <CenteredHeroSection />
      
      <main className="container mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="lg:w-1/4 hidden lg:block">
            {/* Enhanced Search Bar */}
            <div className="sticky top-4 mb-6 z-20">
              <EnhancedSearch
                raffles={filteredRaffles}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>
            
            {/* Filter Sidebar */}
            <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
              <FilterSidebar 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
                maxPrize={maxPrize} 
                selectedCategories={selectedCategories} 
                setSelectedCategories={setSelectedCategories} 
                betRange={betRange} 
                setBetRange={setBetRange} 
                maxBet={maxBet} 
                winRateRange={winRateRange} 
                setWinRateRange={setWinRateRange}
              />
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="sticky top-0 bg-gray-50 z-10 py-2 lg:py-3 mb-4 lg:mb-6">
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                {/* Sort Options */}
                <div className="w-full">
                  <SortOptions sortOption={sortOption} onSortChange={handleSortChange} />
                </div>
              </div>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-500 font-medium text-sm lg:text-base">
                Showing <span className="font-bold text-gray-800">{filteredRaffles.length}</span> results 
                {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
              </p>
            </div>
            
            {/* Enhanced Raffle Grid with Virtual Scrolling */}
            <div className="mb-12">
              <VirtualRaffleGrid 
                raffles={filteredRaffles} 
                isLoading={isLoading}
                containerHeight={800}
              />
            </div>

            {/* Recommendations Section */}
            <RaffleRecommendations 
              raffles={filteredRaffles}
              className="mt-12"
            />
          </div>
        </div>
      </main>

      {/* Mobile Filter Components */}
      <MobileFilterButton onClick={() => setIsMobileFilterOpen(true)} selectedCategories={selectedCategories} hasActiveFilters={hasActiveFilters()} />

      <MobileFilterDrawer 
        isOpen={isMobileFilterOpen} 
        onClose={() => setIsMobileFilterOpen(false)} 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
        maxPrize={maxPrize} 
        selectedCategories={selectedCategories} 
        setSelectedCategories={setSelectedCategories} 
        betRange={betRange} 
        setBetRange={setBetRange} 
        maxBet={maxBet} 
        winRateRange={winRateRange} 
        setWinRateRange={setWinRateRange} 
      />
      
      <SimpleFooter />
    </div>
  );
};

export default Index;
