
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/how-it-works/HeroSection';
import StepsSection from '@/components/how-it-works/StepsSection';
import CTASection from '@/components/how-it-works/CTASection';
import FAQSection from '@/components/how-it-works/FAQSection';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <Navbar />
      <HeroSection />
      <StepsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
