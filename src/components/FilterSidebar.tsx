
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { RaffleCategory, raffleCategories } from '@/data/raffles';
import { Sparkles, Trophy, Coins, Target, Zap, Filter } from 'lucide-react';

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

  const getCategoryEmoji = (category: RaffleCategory) => {
    const emojiMap: Record<RaffleCategory, string> = {
      'Electronics': '📱',
      'Cars': '🚗',
      'Cash Prizes': '💰',
      'Property': '🏠',
      'Travel': '✈️',
      'Gadgets': '🎮'
    };
    return emojiMap[category] || '🎁';
  };

  const getCategoryColor = (category: RaffleCategory, isSelected: boolean) => {
    const colorMap: Record<RaffleCategory, string> = {
      'Electronics': isSelected ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
      'Cars': isSelected ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200' : 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200',
      'Cash Prizes': isSelected ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200' : 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
      'Property': isSelected ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
      'Travel': isSelected ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-200' : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200',
      'Gadgets': isSelected ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200'
    };
    return colorMap[category];
  };

  // Calculate max win rate from actual raffle data
  const maxWinRate = 0.02; // This should be dynamically calculated from raffle data

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl border-2 border-purple-100/50 shadow-xl backdrop-blur-sm p-5 sticky top-28 overflow-hidden relative">
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-3 animate-float-gently">
          <Sparkles className="h-2 w-2 text-purple-300" />
        </div>
        <div className="absolute top-8 left-4 animate-float-gently delay-700">
          <Sparkles className="h-1.5 w-1.5 text-pink-300" />
        </div>
        <div className="absolute bottom-12 right-2 animate-float-gently delay-1000">
          <Sparkles className="h-1.5 w-1.5 text-blue-300" />
        </div>
      </div>
      
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg animate-pulse">
            <Filter className="h-4 w-4 text-white" />
          </div>
          Filter Raffles
        </h2>
        
        <div className="mb-5 animate-slide-up">
          <div className="flex items-center mb-3">
            <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mr-1.5 shadow-md">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">🏆 Prize Value</h3>
          </div>
          <div className="mb-3 px-1">
            <Slider 
              defaultValue={[0, maxPrize]} 
              min={0} 
              max={maxPrize} 
              step={10000}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="py-3 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-gray-300 [&_.h-2]:to-gray-200 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-yellow-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-yellow-600 [&_.absolute.h-full]:via-yellow-500 [&_.absolute.h-full]:to-yellow-400"
            />
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full shadow-sm text-sm">
              {formatCurrency(priceRange[0])}
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full shadow-sm text-sm">
              {formatCurrency(priceRange[1])}
            </span>
          </div>
        </div>
        
        <div className="mb-5 animate-slide-up delay-150">
          <div className="flex items-center mb-3">
            <div className="p-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mr-1.5 shadow-md">
              <Coins className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">💰 Betting Cost</h3>
          </div>
          <div className="mb-3 px-1">
            <Slider 
              defaultValue={[0, maxBet]} 
              min={0} 
              max={maxBet} 
              step={10}
              value={betRange}
              onValueChange={(value) => setBetRange(value as [number, number])}
              className="py-3 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-gray-300 [&_.h-2]:to-gray-200 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-green-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-green-600 [&_.absolute.h-full]:via-green-500 [&_.absolute.h-full]:to-green-400"
            />
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full shadow-sm text-sm">
              {formatCurrency(betRange[0])}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full shadow-sm text-sm">
              {formatCurrency(betRange[1])}
            </span>
          </div>
        </div>
        
        <div className="mb-5 animate-slide-up delay-300">
          <div className="flex items-center mb-3">
            <div className="p-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg mr-1.5 shadow-md">
              <Target className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">🎯 Winning Percentage</h3>
          </div>
          <div className="mb-3 px-1">
            <Slider 
              defaultValue={[0, maxWinRate]} 
              min={0} 
              max={maxWinRate} 
              step={0.0001}
              value={winRateRange}
              onValueChange={(value) => setWinRateRange(value as [number, number])}
              className="py-3 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-gray-300 [&_.h-2]:to-gray-200 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-blue-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-blue-600 [&_.absolute.h-full]:via-blue-500 [&_.absolute.h-full]:to-blue-400"
            />
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full shadow-sm text-sm">
              {formatPercentage(winRateRange[0])}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full shadow-sm text-sm">
              {formatPercentage(winRateRange[1])}
            </span>
          </div>
        </div>

        <div className="animate-slide-up delay-450">
          <div className="flex items-center mb-3">
            <div className="p-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg mr-1.5 shadow-md">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">🏷️ Categories</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {raffleCategories.map((category) => (
              <div 
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`
                  px-2 py-2 rounded-lg cursor-pointer transition-all duration-300 transform border-2
                  hover:scale-105 hover:shadow-md active:scale-95 flex items-center justify-center
                  ${getCategoryColor(category, selectedCategories.includes(category))}
                  ${selectedCategories.includes(category) ? 'shadow-md' : 'hover:shadow-sm'}
                `}
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm animate-bounce" style={{ animationDelay: `${raffleCategories.indexOf(category) * 100}ms` }}>
                    {getCategoryEmoji(category)}
                  </span>
                  <span className="font-medium text-xs text-center leading-tight">
                    {category}
                  </span>
                  {selectedCategories.includes(category) && (
                    <div className="animate-spin">
                      <Sparkles className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
