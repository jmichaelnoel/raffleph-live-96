
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { RaffleCategory, raffleCategories } from '@/data/raffles';
import { Sparkles, Trophy, Coins, Target, Zap, Filter, X } from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  priceRange = [0, 1000000],
  setPriceRange,
  maxPrize,
  selectedCategories = [],
  setSelectedCategories,
  betRange = [0, 10000],
  setBetRange,
  maxBet,
  winRateRange = [0, 0.02],
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
      'Gadgets': '🎮',
      'Cars': '🚗',
      'Cash': '💰',
      'Motorcycle': '🏍️'
    };
    return emojiMap[category] || '🎁';
  };

  const getCategoryColor = (category: RaffleCategory, isSelected: boolean) => {
    const colorMap: Record<RaffleCategory, string> = {
      'Gadgets': isSelected ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Cars': isSelected ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-red-50 text-red-700 border-red-200',
      'Cash': isSelected ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-green-50 text-green-700 border-green-200',
      'Motorcycle': isSelected ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' : 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colorMap[category];
  };

  const clearAllFilters = () => {
    setPriceRange([0, maxPrize]);
    setBetRange([0, maxBet]);
    setWinRateRange([0, 0.02]);
    setSelectedCategories([]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="pb-4">
          <DrawerTitle className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
            Filter Raffles
          </DrawerTitle>
          <DrawerClose className="absolute right-4 top-4">
            <X className="h-6 w-6" />
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-4 pb-6 overflow-y-auto">
          {/* Prize Value */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mr-2">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-base">🏆 Prize Value</h3>
            </div>
            <div className="mb-3 px-1">
              <Slider 
                defaultValue={[0, maxPrize]} 
                min={0} 
                max={maxPrize} 
                step={10000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="py-4 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-yellow-200 [&_.h-2]:to-orange-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-yellow-400 [&_[role=slider]]:to-orange-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-yellow-400 [&_.absolute.h-full]:to-orange-500"
              />
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                {formatCurrency(priceRange[0])}
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                {formatCurrency(priceRange[1])}
              </span>
            </div>
          </div>
          
          {/* Betting Cost */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mr-2">
                <Coins className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-base">💰 Betting Cost</h3>
            </div>
            <div className="mb-3 px-1">
              <Slider 
                defaultValue={[0, maxBet]} 
                min={0} 
                max={maxBet} 
                step={10}
                value={betRange}
                onValueChange={(value) => setBetRange(value as [number, number])}
                className="py-4 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-green-200 [&_.h-2]:to-emerald-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-green-400 [&_[role=slider]]:to-emerald-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-green-400 [&_.absolute.h-full]:to-emerald-500"
              />
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {formatCurrency(betRange[0])}
              </span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                {formatCurrency(betRange[1])}
              </span>
            </div>
          </div>
          
          {/* Winning Percentage */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg mr-2">
                <Target className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-base">🎯 Winning Percentage</h3>
            </div>
            <div className="mb-3 px-1">
              <Slider 
                defaultValue={[0, 0.02]} 
                min={0} 
                max={0.02} 
                step={0.0001}
                value={winRateRange}
                onValueChange={(value) => setWinRateRange(value as [number, number])}
                className="py-4 [&_.h-2]:bg-gradient-to-r [&_.h-2]:from-blue-200 [&_.h-2]:to-indigo-200 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-400 [&_[role=slider]]:to-indigo-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_.absolute.h-full]:bg-gradient-to-r [&_.absolute.h-full]:from-blue-400 [&_.absolute.h-full]:to-indigo-500"
              />
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {formatPercentage(winRateRange[0])}
              </span>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                {formatPercentage(winRateRange[1])}
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg mr-2">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-base">🏷️ Categories</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {raffleCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 border-2 text-sm font-medium min-h-[44px]
                    ${getCategoryColor(category, selectedCategories.includes(category))}
                    ${selectedCategories.includes(category) ? 'shadow-md' : 'hover:shadow-sm'}
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">
                      {getCategoryEmoji(category)}
                    </span>
                    <span className="text-xs leading-tight">
                      {category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              className="flex-1 h-12 rounded-full border-2"
            >
              Clear All
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
