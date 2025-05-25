import React from 'react';
import { useParams } from 'react-router-dom';
import { raffles, Raffle } from '@/data/raffles'; // Using sample data for now
import Header from '@/components/Header'; // Re-using existing Header, might need a simpler one
import HeroSection from '@/components/raffle-details/HeroSection';
import DetailsSection from '@/components/raffle-details/DetailsSection';
import StatsBar from '@/components/raffle-details/StatsBar';
import WhatYouWinSection from '@/components/raffle-details/WhatYouWinSection';
import TrustVerificationSection from '@/components/raffle-details/TrustVerificationSection';
import FAQSection from '@/components/raffle-details/FAQSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Sample data - in a real app, this would be fetched based on raffleId
const sampleRaffle: Raffle = raffles.find(r => r.id === 'raffle1') || raffles[0] || {
  id: 'default-raffle',
  title: 'Default Raffle Prize',
  description: 'This is a default raffle description. Details about the prize and how to win will be shown here.',
  imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max', // Placeholder
  category: 'Gadgets',
  prize: 50000,
  bettingCost: 50,
  winningPercentage: 0.01, // 1%
  endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(), // 30 days from now
  organization: 'RafflePH Org',
  location: 'Nationwide',
  featured: true,
  entriesLeft: 1000, // Example property
};


const RaffleDetailsPage = () => {
  const { raffleId } = useParams<{ raffleId: string }>();
  const navigate = useNavigate();

  // In a real app, fetch raffle data based on raffleId
  // For now, use the first raffle from the list or a default
  const raffle = raffles.find(r => r.id === raffleId) || sampleRaffle;

  if (!raffle) {
    return (
        <div className="min-h-screen bg-gray-50">
        <Header onSearchChange={() => {}} /> {/* Dummy onSearchChange */}
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Raffle Not Found</h1>
          <p className="text-gray-600 mb-8">The raffle you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Raffles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* A simplified header might be better here, or just a back button */}
      {/* <Header onSearchChange={() => {}} /> */}
      
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Raffles
        </Button>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
          <HeroSection raffle={raffle} />
          <StatsBar raffle={raffle} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <DetailsSection raffle={raffle} />
              <WhatYouWinSection raffle={raffle} />
            </div>
            <div className="space-y-8">
              <TrustVerificationSection />
              <FAQSection />
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2025 RafflePH. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RaffleDetailsPage;
