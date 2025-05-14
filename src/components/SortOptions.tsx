
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
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
  );
};

export default SortOptions;
