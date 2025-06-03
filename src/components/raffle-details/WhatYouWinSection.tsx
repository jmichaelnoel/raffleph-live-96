
import React from 'react';
import { Raffle } from '@/hooks/useRaffleData';
import { Package } from 'lucide-react';

interface WhatYouWinSectionProps {
  raffle: Raffle;
}

const WhatYouWinSection: React.FC<WhatYouWinSectionProps> = ({ raffle }) => {
  return (
    <div className="p-6 bg-slate-50 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <Package className="mr-2 h-6 w-6 text-ph-red" /> What You'll Win
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img 
          src={raffle.imageUrl} 
          alt={`Prize: ${raffle.title}`}
          className="w-full md:w-1/3 h-auto object-contain rounded-md border p-2 bg-white"
        />
        <div className="md:w-2/3">
          <h3 className="text-xl font-medium text-ph-blue mb-2">{raffle.title}</h3>
          <p className="text-gray-600 mb-3">
            Get ready to win this amazing prize! 
          </p>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-2">Prize Details</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Condition: Brand New</li>
              <li>Color: As specified by organizer</li>
              <li>Warranty: Included if applicable</li>
              <li>Additional details provided by organizer upon inquiry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatYouWinSection;
