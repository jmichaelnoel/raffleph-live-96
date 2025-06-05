
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Button } from '@/components/ui/button';
import { ExternalLink, Facebook } from 'lucide-react';
import BasicInfo from './BasicInfo';
import RaffleStats from './RaffleStats';

interface RaffleHeaderProps {
  raffle: Raffle;
}

const RaffleHeader: React.FC<RaffleHeaderProps> = ({ raffle }) => {
  const daysLeft = Math.max(0, Math.ceil((new Date(raffle.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  const handleJoinClick = () => {
    window.open(raffle.externalJoinUrl, '_blank');
  };

  const handleOrganizerClick = () => {
    window.open(raffle.organizerFacebookUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BasicInfo 
          raffle={raffle} 
          daysLeft={daysLeft} 
          onOrganizerClick={handleOrganizerClick} 
        />

        {/* Content Section */}
        <div className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-ph-blue mb-4">{raffle.title}</h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 mb-2 flex items-center">
                <Facebook className="mr-2 h-4 w-4" /> Organized by: 
                <button 
                  onClick={handleOrganizerClick}
                  className="ml-1 font-semibold hover:underline"
                >
                  {raffle.organization}
                </button>
              </p>
            </div>

            <RaffleStats raffle={raffle} />
          </div>
          
          <Button 
            onClick={handleJoinClick}
            size="lg" 
            className="w-full text-lg py-4 bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Join Raffle Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RaffleHeader;
