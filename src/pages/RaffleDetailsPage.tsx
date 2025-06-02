
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { raffles } from '@/data/raffles';
import Header from '@/components/Header';
import HeroSection from '@/components/raffle-details/HeroSection';
import StatsBar from '@/components/raffle-details/StatsBar';
import DetailsSection from '@/components/raffle-details/DetailsSection';
import WhatYouWinSection from '@/components/raffle-details/WhatYouWinSection';
import TrustVerificationSection from '@/components/raffle-details/TrustVerificationSection';
import FAQSection from '@/components/raffle-details/FAQSection';

const RaffleDetailsPage = () => {
  const { raffleId } = useParams<{ raffleId: string }>();
  
  const raffle = raffles.find(r => r.id === raffleId);
  
  if (!raffle) {
    return <Navigate to="/404" replace />;
  }

  // Empty search handler since we don't need search on detail pages
  const handleSearchChange = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={handleSearchChange} />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection raffle={raffle} />
        <StatsBar raffle={raffle} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <DetailsSection raffle={raffle} />
          </div>
          <div>
            <WhatYouWinSection raffle={raffle} />
          </div>
        </div>
        <TrustVerificationSection />
        <FAQSection />
      </main>
    </div>
  );
};

export default RaffleDetailsPage;
