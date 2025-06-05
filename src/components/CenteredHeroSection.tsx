
import React from 'react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedCategoryText from './AnimatedCategoryText';
import TestimonialAvatars from '@/components/ui/testimonial-avatars';

const CenteredHeroSection: React.FC = () => {
  const handleBrowseRaffles = () => {
    const rafflesSection = document.querySelector('main');
    if (rafflesSection) {
      rafflesSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 py-16 lg:py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-blue-100/30"></div>
      
      {/* Floating animations - same as submit-raffle page */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce delay-100">✨</div>
      <div className="absolute top-20 right-20 text-3xl animate-float-gently delay-300">🎁</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-pulse delay-500">🚀</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-spin-slow">⭐</div>
      <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-700">💎</div>
      <div className="absolute top-1/3 right-1/3 text-2xl animate-float-gently delay-900">🎊</div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-gray-800">
            <div>Join a <GradientText>Raffle</GradientText><span className="inline-block ml-3 animate-bounce delay-300">🎯</span></div>
            <div>Change Your <GradientText>Life</GradientText><span className="inline-block ml-3 animate-pulse delay-500">✨</span></div>
          </h2>
          
          <div className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in delay-1 text-center max-w-4xl mx-auto">
            <p className="mb-2 font-bold">
              Win cars, millions in cash, and more — no sign-up required.
              <span className="inline-block ml-2 animate-pulse delay-500">🏆</span>
            </p>
            <p className="italic font-medium">
              Para sa pamilya, para sa pangarap — ito na 'yon!
              <span className="inline-block ml-2 animate-bounce delay-700">🇵🇭</span>
            </p>
          </div>

          <div className="animate-fade-in delay-2">
            <Button 
              onClick={handleBrowseRaffles} 
              className="rounded-full text-white font-bold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform text-xl" 
              style={{
                background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
              }}
            >
              Join Raffle Now
              <span className="inline-block ml-2 animate-bounce">🎲</span>
            </Button>
          </div>

          {/* Testimonial Avatars */}
          <TestimonialAvatars />
        </div>
      </div>
    </section>
  );
};

export default CenteredHeroSection;
