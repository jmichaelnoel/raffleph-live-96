
import React from 'react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import { Sparkles, Gift, Trophy, Zap, Crown } from 'lucide-react';

interface HeroSectionProps {
  onBrowseRaffles: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseRaffles }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16 lg:py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-float-gently">
          <Gift className="h-8 w-8 text-purple-300" />
        </div>
        <div className="absolute top-20 right-20 animate-float-gentle delay-1000">
          <Trophy className="h-6 w-6 text-pink-300" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce-slow">
          <Zap className="h-7 w-7 text-blue-300" />
        </div>
        <div className="absolute top-1/2 right-10 animate-spin-slow">
          <Sparkles className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="absolute bottom-10 right-1/3 animate-float-gently delay-500">
          <Sparkles className="h-4 w-4 text-purple-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading with GradientText */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Win <GradientText className="bg-transparent">Amazing Prizes</GradientText>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
            className="text-xl px-12 py-8 animate-fade-in delay-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white"
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
