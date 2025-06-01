
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface RaffleCardProps {
  raffle: Raffle;
}

const RaffleCard: React.FC<RaffleCardProps> = ({ raffle }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(3)}%`;
  };

  const daysUntilEnd = () => {
    const endDate = new Date(raffle.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="raffle-card overflow-hidden h-full flex flex-col rounded-2xl lg:rounded-3xl border-none shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img
          src={raffle.imageUrl}
          alt={raffle.title}
          className="w-full h-40 lg:h-48 object-cover"
        />
        {raffle.featured && (
          <Badge className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-ph-red hover:bg-ph-red rounded-full font-medium text-xs">
            🎁 Featured
          </Badge>
        )}
        <Badge variant="outline" className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-white/90 text-gray-800 rounded-full text-xs">
          {raffle.category}
        </Badge>
      </div>
      
      <CardContent className="pt-4 lg:pt-6 pb-0 flex-grow px-4 lg:px-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg lg:text-xl font-bold line-clamp-2 flex-1">{raffle.title}</h3>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{raffle.location}</span>
        </div>
        
        <p className="text-xs lg:text-sm text-gray-500 mb-3">By {raffle.organization}</p>
        
        <p className="text-xs lg:text-sm line-clamp-2 text-gray-600 mb-4 lg:mb-6">{raffle.description}</p>
        
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
          <div>
            <span className="text-xs text-gray-600 block">🏆 Prize</span>
            <span className="font-semibold text-ph-blue text-sm lg:text-base">{formatCurrency(raffle.prize)}</span>
          </div>
          
          <div>
            <span className="text-xs text-gray-600 block">🎯 Win Rate</span>
            <span className="font-semibold text-sm lg:text-base">{formatPercentage(raffle.winningPercentage)}</span>
          </div>
          
          <div>
            <span className="text-xs text-gray-600 block">💵 Cost</span>
            <span className="font-semibold text-sm lg:text-base">{formatCurrency(raffle.bettingCost)}</span>
          </div>
          
          <div>
            <span className="text-xs text-gray-600 block">⏳ Ends in</span>
            <span className="font-semibold text-sm lg:text-base">{daysUntilEnd()} days</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 lg:pt-4 px-4 lg:px-6">
        <Link to={`/raffles/${raffle.id}`} className="w-full">
          <button 
            className="w-full bg-gradient-to-r from-ph-blue to-blue-600 text-white py-3 lg:py-3 px-4 rounded-full font-medium transition-all hover:shadow-lg hover:animate-button-hover-pop text-sm lg:text-base min-h-[44px]"
          >
            View Raffle
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;
