
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-3xl border-2 border-purple-100/50 shadow-xl backdrop-blur-sm p-8 sticky top-28 overflow-hidden relative">
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-6 animate-float-gently">
          <Sparkles className="h-4 w-4 text-purple-300" />
        </div>
        <div className="absolute top-16 left-8 animate-float-gently delay-700">
          <Sparkles className="h-3 w-3 text-pink-300" />
        </div>
        <div className="absolute bottom-20 right-4 animate-float-gently delay-1000">
          <Sparkles className="h-3 w-3 text-blue-300" />
        </div>
      </div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg animate-pulse">
            <Filter className="h-6 w-6 text-white" />
          </div>
          Filter Raffles
        </h2>
        
        <div className="mb-10 animate-slide-up">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mr-3 shadow-md">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">🏆 Prize Value</h3>
          </div>
          <div className="mb-4 px-2">
            <Slider 
              defaultValue={[0, maxPrize]} 
              min={0} 
              max={maxPrize} 
              step={10000}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="py-6 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-yellow-200 [&_.h-2]:to-orange-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-yellow-400 [&_[role=slider]]:to-orange-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-yellow-400 [&_.absolute.h-full]:to-orange-500"
            />
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
              {formatCurrency(priceRange[0])}
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full shadow-sm">
              {formatCurrency(priceRange[1])}
            </span>
          </div>
        </div>
        
        <div className="mb-10 animate-slide-up delay-150">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mr-3 shadow-md">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">💰 Betting Cost</h3>
          </div>
          <div className="mb-4 px-2">
            <Slider 
              defaultValue={[0, maxBet]} 
              min={0} 
              max={maxBet} 
              step={10}
              value={betRange}
              onValueChange={(value) => setBetRange(value as [number, number])}
              className="py-6 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-green-200 [&_.h-2]:to-emerald-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-green-400 [&_[role=slider]]:to-emerald-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-green-400 [&_.absolute.h-full]:to-emerald-500"
            />
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full shadow-sm">
              {formatCurrency(betRange[0])}
            </span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full shadow-sm">
              {formatCurrency(betRange[1])}
            </span>
          </div>
        </div>
        
        <div className="mb-10 animate-slide-up delay-300">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg mr-3 shadow-md">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">🎯 Winning Percentage</h3>
          </div>
          <div className="mb-4 px-2">
            <Slider 
              defaultValue={[0, 0.02]} 
              min={0} 
              max={0.02} 
              step={0.0001}
              value={winRateRange}
              onValueChange={(value) => setWinRateRange(value as [number, number])}
              className="py-6 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-blue-200 [&_.h-2]:to-indigo-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-400 [&_[role=slider]]:to-indigo-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&_[role=slider]]:hover:scale-110 [&_[role=slider]]:transition-transform [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-blue-400 [&_.absolute.h-full]:to-indigo-500"
            />
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full shadow-sm">
              {formatPercentage(winRateRange[0])}
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full shadow-sm">
              {formatPercentage(winRateRange[1])}
            </span>
          </div>
        </div>

        <div className="animate-slide-up delay-450">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg mr-3 shadow-md">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">🏷️ Categories</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {raffleCategories.map((category) => (
              <div 
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`
                  px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 transform border-2
                  hover:scale-105 hover:shadow-lg active:scale-95
                  ${getCategoryColor(category, selectedCategories.includes(category))}
                  ${selectedCategories.includes(category) ? 'shadow-lg' : 'hover:shadow-md'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-bounce" style={{ animationDelay: `${raffleCategories.indexOf(category) * 100}ms` }}>
                      {getCategoryEmoji(category)}
                    </span>
                    <span className="font-semibold text-sm">
                      {category}
                    </span>
                  </div>
                  {selectedCategories.includes(category) && (
                    <div className="animate-spin">
                      <Sparkles className="h-4 w-4" />
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
