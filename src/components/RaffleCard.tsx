
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="raffle-card overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          src={raffle.imageUrl}
          alt={raffle.title}
          className="w-full h-48 object-cover"
        />
        {raffle.featured && (
          <Badge className="absolute top-2 right-2 bg-ph-red hover:bg-ph-red">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-4 pb-0 flex-grow">
        <div className="mb-1 flex justify-between items-center">
          <Badge variant="outline" className="bg-gray-100">
            {raffle.category}
          </Badge>
          <span className="text-sm text-gray-500">{raffle.location}</span>
        </div>
        
        <h3 className="text-xl font-bold mt-2 mb-1">{raffle.title}</h3>
        <p className="text-sm text-gray-500 mb-2">By {raffle.organization}</p>
        
        <p className="text-sm line-clamp-2 text-gray-600 mb-4">{raffle.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Prize:</span>
            <span className="font-semibold text-ph-blue">{formatCurrency(raffle.prize)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Win Rate:</span>
            <span className="font-semibold">{formatPercentage(raffle.winningPercentage)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost:</span>
            <span className="font-semibold">{formatCurrency(raffle.bettingCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tickets Left:</span>
            <span className="font-semibold">{raffle.ticketsLeft.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">
            Ends in <span className="font-bold">{daysUntilEnd()}</span> days
          </span>
          <button className="bg-ph-blue hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
            View Raffle
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;
