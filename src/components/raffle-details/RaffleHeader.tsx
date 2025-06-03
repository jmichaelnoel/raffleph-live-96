
import React from 'react';
import { Raffle } from '@/types/raffle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Award, MapPin, Clock, Gift, DollarSign, Percent, Users, ExternalLink, Facebook } from 'lucide-react';

interface RaffleHeaderProps {
  raffle: Raffle;
}

const RaffleHeader: React.FC<RaffleHeaderProps> = ({ raffle }) => {
  const daysLeft = raffle.drawDate 
    ? Math.max(0, Math.ceil((new Date(raffle.drawDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 'TBD';

  const handleJoinClick = () => {
    window.open(raffle.externalJoinUrl, '_blank');
  };

  const handleOrganizerClick = () => {
    window.open(raffle.organizerFacebookUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Section */}
        <div className="relative lg:col-span-1">
          <img 
            src={raffle.imageUrl} 
            alt={raffle.title} 
            className="w-full h-64 lg:h-full object-cover"
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
            {raffle.convertibleToCash && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                💰 Cash Option
              </Badge>
            )}
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white p-2 rounded text-sm">
            <MapPin className="inline mr-1 h-4 w-4" /> {raffle.location}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded text-sm">
            <Clock className="inline mr-1 h-4 w-4" /> 
            {typeof daysLeft === 'number' ? `Ends in ${daysLeft} days` : 'Draw date TBD'}
          </div>
        </div>

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
