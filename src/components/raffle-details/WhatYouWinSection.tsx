
import React from 'react';
import { Raffle } from '@/data/raffles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, MessageCircle } from 'lucide-react';

interface WhatYouWinSectionProps {
  raffle: Raffle;
}

const WhatYouWinSection: React.FC<WhatYouWinSectionProps> = ({ raffle }) => {
  const handleBundleClick = () => {
    window.open(raffle.messengerLink || `https://m.me/${raffle.organization.toLowerCase().replace(/\s+/g, '')}`, '_blank');
  };

  // Philippine peso bills image for cash prizes - using the 4th uploaded image
  const cashImage = '/lovable-uploads/4ce42990-1785-40d7-b220-e085b10c21c7.png';

  return (
    <div className="space-y-6">
      {/* Grand Prize */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-800">
            <Star className="mr-2 h-6 w-6 text-yellow-500" />
            Grand Prize
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="w-full h-48 bg-cover bg-center filter blur-md scale-110"
                style={{ backgroundImage: `url(${raffle.imageUrl})` }}
              />
              <img 
                src={raffle.imageUrl} 
                alt={raffle.title}
                className="absolute inset-0 w-full h-48 object-contain z-10"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{raffle.title}</h3>
              <p className="text-2xl font-bold text-ph-red">₱{raffle.prize.toLocaleString()}</p>
              {raffle.convertibleToCash && (
                <Badge className="mt-2 bg-green-100 text-green-800">
                  💰 Can be converted to cash
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consolation Prizes */}
      {raffle.consolationPrizes && raffle.consolationPrizes.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-gray-800">
              <Gift className="mr-2 h-6 w-6 text-blue-500" />
              Consolation Prizes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {raffle.consolationPrizes.map((prize, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-blue-100">
                  <img 
                    src={prize.isCash ? cashImage : (prize.image || '/placeholder.svg')} 
                    alt={prize.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{prize.name}</h4>
                    {prize.isCash && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        Cash Prize
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bundle Pricing */}
      {raffle.bundlePricing && raffle.bundlePricing.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-gray-800">
              <MessageCircle className="mr-2 h-6 w-6 text-purple-500" />
              Bundle Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {raffle.bundlePricing.map((bundle, index) => (
                <Button
                  key={index}
                  onClick={handleBundleClick}
                  variant="outline"
                  className="w-full p-4 h-auto hover:bg-purple-50 border-purple-200 hover:border-purple-300 transition-all duration-300"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{bundle.slots} Slots</p>
                      <p className="text-lg font-bold text-purple-600">₱{bundle.price.toLocaleString()}</p>
                    </div>
                    {bundle.savings && (
                      <Badge className="bg-green-100 text-green-800">
                        Save ₱{bundle.savings.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WhatYouWinSection;
