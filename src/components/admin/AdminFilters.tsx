
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DrawDateFilter from '@/components/admin/DrawDateFilter';
import { DrawDateStatus } from '@/types/raffle';

interface AdminFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected';
  setStatusFilter: (status: 'all' | 'pending' | 'approved' | 'rejected') => void;
  drawDateFilter?: DrawDateStatus;
  setDrawDateFilter?: (status: DrawDateStatus) => void;
}

const AdminFilters: React.FC<AdminFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  drawDateFilter = 'all',
  setDrawDateFilter
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search submissions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {statusFilter === 'approved' && setDrawDateFilter && (
          <DrawDateFilter
            value={drawDateFilter}
            onChange={setDrawDateFilter}
          />
        )}
      </div>
    </div>
  );
};

export default AdminFilters;
