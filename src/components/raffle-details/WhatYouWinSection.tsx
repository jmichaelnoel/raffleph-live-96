
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Raffle } from '@/data/raffles';
import { Gift, DollarSign } from 'lucide-react';

interface WhatYouWinSectionProps {
  raffle: Raffle;
}

const WhatYouWinSection = ({ raffle }: WhatYouWinSectionProps) => {
  const defaultCashImage = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800";

  return (
    <div className="space-y-6">
      {/* Grand Prize */}
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-ph-blue to-blue-600 text-white">
          <CardTitle className="flex items-center text-xl">
            <Gift className="mr-2 h-6 w-6" />
            Grand Prize
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {raffle.grandPrizeImages && raffle.grandPrizeImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {raffle.grandPrizeImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Grand prize ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{raffle.title}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ₱{raffle.prize.toLocaleString()}
                </Badge>
                {raffle.convertibleToCash && (
                  <Badge variant="outline" className="border-orange-300 text-orange-600">
                    💰 Convertible to Cash
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consolation Prizes */}
      {raffle.consolationPrizes && raffle.consolationPrizes.length > 0 && (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardTitle className="flex items-center text-xl">
              <DollarSign className="mr-2 h-6 w-6" />
              Consolation Prizes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raffle.consolationPrizes.map((prize, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <img
                      src={prize.isCash ? defaultCashImage : (prize.image || defaultCashImage)}
                      alt={prize.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{prize.name}</h4>
                      {prize.isCash && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                          💰 Cash Prize
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bundle Pricing */}
      {raffle.bundlePricing && raffle.bundlePricing.length > 0 && (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center text-xl">
              <Gift className="mr-2 h-6 w-6" />
              Bundle Deals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raffle.bundlePricing.map((bundle, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {bundle.slots} Slots
                    </div>
                    <div className="text-xl font-semibold text-gray-800">
                      ₱{bundle.price.toLocaleString()}
                    </div>
                    {bundle.savings > 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2">
                        Save ₱{bundle.savings.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WhatYouWinSection;
