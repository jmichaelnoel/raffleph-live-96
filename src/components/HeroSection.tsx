
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedCategoryText from './AnimatedCategoryText';

const HeroSection: React.FC = () => {
  const handleBrowseRaffles = () => {
    const rafflesSection = document.querySelector('main');
    if (rafflesSection) {
      rafflesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">
              Join a <GradientText>Raffle</GradientText>. Change Your <GradientText>Life</GradientText>. 
            </h2>
            
            <div className="text-lg lg:text-xl text-gray-600 max-w-2xl mb-5 lg:mb-6 animate-fade-in delay-1 text-center lg:text-left">
              <p className="mb-2">
                Browse top online raffles and get a chance to win<AnimatedCategoryText />!
              </p>
              <p>
                Join for as low as ₱20.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
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
          
          <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg animate-fade-in delay-3 hidden md:block relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-purple-100/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Badge className="bg-ph-red hover:bg-ph-red/90 text-white px-3 py-1 rounded-full text-xs mr-2 animate-pulse">Featured</Badge>
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs animate-bounce delay-200">Trending</Badge>
                </div>
                <span className="text-sm text-gray-600 font-medium">Manila</span>
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-800">Mega Million Jackpot</h3>
              <p className="text-xs text-gray-500 mb-3">From: PCSO Philippines (Example)</p>
              <p className="text-sm text-gray-600 mb-4">Win the biggest cash prize of the year in our nationwide lottery draw.</p>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4 text-center">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
                  <span className="block text-gray-600 text-xs">Prize</span>
                  <span className="font-bold text-lg text-gray-800">₱10M</span>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
                  <span className="block text-gray-600 text-xs">Odds</span>
                  <span className="font-bold text-lg text-gray-800">0.01%</span>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
                  <span className="block text-gray-600 text-xs">Cost</span>
                  <span className="font-bold text-lg text-gray-800">₱20</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue py-2.5 px-4 rounded-full font-bold transition-all hover:shadow-lg text-base hover:animate-button-hover-pop transform hover:scale-105">
                Join Raffle Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
