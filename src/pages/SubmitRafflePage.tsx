
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/submit-raffle/HeroSection';
import RaffleForm from '@/components/submit-raffle/RaffleForm';

const SubmitRafflePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <Header onSearchChange={() => {}} />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <RaffleForm />
      </main>

      <Footer />
    </div>
  );
};

export default SubmitRafflePage;
