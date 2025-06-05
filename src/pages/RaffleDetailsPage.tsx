
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { raffles } from '@/data/raffles';
import Header from '@/components/Header';
import SimpleFooter from '@/components/SimpleFooter';
import RaffleHeader from '@/components/raffle-details/RaffleHeader';
import StatsBar from '@/components/raffle-details/StatsBar';
import DetailsSection from '@/components/raffle-details/DetailsSection';
import WhatYouWinSection from '@/components/raffle-details/WhatYouWinSection';
import TrustVerificationSection from '@/components/raffle-details/TrustVerificationSection';
import FAQSection from '@/components/raffle-details/FAQSection';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-ph-blue transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <span>/</span>
          <span className="text-gray-400">Raffles</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{raffle.title}</span>
        </nav>

        {/* Return to Raffle Lists Button */}
        <div className="mb-8">
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-50 border-2 border-ph-blue text-ph-blue hover:text-ph-blue font-semibold transition-all duration-300 hover:shadow-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Raffle Lists
            </Button>
          </Link>
        </div>

        {/* Raffle Header */}
        <RaffleHeader raffle={raffle} />
        
        {/* Stats Bar */}
        <StatsBar raffle={raffle} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <DetailsSection raffle={raffle} />
          </div>
          <div>
            <WhatYouWinSection raffle={raffle} />
          </div>
        </div>
        
        {/* Trust and FAQ Sections */}
        <TrustVerificationSection />
        <FAQSection />
      </main>
      
      {/* Footer */}
      <SimpleFooter />
    </div>
  );
};

export default RaffleDetailsPage;
