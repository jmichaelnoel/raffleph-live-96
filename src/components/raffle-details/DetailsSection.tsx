
import React from 'react';
import { Raffle } from '@/types/raffle';
import { CalendarDays } from 'lucide-react';
import DrawDateBadge from '@/components/DrawDateBadge';

interface DetailsSectionProps {
  raffle: Raffle;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ raffle }) => {
  return (
    <div className="p-6 bg-slate-50 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">About This Raffle</h2>
      <p className="text-gray-600 mb-4">{raffle.description}</p>
      
      <div className="space-y-2 text-gray-700">
        <p><strong>Organized by:</strong> {raffle.organization}</p>
        <p className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-ph-blue" /> 
          <strong>Drawing Date:</strong> 
          <span className="ml-2">
            <DrawDateBadge drawDate={raffle.drawDate} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default DetailsSection;
