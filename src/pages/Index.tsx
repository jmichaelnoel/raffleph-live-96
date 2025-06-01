import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import RaffleCard from '@/components/RaffleCard';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import MobileFilterButton from '@/components/MobileFilterButton';
import { useToast } from '@/hooks/use-toast';
import { useRaffleData } from '@/hooks/useRaffleData';
import { SortOption } from '@/utils/raffleUtils';
import Sparkles from '@/components/Sparkles';
import Trophy from '@/components/Trophy';
import Target from '@/components/Target';
import Zap from '@/components/Zap';
import Coins from '@/components/Coins';

const Index = () => {
  const { toast } = useToast();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const {
    searchQuery, // Kept for clarity, though setSearchQuery is used by Header
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
  } = useRaffleData();
  
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    toast({
      title: "Sort Applied",
      description: `Sorting raffles by ${option.replace(/-/g, ' ')}`,
      duration: 2000,
    });
  };

  const hasActiveFilters = () => {
    return priceRange[0] > 0 || priceRange[1] < maxPrize ||
           betRange[0] > 0 || betRange[1] < maxBet ||
           winRateRange[0] > 0 || winRateRange[1] < 0.02;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} />
      
      <main className="container mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="lg:w-1/4 hidden lg:block lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
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
          </aside>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="sticky top-0 bg-gray-50 z-10 py-2 lg:py-3 mb-4 lg:mb-6">
              <SortOptions sortOption={sortOption} onSortChange={handleSortChange} />
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-500 font-medium text-sm lg:text-base">
                Showing <span className="font-bold text-gray-800">{filteredRaffles.length}</span> results 
                {searchQuery && (
                  <span> for "<span className="italic">{searchQuery}</span>"</span>
                )}
              </p>
            </div>
            
            {filteredRaffles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
                {filteredRaffles.map((raffle, index) => (
                  <div 
                    key={raffle.id} 
                    className={`animate-slide-up ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}
                  >
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
      
      <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white py-20 mt-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 animate-float-gently">
            <Sparkles className="h-6 w-6 text-pink-300 opacity-70" />
          </div>
          <div className="absolute top-20 right-20 animate-float-gently delay-1000">
            <Trophy className="h-8 w-8 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-float-gently delay-500">
            <Target className="h-5 w-5 text-blue-300 opacity-80" />
          </div>
          <div className="absolute bottom-10 right-1/3 animate-float-gently delay-1500">
            <Zap className="h-7 w-7 text-orange-300 opacity-50" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float-gently delay-700">
            <Coins className="h-4 w-4 text-green-300 opacity-60" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center md:justify-start">
                <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Raffle</span>
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">PH</span>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent text-4xl">.</span>
                <div className="ml-2 animate-bounce">
                  <Sparkles className="h-6 w-6 text-pink-400" />
                </div>
              </h2>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                🎉 The ultimate directory of online raffles in the Philippines.
                Find the best chances to win amazing prizes! 🏆
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                <span className="text-2xl">🚀</span>
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-pink-400 decoration-2 underline-offset-4">
                    🏠 Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-yellow-400 decoration-2 underline-offset-4">
                    ⭐ Featured Raffles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-blue-400 decoration-2 underline-offset-4">
                    ❓ How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-green-400 decoration-2 underline-offset-4">
                    💬 FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                <span className="text-2xl">📞</span>
                Contact
              </h3>
              <div className="space-y-3 text-gray-200">
                <p className="flex items-center justify-center gap-2 text-lg">
                  <span className="text-xl">📧</span>
                  info@rafflesPH.com
                </p>
                <p className="flex items-center justify-center gap-2 text-lg">
                  <span className="text-xl">📱</span>
                  +63 (2) 8888-1234
                </p>
                <p className="flex items-center justify-center gap-2 text-lg">
                  <span className="text-xl">📍</span>
                  Manila, Philippines
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-700/50 mt-16 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-300 text-lg">
              <span>&copy; 2025 RafflePH. All rights reserved.</span>
              <div className="animate-pulse">
                <Sparkles className="h-4 w-4 text-pink-400" />
              </div>
              <span className="text-pink-400">Made with ❤️ in the Philippines</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
