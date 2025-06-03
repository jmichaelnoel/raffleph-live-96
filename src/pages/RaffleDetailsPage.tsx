
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
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Raffle } from '@/types/raffle';

interface ApprovedRaffle {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  prize: number;
  betting_cost: number;
  winning_percentage: number;
  draw_date: string | null;
  organization: string;
  location: string;
  external_join_url: string;
  organizer_facebook_url: string;
  entries_left: number | null;
  convertible_to_cash: boolean;
  featured: boolean;
  created_at: string;
}

const RaffleDetailsPage = () => {
  const { raffleId } = useParams<{ raffleId: string }>();
  const [raffle, setRaffle] = useState<ApprovedRaffle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const fetchRaffle = async () => {
      if (!raffleId) {
        setNotFound(true);
        setIsLoading(false);
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
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaffle();
  }, [raffleId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading raffle details...</p>
        </div>
      </div>
    );
  }

  if (notFound || !raffle) {
    return <Navigate to="/404" replace />;
  }

  // Convert the approved raffle data to match the expected Raffle interface
  const raffleData: Raffle = {
    id: raffle.id,
    title: raffle.title,
    description: raffle.description,
    imageUrl: raffle.image_url,
    category: raffle.category,
    prize: raffle.prize,
    bettingCost: raffle.betting_cost,
    winningPercentage: raffle.winning_percentage,
    drawDate: raffle.draw_date,
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
    <div className="min-h-screen bg-gray-50">
      <Header onSearchChange={handleSearchChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center hover:text-ph-blue transition-colors">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-ph-blue transition-colors">
                  Raffles
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-800 font-medium line-clamp-1">
                {raffle.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Return to Raffle Lists Button */}
        <div className="mb-8">
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-50 border-2 border-ph-blue text-ph-blue hover:text-ph-blue font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Raffles
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
  );
};

export default RaffleDetailsPage;
