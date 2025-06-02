
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchTerm, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Search className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-semibold text-gray-800">🔍 Search Raffles</h3>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for raffles... (Try 'iPhone', 'Car', 'Cash')"
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-3 w-full border-2 border-purple-200 focus:border-purple-400 rounded-lg bg-white"
        />
      </div>
    </div>
  );
};

export default SearchSection;
