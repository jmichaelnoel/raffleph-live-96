
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      <div className="absolute top-4 right-4 text-2xl animate-sparkle">✨</div>
      <div className="absolute bottom-8 left-8 text-xl animate-float-gently">🎊</div>
      <div className="absolute top-1/2 right-1/4 text-lg animate-bounce delay-300">⭐</div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
            How It <GradientText>Works</GradientText>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-6 animate-fade-in delay-150">
            Join exciting raffles in just a few taps 🎟️
          </p>
          <div className="flex justify-center items-center gap-4 animate-fade-in delay-300">
            <div className="text-2xl animate-bounce">🎲</div>
            <Badge className="bg-ph-red hover:bg-ph-red/90 text-white px-4 py-2 text-lg animate-pulse">
              Super Easy!
            </Badge>
            <div className="text-2xl animate-bounce delay-200">🏆</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
