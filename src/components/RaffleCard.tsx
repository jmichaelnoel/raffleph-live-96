
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Removed Lucide icon imports as they are replaced by emojis for these specific items
// import { TicketPercent, DollarSign, Calendar, Percent } from 'lucide-react'; 

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
    // Ensure endDate is in the future for positive diffDays, or handle past dates
    const diffTime = endDate.getTime() - today.getTime();
    if (diffTime < 0) return 0; // Or handle as "Ended"
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="raffle-card overflow-hidden h-full flex flex-col rounded-3xl border-none">
      <div className="relative">
        <img
          src={raffle.imageUrl}
          alt={raffle.title}
          className="w-full h-48 object-cover"
        />
        {raffle.featured && (
          <Badge className="absolute top-3 right-3 bg-ph-red hover:bg-ph-red rounded-full font-medium">
            🎁 Featured
          </Badge>
        )}
        <Badge variant="outline" className="absolute top-3 left-3 bg-white/90 text-gray-800 rounded-full">
          {raffle.category}
        </Badge>
      </div>
      
      <CardContent className="pt-6 pb-0 flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{raffle.title}</h3>
          <span className="text-sm text-gray-500">{raffle.location}</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">By {raffle.organization}</p>
        
        <p className="text-sm line-clamp-2 text-gray-600 mb-6">{raffle.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs text-gray-600 block">🏆 Prize</span>
            <span className="font-semibold text-ph-blue">{formatCurrency(raffle.prize)}</span>
          </div>
          
          <div>
            <span className="text-xs text-gray-600 block">🎯 Win Rate</span>
            <span className="font-semibold">{formatPercentage(raffle.winningPercentage)}</span>
          </div>
          
          <div>
            <span className="text-xs text-gray-600 block">💵 Cost</span>
            <span className="font-semibold">{formatCurrency(raffle.bettingCost)}</span>
          </div>
          
          <div>
            <span className="text-xs text-gray-600 block">⏳ Ends in</span>
            <span className="font-semibold">{daysUntilEnd()} days</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <button className="w-full bg-gradient-to-r from-ph-blue to-blue-600 text-white py-3 px-4 rounded-full font-medium transition-all hover:shadow-lg">
          View Raffle
        </button>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;

