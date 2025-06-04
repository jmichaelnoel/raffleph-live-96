
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
  | 'newest'
  | 'ending-soon' 
  | 'highest-prize'
  | 'lowest-prize'
  | 'highest-win-rate'
  | 'lowest-win-rate'
  | 'ticket-low-to-high'
  | 'ticket-high-to-low'
  | 'win-rate-high-to-low'
  | 'win-rate-low-to-high';

interface SortOptionsProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortOption, onSortChange }) => {
  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case 'highest-prize':
        return <Trophy className="h-2 w-2 lg:h-2.5 lg:w-2.5" />;
      case 'highest-win-rate':
        return <Target className="h-2 w-2 lg:h-2.5 lg:w-2.5" />;
      case 'ticket-low-to-high':
        return <DollarSign className="h-2 w-2 lg:h-2.5 lg:w-2.5" />;
      case 'ending-soon':
        return <Clock className="h-2 w-2 lg:h-2.5 lg:w-2.5" />;
      default:
        return <Sparkles className="h-2 w-2 lg:h-2.5 lg:w-2.5" />;
    }
  };

  const getSortEmoji = (option: SortOption) => {
    switch (option) {
      case 'highest-prize':
        return '🏆';
      case 'highest-win-rate':
        return '🎯';
      case 'ticket-low-to-high':
        return '💰';
      case 'ending-soon':
        return '⏰';
      default:
        return '✨';
    }
  };

  const sortButtons = [
    { option: 'highest-prize' as SortOption, label: 'Highest Prize', gradient: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-800', hoverColor: 'hover:bg-yellow-100' },
    { option: 'highest-win-rate' as SortOption, label: 'Best Odds', gradient: 'from-blue-400 to-indigo-500', bgColor: 'bg-blue-50', textColor: 'text-blue-800', hoverColor: 'hover:bg-blue-100' },
    { option: 'ticket-low-to-high' as SortOption, label: 'Lowest Cost', gradient: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-800', hoverColor: 'hover:bg-green-100' },
    { option: 'ending-soon' as SortOption, label: 'Ending Soon', gradient: 'from-red-400 to-pink-500', bgColor: 'bg-red-50', textColor: 'text-red-800', hoverColor: 'hover:bg-red-100' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-2">
      {/* Mobile: 2x2 Grid Layout */}
      <div className="grid grid-cols-2 gap-1.5 w-full lg:hidden">
        {sortButtons.map((button) => (
          <button
            key={button.option}
            onClick={() => onSortChange(button.option)}
            className={`
              sort-card whitespace-nowrap px-1.5 py-1.5 rounded-lg cursor-pointer transition-all duration-300 transform border-2
              hover:scale-105 hover:shadow-md active:scale-95 flex items-center gap-1 font-semibold text-xs min-h-[32px]
              ${sortOption === button.option 
                ? `bg-gradient-to-r ${button.gradient} text-white shadow-md border-white animate-float-gently` 
                : `${button.bgColor} ${button.textColor} ${button.hoverColor} border-gray-200 hover:shadow-sm`
              }
            `}
          >
            <span className="text-xs" style={{ animationDelay: `${sortButtons.indexOf(button) * 100}ms` }}>
              {getSortEmoji(button.option)}
            </span>
            <div className="flex items-center gap-0.5">
              {getSortIcon(button.option)}
              <span className="text-xs">{button.label}</span>
            </div>
            {sortOption === button.option && (
              <div className="animate-spin">
                <Sparkles className="h-2 w-2" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Desktop: Horizontal Layout */}
      <div className="hidden lg:flex overflow-x-auto py-1 gap-1.5 hide-scrollbar flex-1">
        {sortButtons.map((button) => (
          <button
            key={button.option}
            onClick={() => onSortChange(button.option)}
            className={`
              sort-card whitespace-nowrap px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 transform border-2
              hover:scale-105 hover:shadow-md active:scale-95 flex items-center gap-1.5 font-semibold text-xs min-w-max min-h-[36px]
              ${sortOption === button.option 
                ? `bg-gradient-to-r ${button.gradient} text-white shadow-md border-white animate-float-gently` 
                : `${button.bgColor} ${button.textColor} ${button.hoverColor} border-gray-200 hover:shadow-sm`
              }
            `}
          >
            <span className="text-sm" style={{ animationDelay: `${sortButtons.indexOf(button) * 100}ms` }}>
              {getSortEmoji(button.option)}
            </span>
            <div className="flex items-center gap-1">
              {getSortIcon(button.option)}
              <span className="text-sm">{button.label}</span>
            </div>
            {sortOption === button.option && (
              <div className="animate-spin">
                <Sparkles className="h-2.5 w-2.5" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="ml-1 hidden md:block">
        <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[140px] h-9 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-md transition-all duration-300 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2 border-purple-100 shadow-xl">
            <SelectGroup>
              <SelectLabel className="text-purple-600 font-semibold">🏆 Prize</SelectLabel>
              <SelectItem value="highest-prize">Highest Prize First</SelectItem>
              <SelectItem value="lowest-prize">Lowest Prize First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-blue-600 font-semibold">🎯 Winning Chance</SelectLabel>
              <SelectItem value="highest-win-rate">Best Odds First</SelectItem>
              <SelectItem value="lowest-win-rate">Lowest Odds First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-green-600 font-semibold">💰 Betting Cost</SelectLabel>
              <SelectItem value="ticket-high-to-low">Highest Cost First</SelectItem>
              <SelectItem value="ticket-low-to-high">Lowest Cost First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-red-600 font-semibold">⏰ End Date</SelectLabel>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortOptions;
