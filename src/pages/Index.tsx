import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions, { SortOption } from '@/components/SortOptions';
import RaffleCard from '@/components/RaffleCard';
import { raffles, Raffle, RaffleCategory } from '@/data/raffles';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [filteredRaffles, setFilteredRaffles] = useState<Raffle[]>(raffles);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('prize-high-to-low');
  const [selectedCategories, setSelectedCategories] = useState<RaffleCategory[]>([]);
  
  // Calculate max values for sliders
  const maxPrize = Math.max(...raffles.map(raffle => raffle.prize));
  const maxBet = Math.max(...raffles.map(raffle => raffle.bettingCost));
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrize]);
  const [betRange, setBetRange] = useState<[number, number]>([0, maxBet]);
  const [winRateRange, setWinRateRange] = useState<[number, number]>([0, 0.02]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...raffles];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        raffle => 
          raffle.title.toLowerCase().includes(query) || 
          raffle.description.toLowerCase().includes(query) ||
          raffle.organization.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(raffle => 
        selectedCategories.includes(raffle.category)
      );
    }
    
    // Filter by price range
    result = result.filter(
      raffle => raffle.prize >= priceRange[0] && raffle.prize <= priceRange[1]
    );
    
    // Filter by bet range
    result = result.filter(
      raffle => raffle.bettingCost >= betRange[0] && raffle.bettingCost <= betRange[1]
    );
    
    // Filter by win rate range
    result = result.filter(
      raffle => 
        raffle.winningPercentage >= winRateRange[0] && 
        raffle.winningPercentage <= winRateRange[1]
    );
    
    // Apply sorting
    result = sortRaffles(result, sortOption);
    
    setFilteredRaffles(result);
  }, [searchQuery, sortOption, selectedCategories, priceRange, betRange, winRateRange]);

  // Function to handle sorting
  const sortRaffles = (raffles: Raffle[], option: SortOption): Raffle[] => {
    const sortedRaffles = [...raffles];
    
    switch (option) {
      case 'prize-high-to-low':
        return sortedRaffles.sort((a, b) => b.prize - a.prize);
      case 'prize-low-to-high':
        return sortedRaffles.sort((a, b) => a.prize - b.prize);
      case 'win-high-to-low':
        return sortedRaffles.sort((a, b) => b.winningPercentage - a.winningPercentage);
      case 'win-low-to-high':
        return sortedRaffles.sort((a, b) => a.winningPercentage - b.winningPercentage);
      case 'bet-high-to-low':
        return sortedRaffles.sort((a, b) => b.bettingCost - a.bettingCost);
      case 'bet-low-to-high':
        return sortedRaffles.sort((a, b) => a.bettingCost - b.bettingCost);
      case 'end-date-asc':
        return sortedRaffles.sort((a, b) => 
          new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        );
      case 'end-date-desc':
        return sortedRaffles.sort((a, b) => 
          new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );
      default:
        return sortedRaffles;
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    toast({
      title: "Sort Applied",
      description: `Sorting raffles by ${option.replace(/-/g, ' ')}`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={setSearchQuery} />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
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
            <div className="sticky top-0 bg-gray-50 z-10 py-3 mb-6">
              <SortOptions sortOption={sortOption} onSortChange={handleSortChange} />
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-500 font-medium">
                Showing <span className="font-bold text-gray-800">{filteredRaffles.length}</span> results
              </p>
            </div>
            
            {filteredRaffles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No raffles found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search query to find more raffles.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-ph-red">Raffle</span>
                <span className="text-white">PH</span>
                <span className="text-ph-yellow">.</span>
              </h2>
              <p className="text-gray-300 mb-6">
                The ultimate directory of online raffles in the Philippines.
                Find the best chances to win amazing prizes!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Featured Raffles</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact</h3>
              <p className="text-gray-300">
                Email: info@rafflesPH.com<br />
                Phone: +63 (2) 8888-1234<br />
                Manila, Philippines
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 RafflePH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
