
import React from 'react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import { Sparkles, Crown } from 'lucide-react';

interface HeroSectionProps {
  onBrowseRaffles: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseRaffles }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading with GradientText */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-black">Win </span>
            <GradientText className="bg-transparent">Amazing Prizes</GradientText>
            <br />
            <span className="text-black">
              Every Single Day! <Crown className="inline-block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-yellow-500 ml-2" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 animate-fade-in delay-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Filipinos winning incredible prizes daily! From the latest gadgets to dream cars, 
            your next big win is just a click away! 🚗💰📱
          </p>

          {/* CTA Button with Browse Raffles styling */}
          <Button
            onClick={onBrowseRaffles}
            size="lg"
            className="text-xl px-12 py-8 animate-fade-in delay-700 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white"
            style={{
              background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
            }}
          >
            <Sparkles className="mr-3 h-6 w-6" />
            Start Winning Today!
            <Sparkles className="ml-3 h-6 w-6" />
          </Button>

          {/* Trust indicators */}
          <div className="mt-8 animate-fade-in delay-1000">
            <p className="text-sm text-gray-500 mb-4">Trusted by thousands • Safe & Secure • Instant Results</p>
            <div className="flex justify-center space-x-8 text-2xl">
              <span>🛡️</span>
              <span>⚡</span>
              <span>🎯</span>
              <span>💎</span>
              <span>🏆</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
