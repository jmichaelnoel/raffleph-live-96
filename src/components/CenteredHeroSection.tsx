
import React from 'react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedCategoryText from './AnimatedCategoryText';

const CenteredHeroSection: React.FC = () => {
  const handleBrowseRaffles = () => {
    const rafflesSection = document.querySelector('main');
    if (rafflesSection) {
      rafflesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 animate-fade-in">
            Join a <GradientText>Raffle</GradientText>. Change Your <GradientText>Life</GradientText>. 
          </h2>
          
          <div className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 animate-fade-in delay-1">
            <p className="mb-2">
              Browse top online raffles and get a chance to win<AnimatedCategoryText />!
            </p>
            <p>
              Join for as low as ₱20.
            </p>
          </div>

          <div className="animate-fade-in delay-2">
            <Button 
              onClick={handleBrowseRaffles}
              className="rounded-full text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform text-lg"
              style={{
                background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
              }}
            >
              Join Raffle Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CenteredHeroSection;
