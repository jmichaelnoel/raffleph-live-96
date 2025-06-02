
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';
import AnimatedCategoryText from './AnimatedCategoryText';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchChange
}) => {
  return (
    <header className="bg-white shadow-sm"> 
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex items-center">
            <MobileNavigation />
            <div className="flex items-center ml-2 md:ml-0">
              <h1 className="text-2xl lg:text-3xl font-bold group cursor-pointer flex items-center">
                <span className="text-ph-red animate-pulse">🎊</span>
                <span className="text-ph-red animate-pulse">Raffle</span>
                <span className="text-ph-blue group-hover:animate-bounce">PH</span>
                <span className="text-xs lg:text-sm font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.6rem', lineHeight: '2.4rem', letterSpacing: '0.02em' }}>.com</span>
                <span className="text-ph-yellow animate-ping inline-block w-2 h-2 rounded-full">.</span>
                <span className="text-2xl ml-2 animate-bounce delay-100">🎊</span>
              </h1>
            </div>
          </div>
          
          <Button className="rounded-full text-white font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform" style={{
          background: 'linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)'
        }}>
            🎁 Submit Raffle
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">
              Join a <GradientText>Raffle</GradientText>. Change Your <GradientText>Life</GradientText>. 
              <span className="inline-block ml-2 animate-bounce delay-300">👑</span>
            </h2>
            
            <div className="text-lg lg:text-xl text-gray-600 max-w-2xl mb-5 lg:mb-6 animate-fade-in delay-1 text-center lg:text-left">
              <p className="mb-2">
                Browse top online raffles and get a chance to win<AnimatedCategoryText />!
              </p>
              <p>
                Join for as low as ₱20. 
                <span className="inline-block ml-1 animate-bounce delay-700">🎯</span>
                <span className="inline-block ml-1 animate-pulse delay-1000">💰</span>
              </p>
            </div>
            
            <div className="relative animate-fade-in delay-2 group">
              <Input 
                type="text" 
                placeholder="🔍 Search for raffles… (Try 'iPhone', 'Car', 'Cash')" 
                className="pl-10 lg:pl-12 pr-4 py-3 lg:py-4 rounded-full border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 w-full text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]" 
                onChange={e => onSearchChange(e.target.value)} 
              />
              <Search className="absolute left-3 lg:left-4 top-3 lg:top-4 h-5 w-5 lg:h-6 lg:w-6 text-purple-400 animate-pulse" />
              <div className="absolute right-3 top-3 lg:top-4 text-2xl animate-bounce delay-500">🎲</div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg animate-fade-in delay-3 hidden md:block relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-purple-100/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-2 right-2 text-2xl animate-spin-slow">✨</div>
            <div className="absolute bottom-2 left-2 text-xl animate-bounce delay-700">🏆</div>
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Badge className="bg-ph-red hover:bg-ph-red/90 text-white px-3 py-1 rounded-full text-xs mr-2 animate-pulse">🎁 Featured</Badge>
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs animate-bounce delay-200">🔥 Trending</Badge>
                </div>
                <span className="text-sm text-gray-600 font-medium">📍 Manila</span>
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-800">🎊 Mega Million Jackpot</h3>
              <p className="text-xs text-gray-500 mb-3">From: PCSO Philippines (Example) ⭐</p>
              <p className="text-sm text-gray-600 mb-4">Win the biggest cash prize of the year in our nationwide lottery draw. 🎯</p>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4 text-center">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
                  <span className="block text-gray-600 text-xs">🏆 Prize</span>
                  <span className="font-bold text-lg text-gray-800">₱10M</span>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
                  <span className="block text-gray-600 text-xs">🎯 Odds</span>
                  <span className="font-bold text-lg text-gray-800">0.01%</span>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
                  <span className="block text-gray-600 text-xs">💵 Cost</span>
                  <span className="font-bold text-lg text-gray-800">₱20</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue py-2.5 px-4 rounded-full font-bold transition-all hover:shadow-lg text-base hover:animate-button-hover-pop transform hover:scale-105">
                🎟 Join Raffle Now ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
