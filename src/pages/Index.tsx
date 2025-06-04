import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import RaffleCard from '@/components/RaffleCard';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import MobileFilterButton from '@/components/MobileFilterButton';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import AnimatedCategoryText from '@/components/AnimatedCategoryText';
import { useRaffleData } from '@/hooks/useRaffleData';
import { RaffleCategory } from '@/data/raffles';
import { SortOption } from '@/utils/raffleUtils';

const Index: React.FC = () => {
  const { raffles, loading, error } = useRaffleData();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedCategories, setSelectedCategories] = useState<RaffleCategory[]>([]);
  const [betRange, setBetRange] = useState<[number, number]>([0, 1000]);
  const [winRateRange, setWinRateRange] = useState<[number, number]>([0, 0.02]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const maxPrize = useMemo(() => {
    if (!raffles || raffles.length === 0) return 2000000;
    return Math.max(...raffles.map(r => r.prizeValue));
  }, [raffles]);

  const maxBet = useMemo(() => {
    if (!raffles || raffles.length === 0) return 1000;
    return Math.max(...raffles.map(r => r.ticketPrice));
  }, [raffles]);

  const filteredRaffles = useMemo(() => {
    if (!raffles) return [];

    return raffles.filter(raffle => {
      const priceCheck = raffle.prizeValue >= priceRange[0] && raffle.prizeValue <= priceRange[1];
      const categoryCheck = selectedCategories.length === 0 || selectedCategories.includes(raffle.category);
      const betCheck = raffle.ticketPrice >= betRange[0] && raffle.ticketPrice <= betRange[1];
      const winRateCheck = raffle.winRate >= winRateRange[0] && raffle.winRate <= winRateRange[1];
      const searchCheck = raffle.title.toLowerCase().includes(searchQuery.toLowerCase());

      return priceCheck && categoryCheck && betCheck && winRateCheck && searchCheck;
    });
  }, [raffles, priceRange, selectedCategories, betRange, winRateRange, searchQuery]);

  const sortedRaffles = useMemo(() => {
    if (!filteredRaffles) return [];

    switch (sortOption) {
      case 'priceAsc':
        return [...filteredRaffles].sort((a, b) => a.prizeValue - b.prizeValue);
      case 'priceDesc':
        return [...filteredRaffles].sort((a, b) => b.prizeValue - a.prizeValue);
      case 'ticketAsc':
        return [...filteredRaffles].sort((a, b) => a.ticketPrice - b.ticketPrice);
      case 'ticketDesc':
        return [...filteredRaffles].sort((a, b) => b.ticketPrice - a.ticketPrice);
      case 'winRateAsc':
        return [...filteredRaffles].sort((a, b) => a.winRate - b.winRate);
      case 'winRateDesc':
        return [...filteredRaffles].sort((a, b) => b.winRate - a.winRate);
      default:
        return filteredRaffles;
    }
  }, [filteredRaffles, sortOption]);

  const filteredAndSortedRaffles = sortedRaffles;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading raffles...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg text-red-600">Error loading raffles: {error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to RafflePH
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover exciting raffles and win amazing prizes!
          </p>
          <AnimatedCategoryText />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-80">
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
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">
                  Available Raffles ({filteredAndSortedRaffles.length})
                </h2>
                <div className="lg:hidden">
                  <MobileFilterButton 
                    onOpenFilter={() => setMobileFilterOpen(true)}
                    activeFiltersCount={selectedCategories.length}
                  />
                </div>
              </div>
              
              <SortOptions 
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedRaffles.map((raffle) => (
                <RaffleCard key={raffle.id} raffle={raffle} />
              ))}
            </div>

            {filteredAndSortedRaffles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No raffles match your current filters.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </main>
        </div>

        <MobileFilterDrawer
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
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
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </Layout>
  );
};

export default Index;
