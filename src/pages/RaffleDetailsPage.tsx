import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RaffleHeader from '@/components/raffle-details/RaffleHeader';
import StatsBar from '@/components/raffle-details/StatsBar';
import DetailsSection from '@/components/raffle-details/DetailsSection';
import WhatYouWinSection from '@/components/raffle-details/WhatYouWinSection';
import TrustVerificationSection from '@/components/raffle-details/TrustVerificationSection';
import FAQSection from '@/components/raffle-details/FAQSection';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Raffle, RaffleCategory } from '@/hooks/useRaffleData';
import Layout from '@/components/Layout';

interface ApprovedRaffle {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  prize: number;
  betting_cost: number;
  winning_percentage: number;
  end_date: string;
  organization: string;
  location: string;
  external_join_url: string;
  organizer_facebook_url: string;
  entries_left: number | null;
  convertible_to_cash: boolean;
  featured: boolean;
  created_at: string;
}

const RaffleDetailsPage: React.FC = () => {
  const { raffleId } = useParams<{ raffleId: string }>();
  const [raffle, setRaffle] = useState<ApprovedRaffle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const fetchRaffle = async () => {
      if (!raffleId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('approved_raffles')
          .select('*')
          .eq('id', raffleId)
          .maybeSingle();

        if (error || !data) {
          console.error('Error fetching raffle:', error);
          setNotFound(true);
        } else {
          setRaffle(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffle();
  }, [raffleId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading raffle details...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !raffle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg text-red-600">
              {error || 'Raffle not found'}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Convert the approved raffle data to match the expected Raffle interface
  const raffleData: Raffle = {
    id: raffle.id,
    title: raffle.title,
    description: raffle.description,
    imageUrl: raffle.image_url,
    category: raffle.category as RaffleCategory,
    prize: raffle.prize,
    bettingCost: raffle.betting_cost,
    winningPercentage: raffle.winning_percentage,
    endDate: raffle.end_date,
    organization: raffle.organization,
    location: raffle.location,
    externalJoinUrl: raffle.external_join_url,
    organizerFacebookUrl: raffle.organizer_facebook_url,
    entriesLeft: raffle.entries_left,
    convertibleToCash: raffle.convertible_to_cash,
    featured: raffle.featured
  };

  // Empty search handler since we don't need search on detail pages
  const handleSearchChange = () => {};

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
          <RaffleHeader raffle={raffleData} />
          
          {/* Stats Bar */}
          <StatsBar raffle={raffleData} />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <DetailsSection raffle={raffleData} />
            </div>
            <div>
              <WhatYouWinSection raffle={raffleData} />
            </div>
          </div>
          
          {/* Trust and FAQ Sections */}
          <TrustVerificationSection />
          <FAQSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
};

export default RaffleDetailsPage;
