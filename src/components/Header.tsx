
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">
              <span className="text-ph-red">Raffle</span>
              <span className="text-ph-blue">PH</span>
              <span className="text-ph-yellow">.</span>
            </h1>
          </div>
          
          <nav className="flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">Featured</a>
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-ph-blue transition-colors font-medium">About</a>
            <Button className="rounded-full">Join Now</Button>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in">Discover Amazing Raffles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mb-6 animate-fade-in delay-1">
              Find the best online raffles in the Philippines. Filter by prize value, winning odds, and betting cost.
            </p>
            
            <div className="relative animate-fade-in delay-2">
              <Input
                type="text"
                placeholder="Search for raffles..."
                className="pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:border-ph-blue focus:ring-2 focus:ring-ph-blue w-full text-lg"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg animate-fade-in delay-3 hidden md:block">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold bg-gradient-to-r from-ph-blue to-blue-600 text-white px-3 py-1 rounded-full">Featured</span>
                <span className="text-sm text-gray-600">Manila</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Mega Million Jackpot</h3>
              <p className="text-sm text-gray-600 mb-4">Win the biggest cash prize of the year in our nationwide lottery draw.</p>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="block text-gray-500">Prize</span>
                  <span className="font-bold text-ph-blue">₱10,000,000</span>
                </div>
                <div>
                  <span className="block text-gray-500">Odds</span>
                  <span className="font-bold">0.01%</span>
                </div>
                <div>
                  <span className="block text-gray-500">Cost</span>
                  <span className="font-bold">₱20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
