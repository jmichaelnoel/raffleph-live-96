
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-ph-blue">
            <span className="text-ph-red">Raffle</span>
            <span className="text-ph-blue">PH</span>
            <span className="text-ph-yellow">.</span>
          </h1>
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search raffles..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-ph-blue focus:ring-1 focus:ring-ph-blue w-full"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-ph-blue transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-ph-blue transition-colors">Featured</a></li>
            <li><a href="#" className="text-gray-600 hover:text-ph-blue transition-colors">How It Works</a></li>
            <li><a href="#" className="text-gray-600 hover:text-ph-blue transition-colors">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
