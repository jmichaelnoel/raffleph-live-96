
import React, { useState } from 'react';
import { Raffle } from '@/data/raffles';
import { Package, ChevronLeft, ChevronRight, Trophy, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatYouWinSectionProps {
  raffle: Raffle;
}

const WhatYouWinSection: React.FC<WhatYouWinSectionProps> = ({ raffle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock data for multiple images - in real implementation, this would come from raffle data
  const grandPrizeImages = [raffle.imageUrl, raffle.imageUrl, raffle.imageUrl];
  const consolationPrizes = [
    { name: "2nd Prize: ₱50,000 Cash", images: ["https://images.unsplash.com/photo-1554672723-d42a16e533db?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"], isCash: true },
    { name: "3rd Prize: ₱25,000 Cash", images: ["https://images.unsplash.com/photo-1554672723-d42a16e533db?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"], isCash: true }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % grandPrizeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + grandPrizeImages.length) % grandPrizeImages.length);
  };

  const handleBundleClick = () => {
    // Navigate to organizer's messenger
    const messengerLink = `https://m.me/${raffle.organization.toLowerCase().replace(/\s+/g, '')}`;
    window.open(messengerLink, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Grand Prize */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-ph-red" /> Grand Prize
        </h2>
        
        <div className="space-y-4">
          {/* Image Gallery with blurred background */}
          <div className="relative">
            <div 
              className="w-full h-64 rounded-md border overflow-hidden relative"
              style={{
                backgroundImage: `url(${grandPrizeImages[currentImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <img 
              src={grandPrizeImages[currentImageIndex]} 
              alt={`Grand Prize: ${raffle.title}`}
              className="absolute inset-0 w-full h-64 object-contain rounded-md"
            />
            {grandPrizeImages.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {grandPrizeImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-ph-blue mb-2">{raffle.title}</h3>
            <p className="text-gray-600 mb-3">
              {raffle.description}
            </p>
          </div>
        </div>
      </div>

      {/* Consolation Prizes */}
      {consolationPrizes.length > 0 && (
        <div className="p-6 bg-slate-50 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <Gift className="mr-2 h-5 w-5 text-ph-blue" /> Consolation Prizes
          </h2>
          
          <div className="space-y-4">
            {consolationPrizes.map((prize, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-md border">
                <img 
                  src={prize.isCash ? "https://images.unsplash.com/photo-1554672723-d42a16e533db?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800" : prize.images[0]} 
                  alt={prize.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{prize.name}</h4>
                  <p className="text-sm text-gray-500">Additional prizes for lucky participants</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bundle Pricing */}
      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-md border border-yellow-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bundle Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={handleBundleClick}
            className="text-center p-4 bg-white rounded-md border hover:border-ph-blue hover:shadow-md transition-all cursor-pointer"
          >
            <p className="text-lg font-semibold text-ph-blue">1 Slot</p>
            <p className="text-2xl font-bold text-gray-800">₱{raffle.bettingCost.toLocaleString()}</p>
          </button>
          <button 
            onClick={handleBundleClick}
            className="text-center p-4 bg-white rounded-md border border-ph-red hover:border-ph-red hover:shadow-md transition-all cursor-pointer"
          >
            <p className="text-lg font-semibold text-ph-red">5 Slots</p>
            <p className="text-2xl font-bold text-gray-800">₱{(raffle.bettingCost * 4.5).toLocaleString()}</p>
            <p className="text-sm text-green-600">Save 10%</p>
          </button>
          <button 
            onClick={handleBundleClick}
            className="text-center p-4 bg-white rounded-md border border-green-500 hover:border-green-500 hover:shadow-md transition-all cursor-pointer"
          >
            <p className="text-lg font-semibold text-green-600">10 Slots</p>
            <p className="text-2xl font-bold text-gray-800">₱{(raffle.bettingCost * 8).toLocaleString()}</p>
            <p className="text-sm text-green-600">Save 20%</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatYouWinSection;
