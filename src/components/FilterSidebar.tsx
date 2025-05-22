
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RaffleCategory, raffleCategories } from '@/data/raffles';
import { Ticket, TicketPercent, DollarSign, Percent } from 'lucide-react';

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrize: number;
  selectedCategories: RaffleCategory[];
  setSelectedCategories: (categories: RaffleCategory[]) => void;
  betRange: [number, number];
  setBetRange: (range: [number, number]) => void;
  maxBet: number;
  winRateRange: [number, number];
  setWinRateRange: (range: [number, number]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  setPriceRange,
  maxPrize,
  selectedCategories,
  setSelectedCategories,
  betRange,
  setBetRange,
  maxBet,
  winRateRange,
  setWinRateRange
}) => {
  const handleCategoryChange = (category: RaffleCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(3)}%`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-28">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Ticket className="h-5 w-5" />
        Filter Raffles
      </h2>
      
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center mb-4">
          <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
          <h3 className="font-medium text-gray-800">Prize Value</h3>
        </div>
        <div className="mb-2 px-1">
          <Slider 
            defaultValue={[0, maxPrize]} 
            min={0} 
            max={maxPrize} 
            step={10000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="py-4"
          />
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>{formatCurrency(priceRange[0])}</span>
          <span>{formatCurrency(priceRange[1])}</span>
        </div>
      </div>
      
      <div className="mb-8 animate-slide-up delay-1">
        <div className="flex items-center mb-4">
          <TicketPercent className="h-4 w-4 mr-2 text-gray-500" />
          <h3 className="font-medium text-gray-800">Betting Cost</h3>
        </div>
        <div className="mb-2 px-1">
          <Slider 
            defaultValue={[0, maxBet]} 
            min={0} 
            max={maxBet} 
            step={10}
            value={betRange}
            onValueChange={(value) => setBetRange(value as [number, number])}
            className="py-4"
          />
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>{formatCurrency(betRange[0])}</span>
          <span>{formatCurrency(betRange[1])}</span>
        </div>
      </div>
      
      <div className="mb-8 animate-slide-up delay-2">
        <div className="flex items-center mb-4">
          <Percent className="h-4 w-4 mr-2 text-gray-500" />
          <h3 className="font-medium text-gray-800">Winning Percentage</h3>
        </div>
        <div className="mb-2 px-1">
          <Slider 
            defaultValue={[0, 0.02]} 
            min={0} 
            max={0.02} 
            step={0.0001}
            value={winRateRange}
            onValueChange={(value) => setWinRateRange(value as [number, number])}
            className="py-4"
          />
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>{formatPercentage(winRateRange[0])}</span>
          <span>{formatPercentage(winRateRange[1])}</span>
        </div>
      </div>

      <div className="animate-slide-up delay-3">
        <div className="flex items-center mb-4">
          <Ticket className="h-4 w-4 mr-2 text-gray-500" />
          <h3 className="font-medium text-gray-800">Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {raffleCategories.map((category) => (
            <div 
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`filter-tag cursor-pointer ${selectedCategories.includes(category) ? 'active' : ''}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
