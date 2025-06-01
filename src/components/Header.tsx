
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedCategoryText from './AnimatedCategoryText';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-white shadow-sm"> 
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <div className="flex items-center">
            <MobileNavigation />
            <h1 className="text-2xl lg:text-3xl font-bold ml-2 md:ml-0">
              <span className="text-ph-red">Raffle</span>
              <span className="text-ph-blue">PH</span>
              <span className="text-ph-yellow">.</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">Featured</a>
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">About</a>
            <Button className="rounded-full hover:animate-button-hover-pop">Join Now</Button>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 lg:mb-3 animate-fade-in text-center lg:text-left">
              Join a Raffle. Change Your Life. 💸
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mb-4 lg:mb-6 animate-fade-in delay-1 text-center lg:text-left">
              Browse top online raffles and get a chance to win
              <AnimatedCategoryText />! 
              Bet for as low as P20.
            </p>
            
            <div className="relative animate-fade-in delay-2">
              <Input
                type="text"
                placeholder="🔍 Search for raffles…"
                className="pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 rounded-full border border-gray-300 focus:border-ph-blue focus:ring-2 focus:ring-ph-blue w-full text-base lg:text-lg"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Search className="absolute left-3 lg:left-4 top-2.5 lg:top-3.5 h-5 w-5 lg:h-6 lg:w-6 text-gray-400" />
            </div>
          </div>
          
          <div 
            className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg animate-fade-in delay-3 hidden md:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
            <div className="relative z-10 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Badge className="bg-ph-red hover:bg-ph-red/90 text-white px-3 py-1 rounded-full text-xs mr-2">🎁 Featured</Badge>
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs">🔥 Trending</Badge>
                </div>
                <span className="text-sm text-gray-200">Manila</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Mega Million Jackpot</h3>
              <p className="text-xs text-gray-300 mb-3">From: PCSO Philippines (Example)</p>
              <p className="text-sm text-gray-200 mb-4">Win the biggest cash prize of the year in our nationwide lottery draw.</p>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4 text-center">
                <div>
                  <span className="block text-gray-300 text-xs">🏆 Prize</span>
                  <span className="font-bold text-lg">₱10M</span>
                </div>
                <div>
                  <span className="block text-gray-300 text-xs">🎯 Odds</span>
                  <span className="font-bold text-lg">0.01%</span>
                </div>
                <div>
                  <span className="block text-gray-300 text-xs">💵 Cost</span>
                  <span className="font-bold text-lg">₱20</span>
                </div>
              </div>
              <button 
                className="w-full bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue py-2.5 px-4 rounded-full font-bold transition-all hover:shadow-lg text-base hover:animate-button-hover-pop"
              >
                🎟 Join Raffle Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
