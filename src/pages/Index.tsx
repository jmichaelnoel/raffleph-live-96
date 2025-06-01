
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
      
      <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 mt-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 animate-float-slow">
            <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
          </div>
          <div className="absolute top-20 right-16 animate-bounce-slow delay-500">
            <Sparkles className="h-6 w-6 text-pink-400 opacity-80" />
          </div>
          <div className="absolute bottom-16 left-20 animate-float-gentle delay-700">
            <Trophy className="h-7 w-7 text-yellow-300 opacity-70" />
          </div>
          <div className="absolute bottom-10 right-10 animate-pulse delay-300">
            <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-1/2 left-1/3 animate-float-gentle delay-200">
            <Target className="h-5 w-5 text-blue-300 opacity-50" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float-slow delay-800">
            <Zap className="h-6 w-6 text-orange-300 opacity-60" />
          </div>
          <div className="absolute top-3/4 left-1/2 animate-bounce-slow delay-1000">
            <Coins className="h-5 w-5 text-green-400 opacity-50" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 flex items-center justify-center gap-4">
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent">Raffle</span>
              <span className="bg-gradient-to-r from-white via-blue-100 to-gray-200 bg-clip-text text-transparent">PH</span>
              <div className="animate-spin-slow">
                <Sparkles className="h-8 w-8 text-pink-400" />
              </div>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              🎊 The ultimate destination for online raffles in the Philippines! 
              <br />
              <span className="text-yellow-300 font-semibold">Find incredible prizes and win big!</span> 🏆✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-red-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">🏆 Premium Prizes</h3>
              <p className="text-blue-200 leading-relaxed">Discover amazing rewards from trusted organizations across the Philippines</p>
            </div>
            
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">🎯 Smart Filters</h3>
              <p className="text-blue-200 leading-relaxed">Find perfect raffles with our intelligent filtering system</p>
            </div>
            
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">⚡ Live Updates</h3>
              <p className="text-blue-200 leading-relaxed">Real-time raffle updates and winning statistics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-pink-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🏠</span>
                Home
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-yellow-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⭐</span>
                Featured
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">❓</span>
                How It Works
              </a>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-green-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">💬</span>
                FAQ
              </a>
            </div>
          </div>
          
          <div className="border-t border-purple-700/40 pt-10 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-blue-200">
              <span className="text-lg">&copy; 2025 RafflePH. All rights reserved.</span>
              <div className="flex items-center gap-3">
                <div className="animate-pulse">
                  <Sparkles className="h-5 w-5 text-pink-400" />
                </div>
                <span className="text-pink-300 font-semibold text-lg">Made with ❤️ in the Philippines</span>
                <div className="animate-bounce">
                  <Coins className="h-5 w-5 text-yellow-400" />
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
