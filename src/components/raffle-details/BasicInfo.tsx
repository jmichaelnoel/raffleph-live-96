
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Badge } from '@/components/ui/badge';
import { Tag, Award, Clock } from 'lucide-react';
import { calculateDaysLeft } from '@/utils/dateUtils';

interface BasicInfoProps {
  raffle: Raffle;
  daysLeft: number;
  onOrganizerClick: () => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ raffle, daysLeft }) => {
  const displayDaysLeft = calculateDaysLeft(raffle.endDate);
  
  return (
    <div className="relative lg:col-span-1">
      <div className="w-full h-64 lg:h-full relative overflow-hidden rounded-l-2xl lg:rounded-none">
        {/* Blurred background */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-md scale-110"
          style={{ backgroundImage: `url(${raffle.imageUrl})` }}
        />
        {/* Main image */}
        <img 
          src={raffle.imageUrl} 
          alt={raffle.title} 
          className="absolute inset-0 w-full h-full object-contain z-10"
        />
      </div>
      <div className="absolute top-4 left-4 space-x-2">
        <Badge variant="secondary" className="bg-white/90">
          <Tag className="mr-1 h-3 w-3" /> {raffle.category}
        </Badge>
        {raffle.featured && (
          <Badge className="bg-ph-red text-white">
            <Award className="mr-1 h-3 w-3" /> Featured
          </Badge>
        )}
        {raffle.convertibleToCash && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            💰 Cash Option
          </Badge>
        )}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded text-sm">
        <Clock className="inline mr-1 h-4 w-4" />
        {displayDaysLeft === 'TBD' ? 'Draw Date TBD' : `Ends in ${displayDaysLeft} days`}
      </div>
    </div>
  );
};

export default BasicInfo;
