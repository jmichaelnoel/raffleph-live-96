
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Trophy, Target, DollarSign, Clock } from 'lucide-react';

export type SortOption = 
  | 'prize-high-to-low'
  | 'prize-low-to-high'
  | 'win-high-to-low'
  | 'win-low-to-high'
  | 'bet-high-to-low'
  | 'bet-low-to-high'
  | 'end-date-asc'
  | 'end-date-desc';

interface SortOptionsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortOption, onSortChange }) => {
  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case 'prize-high-to-low':
        return <Trophy className="h-3 w-3" />;
      case 'win-high-to-low':
        return <Target className="h-3 w-3" />;
      case 'bet-low-to-high':
        return <DollarSign className="h-3 w-3" />;
      case 'end-date-asc':
        return <Clock className="h-3 w-3" />;
      default:
        return <Sparkles className="h-3 w-3" />;
    }
  };

  const getSortEmoji = (option: SortOption) => {
    switch (option) {
      case 'prize-high-to-low':
        return '🏆';
      case 'win-high-to-low':
        return '🎯';
      case 'bet-low-to-high':
        return '💰';
      case 'end-date-asc':
        return '⏰';
      default:
        return '✨';
    }
  };

  const sortButtons = [
    { option: 'prize-high-to-low' as SortOption, label: 'Highest Prize', gradient: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-800', hoverColor: 'hover:bg-yellow-100' },
    { option: 'win-high-to-low' as SortOption, label: 'Best Odds', gradient: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50', textColor: 'text-blue-800', hoverColor: 'hover:bg-blue-100' },
    { option: 'bet-low-to-high' as SortOption, label: 'Lowest Cost', gradient: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-800', hoverColor: 'hover:bg-green-100' },
    { option: 'end-date-asc' as SortOption, label: 'Ending Soon', gradient: 'from-red-400 to-pink-500', bgColor: 'bg-red-50', textColor: 'text-red-800', hoverColor: 'hover:bg-red-100' }
  ];

  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <div className="flex overflow-x-auto py-2 gap-1.5 lg:gap-2 hide-scrollbar flex-1">
        {sortButtons.map((button) => (
          <button
            key={button.option}
            onClick={() => onSortChange(button.option)}
            className={`
              sort-card whitespace-nowrap px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl cursor-pointer transition-all duration-300 transform border-2
              hover:scale-105 hover:shadow-md active:scale-95 flex items-center gap-1.5 lg:gap-2 font-semibold text-xs lg:text-sm min-w-max min-h-[40px]
              ${sortOption === button.option 
                ? `bg-gradient-to-r ${button.gradient} text-white shadow-md border-white animate-float-gently` 
                : `${button.bgColor} ${button.textColor} ${button.hoverColor} border-gray-200 hover:shadow-sm`
              }
            `}
          >
            <span className="text-sm lg:text-base" style={{ animationDelay: `${sortButtons.indexOf(button) * 100}ms` }}>
              {getSortEmoji(button.option)}
            </span>
            <div className="flex items-center gap-1 lg:gap-1.5">
              {getSortIcon(button.option)}
              <span>{button.label}</span>
            </div>
            {sortOption === button.option && (
              <div className="animate-spin">
                <Sparkles className="h-3 w-3" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="ml-auto hidden md:block">
        <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[160px] rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-md transition-all duration-300">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2 border-purple-100 shadow-xl">
            <SelectGroup>
              <SelectLabel className="text-purple-600 font-semibold">🏆 Prize</SelectLabel>
              <SelectItem value="prize-high-to-low">Highest Prize First</SelectItem>
              <SelectItem value="prize-low-to-high">Lowest Prize First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-blue-600 font-semibold">🎯 Winning Chance</SelectLabel>
              <SelectItem value="win-high-to-low">Best Odds First</SelectItem>
              <SelectItem value="win-low-to-high">Lowest Odds First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-green-600 font-semibold">💰 Betting Cost</SelectLabel>
              <SelectItem value="bet-high-to-low">Highest Cost First</SelectItem>
              <SelectItem value="bet-low-to-high">Lowest Cost First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-red-600 font-semibold">⏰ End Date</SelectLabel>
              <SelectItem value="end-date-asc">Ending Soon</SelectItem>
              <SelectItem value="end-date-desc">Ending Later</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortOptions;
