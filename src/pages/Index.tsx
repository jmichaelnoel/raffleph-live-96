
import React, { useState } from 'react';
import { useRaffleData } from '@/hooks/useRaffleData';
import RaffleCard from '@/components/RaffleCard';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import MobileFilterButton from '@/components/MobileFilterButton';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';

const Index: React.FC = () => {
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
    isLoading,
  } = useRaffleData();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterDrawerOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterDrawerOpen(false);
  };

  const activeFiltersCount = selectedCategories.length + 
    (priceRange[0] > 0 || priceRange[1] < maxPrize ? 1 : 0) +
    (betRange[0] > 0 || betRange[1] < maxBet ? 1 : 0) +
    (winRateRange[0] > 0 || winRateRange[1] < 0.02 ? 1 : 0);

  const getSortLabel = () => {
    switch (sortOption) {
      case 'prize-high-to-low':
        return 'Price: High to Low';
      case 'prize-low-to-high':
        return 'Price: Low to High';
      case 'ticket-low-to-high':
        return 'Ticket: Low to High';
      case 'ticket-high-to-low':
        return 'Ticket: High to Low';
      case 'win-rate-high-to-low':
        return 'Win Rate: High to Low';
      case 'win-rate-low-to-high':
        return 'Win Rate: Low to High';
      default:
        return 'Featured';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search raffles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-80 sticky top-4 h-fit">
              <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrize={maxPrize}
                betRange={betRange}
                setBetRange={setBetRange}
                maxBet={maxBet}
                winRateRange={winRateRange}
                setWinRateRange={setWinRateRange}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Mobile Filter Button and Sort Options */}
              <div className="flex justify-between items-center mb-6">
                <div className="lg:hidden">
                  <MobileFilterButton
                    onClick={handleOpenFilter}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">Sort by:</span>
                  <SortOptions
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {isLoading ? 'Loading...' : `${filteredRaffles.length} raffle${filteredRaffles.length !== 1 ? 's' : ''} found`}
                </p>
              </div>

              {/* Raffle Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredRaffles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No raffles found matching your criteria.</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRaffles.map((raffle) => (
                    <RaffleCard key={raffle.id} raffle={raffle} />
                  ))}
                </div>
              )}
            </main>
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={handleCloseFilter}
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
      </div>
    </Layout>
  );
};

export default Index;
