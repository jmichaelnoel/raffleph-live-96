
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RaffleCategory, raffleCategories } from '@/data/raffles';

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
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Filter Raffles</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Prize Value</h3>
        <div className="mb-2">
          <Slider 
            defaultValue={[0, maxPrize]} 
            min={0} 
            max={maxPrize} 
            step={10000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatCurrency(priceRange[0])}</span>
          <span>{formatCurrency(priceRange[1])}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Betting Cost</h3>
        <div className="mb-2">
          <Slider 
            defaultValue={[0, maxBet]} 
            min={0} 
            max={maxBet} 
            step={10}
            value={betRange}
            onValueChange={(value) => setBetRange(value as [number, number])}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatCurrency(betRange[0])}</span>
          <span>{formatCurrency(betRange[1])}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Winning Percentage</h3>
        <div className="mb-2">
          <Slider 
            defaultValue={[0, 0.02]} 
            min={0} 
            max={0.02} 
            step={0.0001}
            value={winRateRange}
            onValueChange={(value) => setWinRateRange(value as [number, number])}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatPercentage(winRateRange[0])}</span>
          <span>{formatPercentage(winRateRange[1])}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {raffleCategories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
