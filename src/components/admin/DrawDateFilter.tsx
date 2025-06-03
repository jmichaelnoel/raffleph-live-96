
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DrawDateStatus } from '@/types/raffle';

interface DrawDateFilterProps {
  value: DrawDateStatus;
  onChange: (value: DrawDateStatus) => void;
}

const DrawDateFilter: React.FC<DrawDateFilterProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Draw Date:</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Raffles</SelectItem>
          <SelectItem value="confirmed">Date Confirmed</SelectItem>
          <SelectItem value="tbd">Date TBD</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DrawDateFilter;
