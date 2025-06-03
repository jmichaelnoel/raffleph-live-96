
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import RaffleCard from '@/components/RaffleCard';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import MobileFilterButton from '@/components/MobileFilterButton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useRaffleData } from '@/hooks/useRaffleData';
import { SortOption } from '@/utils/raffleUtils';

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const { toast } = useToast();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
    isLoading
  } = useRaffleData();
  
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sorting changes
    toast({
      title: "Sort Applied",
      description: `Sorting raffles by ${option.replace(/-/g, ' ')}`,
      duration: 2000
    });
  };
  
  const hasActiveFilters = () => {
    return priceRange[0] > 0 || priceRange[1] < maxPrize || betRange[0] > 0 || betRange[1] < maxBet || winRateRange[0] > 0 || winRateRange[1] < 0.02;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRaffles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRaffles = filteredRaffles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
  
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
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
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
                {isLoading ? (
                  "Loading raffles..."
                ) : (
                  <>
                    Showing <span className="font-bold text-gray-800">{currentRaffles.length}</span> of{' '}
                    <span className="font-bold text-gray-800">{filteredRaffles.length}</span> results 
                    {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
                    {totalPages > 1 && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Page {currentPage} of {totalPages})
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
            
            {isLoading ? (
              <LoadingSkeleton />
            ) : currentRaffles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
                  {currentRaffles.map((raffle, index) => (
                    <div key={raffle.id} className={`animate-slide-up ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}>
                      <RaffleCard raffle={raffle} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {renderPaginationItems()}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
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
      
      <Footer />
    </div>
  );
};

export default Index;
