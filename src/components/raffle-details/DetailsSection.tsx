
import React from 'react';
import { Raffle } from '@/data/raffles';
import { CalendarDays, Tag, ExternalLink, Users, DollarSign, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DetailsSectionProps {
  raffle: Raffle;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ raffle }) => {
  const drawingDate = new Date(raffle.endDate);

  return (
    <div className="space-y-6">
      {/* About This Raffle */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <Package className="mr-2 h-6 w-6 text-ph-blue" />
          About This Raffle
        </h2>
        <p className="text-gray-600 mb-6">{raffle.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
              <Badge variant="secondary" className="text-sm">
                <Tag className="mr-1 h-3 w-3" /> {raffle.category}
              </Badge>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Grand Prize Value</h3>
              <p className="text-2xl font-bold text-ph-red">₱{raffle.prize.toLocaleString()}</p>
              {raffle.convertibleToCash && (
                <Badge className="mt-2 bg-green-100 text-green-800 border-green-300">
                  💰 Convertible to Cash
                </Badge>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Entry Cost</h3>
              <p className="text-xl font-semibold text-green-600">₱{raffle.bettingCost.toLocaleString()} per slot</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Total Raffle Slots</h3>
              <p className="text-xl font-semibold text-blue-600 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                {raffle.entriesLeft ? raffle.entriesLeft.toLocaleString() : 'Unlimited'}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Drawing Date</h3>
              <p className="flex items-center text-gray-700">
                <CalendarDays className="mr-2 h-5 w-5 text-ph-blue" /> 
                {drawingDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-sm text-gray-500 mt-1">via Facebook Live</p>
            </div>
          </div>
        </div>
      </div>

      {/* Raffle Mechanics */}
      <div className="p-6 bg-slate-50 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Raffle Mechanics</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>How to Join:</strong> One entry = one chance. Multiple entries allowed.</p>
          <p><strong>Payment:</strong> Contact the organizer via the official Facebook page or messenger link.</p>
          <p><strong>Winner Selection:</strong> Random drawing will be conducted on the specified date via Facebook Live.</p>
          <p><strong>Prize Delivery:</strong> Winner will be contacted directly for prize claiming/delivery arrangements.</p>
        </div>
      </div>

      {/* External Links */}
      <div className="p-6 bg-blue-50 rounded-lg shadow-md border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Official Links</h2>
        <div className="space-y-3">
          <Button 
            onClick={() => window.open(raffle.externalJoinUrl, '_blank')}
            variant="outline"
            className="w-full justify-start"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Official Raffle Post
          </Button>
          <Button 
            onClick={() => window.open(raffle.organizerFacebookUrl, '_blank')}
            variant="outline"
            className="w-full justify-start"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Organizer's Facebook Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
