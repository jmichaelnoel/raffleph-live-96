
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RaffleCategory } from '@/data/raffles';

interface MobileFilterButtonProps {
  onClick: () => void;
  selectedCategories: RaffleCategory[];
  hasActiveFilters: boolean;
}

const MobileFilterButton: React.FC<MobileFilterButtonProps> = ({
  onClick,
  selectedCategories,
  hasActiveFilters
}) => {
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (hasActiveFilters) count += 1;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 lg:hidden"
      size="icon"
    >
      <div className="relative">
        <Filter className="h-6 w-6 text-white" />
        {activeCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500 text-white rounded-full flex items-center justify-center">
            {activeCount}
          </Badge>
        )}
      </div>
    </Button>
  );
};

export default MobileFilterButton;
