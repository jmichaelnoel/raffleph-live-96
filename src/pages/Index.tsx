import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RaffleCard from '@/components/RaffleCard';
import FilterSidebar from '@/components/FilterSidebar';
import SortOptions from '@/components/SortOptions';
import MobileFilterButton from '@/components/MobileFilterButton';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';
import MobileNavigation from '@/components/MobileNavigation';
import AnimatedCategoryText from '@/components/AnimatedCategoryText';
import { useRaffleData } from '@/hooks/useRaffleData';
import { applyFilters, applySorting } from '@/utils/raffleUtils';

const Index = () => {
  const [featuredRaffles, setFeaturedRaffles] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { raffles, isLoading: rafflesLoading, error } = useRaffleData();
  
  const [filters, setFilters] = useState({
    category: 'all',
    prizeRange: [0, 100000],
    organization: 'all'
  });
  
  const [sortBy, setSortBy] = useState('newest');

  // Fetch featured raffles from database
  useEffect(() => {
    const fetchFeaturedRaffles = async () => {
      try {
        const { data, error } = await supabase
          .from('approved_raffles')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching featured raffles:', error);
          return;
        }

        // Transform the data to match the expected format
        const transformedRaffles = (data || []).map(raffle => ({
          id: raffle.id,
          title: raffle.title,
          description: raffle.description,
          prize: raffle.prize,
          category: raffle.category,
          bettingCost: raffle.betting_cost,
          winningPercentage: raffle.winning_percentage,
          endDate: raffle.end_date,
          organization: raffle.organization,
          location: raffle.location,
          image: raffle.image_url,
          externalJoinUrl: raffle.external_join_url,
          organizerFacebookUrl: raffle.organizer_facebook_url,
          entriesLeft: raffle.entries_left,
          convertibleToCash: raffle.convertible_to_cash,
          featured: raffle.featured
        }));

        setFeaturedRaffles(transformedRaffles);
      } catch (error) {
        console.error('Error fetching featured raffles:', error);
      }
    };

    fetchFeaturedRaffles();
  }, []);

  const filteredRaffles = applyFilters(raffles, filters);
  const sortedRaffles = applySorting(filteredRaffles, sortBy);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load raffles</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Win Amazing Prizes with <AnimatedCategoryText />
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join exciting raffles and win incredible prizes from trusted organizations
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
            Browse Raffles
          </button>
        </div>
      </section>

      {/* Featured Raffles Section */}
      {featuredRaffles.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Raffles ⭐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRaffles.map((raffle) => (
                <RaffleCard
                  key={raffle.id}
                  raffle={raffle}
                  isFeatured={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Raffles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">All Raffles</h2>
            <div className="flex items-center gap-4">
              <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
              <MobileFilterButton onClick={() => setIsMobileFilterOpen(true)} />
            </div>
          </div>
          
          <div className="flex gap-8">
            <FilterSidebar 
              filters={filters} 
              onFiltersChange={setFilters}
              raffles={raffles}
            />
            
            <div className="flex-1">
              {rafflesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
                  ))}
                </div>
              ) : sortedRaffles.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No raffles found</h3>
                  <p className="text-gray-500">Try adjusting your filters or check back later for new raffles.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedRaffles.map((raffle) => (
                    <RaffleCard key={raffle.id} raffle={raffle} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavigation />
      
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        raffles={raffles}
      />
    </div>
  );
};

export default Index;
