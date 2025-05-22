
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
  return (
    <div className="flex items-center gap-2">
      <div className="flex overflow-x-auto py-2 gap-2 hide-scrollbar">
        <button 
          onClick={() => onSortChange('prize-high-to-low')}
          className={`pill-button whitespace-nowrap ${sortOption === 'prize-high-to-low' ? 'active' : ''}`}
        >
          Highest Prize
        </button>
        <button 
          onClick={() => onSortChange('win-high-to-low')}
          className={`pill-button whitespace-nowrap ${sortOption === 'win-high-to-low' ? 'active' : ''}`}
        >
          Best Odds
        </button>
        <button 
          onClick={() => onSortChange('bet-low-to-high')}
          className={`pill-button whitespace-nowrap ${sortOption === 'bet-low-to-high' ? 'active' : ''}`}
        >
          Lowest Cost
        </button>
        <button 
          onClick={() => onSortChange('end-date-asc')}
          className={`pill-button whitespace-nowrap ${sortOption === 'end-date-asc' ? 'active' : ''}`}
        >
          Ending Soon
        </button>
      </div>
      
      <div className="ml-auto">
        <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[180px] rounded-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectGroup>
              <SelectLabel>Prize</SelectLabel>
              <SelectItem value="prize-high-to-low">Highest Prize First</SelectItem>
              <SelectItem value="prize-low-to-high">Lowest Prize First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Winning Chance</SelectLabel>
              <SelectItem value="win-high-to-low">Best Odds First</SelectItem>
              <SelectItem value="win-low-to-high">Lowest Odds First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Betting Cost</SelectLabel>
              <SelectItem value="bet-high-to-low">Highest Cost First</SelectItem>
              <SelectItem value="bet-low-to-high">Lowest Cost First</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>End Date</SelectLabel>
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
