
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Award, MapPin, Clock, Gift, DollarSign, Percent, Ticket } from 'lucide-react';

interface HeroSectionProps {
  raffle: Raffle;
}

const HeroSection: React.FC<HeroSectionProps> = ({ raffle }) => {
  const daysLeft = Math.max(0, Math.ceil((new Date(raffle.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Left Side: Image and Badges */}
      <div className="relative">
        <img 
          src={raffle.imageUrl} 
          alt={raffle.title} 
          className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md"
        />
        <div className="absolute top-4 left-4 space-x-2">
          <Badge variant="secondary" className="bg-white/90">
            <Tag className="mr-1 h-3 w-3" /> {raffle.category}
          </Badge>
          {raffle.featured && (
            <Badge className="bg-ph-red text-white">
              <Award className="mr-1 h-3 w-3" /> Featured
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
          <MapPin className="inline mr-1 h-4 w-4" /> {raffle.location}
        </div>
         <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded text-sm">
          <Clock className="inline mr-1 h-4 w-4" /> Ends in {daysLeft} days
        </div>
      </div>

      {/* Right Side: Prize Details and CTA */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-ph-blue mb-3">{raffle.title}</h1>
          <p className="text-lg text-gray-700 mb-1 flex items-center">
            <Gift className="mr-2 h-5 w-5 text-ph-red" /> Prize Value: <span className="font-semibold ml-1">₱{raffle.prize.toLocaleString()}</span>
          </p>
          <p className="text-lg text-gray-700 mb-1 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-500" /> Cost per entry: <span className="font-semibold ml-1">₱{raffle.bettingCost.toLocaleString()}</span>
          </p>
          <p className="text-lg text-gray-700 mb-1 flex items-center">
            <Percent className="mr-2 h-5 w-5 text-yellow-500" /> Winning odds: <span className="font-semibold ml-1">{(raffle.winningPercentage * 100).toFixed(3)}%</span>
          </p>
          {raffle.entriesLeft !== undefined && (
            <p className="text-lg text-gray-700 mb-4 flex items-center">
              <Ticket className="mr-2 h-5 w-5 text-blue-500" /> Entries left: <span className="font-semibold ml-1">{raffle.entriesLeft > 0 ? raffle.entriesLeft.toLocaleString() : "Unlimited"}</span>
            </p>
          )}
        </div>
        <Button size="lg" className="w-full text-lg py-3 mt-6 bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold">
          Join Raffle Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
