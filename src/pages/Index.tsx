
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
import { Sparkles, Trophy, Target, Zap, Coins } from 'lucide-react';

const Index = () => {
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
      
      <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-16 mt-20 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 animate-bounce delay-1000">
            <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-16 right-12 animate-pulse delay-500">
            <Sparkles className="h-5 w-5 text-pink-400 opacity-70" />
          </div>
          <div className="absolute bottom-12 left-16 animate-bounce delay-700">
            <Trophy className="h-6 w-6 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute bottom-8 right-8 animate-pulse delay-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
          </div>
          <div className="absolute top-1/2 left-1/4 animate-float-gently delay-200">
            <Target className="h-4 w-4 text-blue-300 opacity-40" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-gently delay-800">
            <Zap className="h-5 w-5 text-orange-300 opacity-50" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">Raffle</span>
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">PH</span>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent text-5xl">.</span>
              <div className="animate-spin">
                <Sparkles className="h-7 w-7 text-pink-400" />
              </div>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              🎉 The ultimate directory of online raffles in the Philippines. 
              Find the best chances to win amazing prizes! 🏆✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">🏆 Premium Raffles</h3>
              <p className="text-gray-300">Discover high-value prizes and exclusive opportunities</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">🎯 Smart Filtering</h3>
              <p className="text-gray-300">Find raffles that match your budget and preferences</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-600 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">⚡ Live Updates</h3>
              <p className="text-gray-300">Real-time raffle information and winning statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-pink-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2">
                <span className="text-2xl">🏠</span>
                Home
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-yellow-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2">
                <span className="text-2xl">⭐</span>
                Featured
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2">
                <span className="text-2xl">❓</span>
                How It Works
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-lg hover:underline decoration-green-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2">
                <span className="text-2xl">💬</span>
                FAQ
              </a>
            </div>
          </div>
          
          <div className="border-t border-purple-700/30 pt-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-300">
              <span>&copy; 2025 RafflePH. All rights reserved.</span>
              <div className="flex items-center gap-2">
                <div className="animate-pulse">
                  <Sparkles className="h-4 w-4 text-pink-400" />
                </div>
                <span className="text-pink-400 font-medium">Made with ❤️ in the Philippines</span>
                <div className="animate-bounce">
                  <Coins className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
