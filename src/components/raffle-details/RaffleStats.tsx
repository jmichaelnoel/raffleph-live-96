
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Gift, DollarSign, Percent, Users } from 'lucide-react';

interface RaffleStatsProps {
  raffle: Raffle;
}

const RaffleStats: React.FC<RaffleStatsProps> = ({ raffle }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <Gift className="mr-3 h-6 w-6 text-ph-red" />
        <div>
          <p className="text-sm text-gray-600">Prize Value</p>
          <p className="font-bold text-lg text-gray-800">₱{raffle.prize.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <DollarSign className="mr-3 h-6 w-6 text-green-500" />
        <div>
          <p className="text-sm text-gray-600">Entry Cost</p>
          <p className="font-bold text-lg text-gray-800">₱{raffle.bettingCost.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <Percent className="mr-3 h-6 w-6 text-yellow-500" />
        <div>
          <p className="text-sm text-gray-600">Winning Odds</p>
          <p className="font-bold text-lg text-gray-800">{(raffle.winningPercentage * 100).toFixed(3)}%</p>
        </div>
      </div>
      
      {raffle.entriesLeft !== undefined && (
        <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <Users className="mr-3 h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Total Entries</p>
            <p className="font-bold text-lg text-gray-800">{raffle.entriesLeft > 0 ? raffle.entriesLeft.toLocaleString() : "Unlimited"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaffleStats;
