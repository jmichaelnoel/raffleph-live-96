
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import RaffleCard from '@/components/RaffleCard';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import MobileFilterButton from '@/components/MobileFilterButton';
import { useToast } from '@/hooks/use-toast';
import { useRaffleData } from '@/hooks/useRaffleData';
import { SortOption } from '@/utils/raffleUtils';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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
    toast({
      title: "Sort Applied",
      description: `Sorting raffles by ${option.replace(/-/g, ' ')}`,
      duration: 2000
    });
  };

  const handleBrowseRaffles = () => {
    const rafflesSection = document.getElementById('raffles-section');
    if (rafflesSection) {
      rafflesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasActiveFilters = () => {
    return priceRange[0] > 0 || priceRange[1] < maxPrize || betRange[0] > 0 || betRange[1] < maxBet || winRateRange[0] > 0 || winRateRange[1] < 0.02;
  };

  // Handle navigation from other pages with scroll intent
  useEffect(() => {
    if (location.state?.scrollToRaffles) {
      setTimeout(() => {
        const rafflesSection = document.getElementById('raffles-section');
        if (rafflesSection) {
          rafflesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSection onBrowseRaffles={handleBrowseRaffles} />
      
      {/* Main Content */}
      <main id="raffles-section" className="container mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar with Search */}
          <aside className="lg:w-1/4 hidden lg:block">
            <SearchSection 
              searchTerm={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <div className="sticky top-28 h-[calc(100vh-10rem)] overflow-y-auto">
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
              <SortOptions sortOption={sortOption} onSortChange={handleSortChange} />
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-500 font-medium text-sm lg:text-base">
                Showing <span className="font-bold text-gray-800">{filteredRaffles.length}</span> results 
                {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
              </p>
            </div>
            
            {filteredRaffles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
                {filteredRaffles.map((raffle, index) => (
                  <div key={raffle.id} className={`animate-slide-up ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}>
                    <RaffleCard raffle={raffle} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 lg:py-16 bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-lg">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">No raffles found</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  Try adjusting your filters or search query to find more raffles.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Components */}
      <MobileFilterButton 
        onClick={() => setIsMobileFilterOpen(true)} 
        selectedCategories={selectedCategories} 
        hasActiveFilters={hasActiveFilters()} 
      />

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
      
      <Footer />
    </div>
  );
};

export default Index;
