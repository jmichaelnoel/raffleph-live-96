
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

  const getCategoryButtonStyle = (category: string) => {
    const categoryStyles = {
      'Electronics': 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      'Cars': 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      'Cash Prizes': 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      'Property': 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      'Travel': 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      'Gadgets': 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
    };
    return categoryStyles[category as keyof typeof categoryStyles] || 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap = {
      'Electronics': '📱',
      'Cars': '🚗',
      'Cash Prizes': '💰',
      'Property': '🏠',
      'Travel': '✈️',
      'Gadgets': '🎮'
    };
    return emojiMap[category as keyof typeof emojiMap] || '🎁';
  };

  return (
    <Card className="raffle-card overflow-hidden h-full flex flex-col rounded-2xl lg:rounded-3xl border-2 border-gray-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white via-gray-50/30 to-purple-50/20">
      <div className="relative">
        <img
          src={raffle.imageUrl}
          alt={raffle.title}
          className="w-full h-40 lg:h-48 object-cover"
        />
        {raffle.featured && (
          <Badge className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-gradient-to-r from-ph-red to-red-600 hover:from-red-600 hover:to-ph-red text-white rounded-full font-medium text-xs shadow-lg">
            🎁 Featured
          </Badge>
        )}
        <Badge variant="outline" className="absolute top-2 lg:top-3 left-2 lg:left-3 bg-white/95 text-gray-800 rounded-full text-xs border-2 border-white shadow-sm font-medium">
          {getCategoryEmoji(raffle.category)} {raffle.category}
        </Badge>
      </div>
      
      <CardContent className="pt-4 lg:pt-6 pb-0 flex-grow px-4 lg:px-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg lg:text-xl font-bold line-clamp-2 flex-1 text-gray-800">{raffle.title}</h3>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap bg-gray-100 px-2 py-1 rounded-full">{raffle.location}</span>
        </div>
        
        <p className="text-xs lg:text-sm text-gray-500 mb-3 font-medium">By {raffle.organization}</p>
        
        <p className="text-xs lg:text-sm line-clamp-2 text-gray-600 mb-4 lg:mb-6">{raffle.description}</p>
        
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3 border border-yellow-200/50">
            <span className="text-xs text-gray-600 block font-medium">🏆 Prize</span>
            <span className="font-bold text-yellow-700 text-sm lg:text-base">{formatCurrency(raffle.prize)}</span>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200/50">
            <span className="text-xs text-gray-600 block font-medium">🎯 Win Rate</span>
            <span className="font-bold text-blue-700 text-sm lg:text-base">{formatPercentage(raffle.winningPercentage)}</span>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200/50">
            <span className="text-xs text-gray-600 block font-medium">💵 Cost</span>
            <span className="font-bold text-green-700 text-sm lg:text-base">{formatCurrency(raffle.bettingCost)}</span>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-3 border border-red-200/50">
            <span className="text-xs text-gray-600 block font-medium">⏳ Ends in</span>
            <span className="font-bold text-red-700 text-sm lg:text-base">{daysUntilEnd()} days</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 lg:pt-4 px-4 lg:px-6">
        <Link to={`/raffles/${raffle.id}`} className="w-full">
          <button 
            className={`w-full bg-gradient-to-r ${getCategoryButtonStyle(raffle.category)} text-white py-3 lg:py-3 px-4 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105 text-sm lg:text-base min-h-[44px] shadow-md`}
          >
            {getCategoryEmoji(raffle.category)} Join Raffle
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;
