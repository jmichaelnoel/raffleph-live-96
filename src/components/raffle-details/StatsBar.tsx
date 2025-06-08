
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Raffle } from '@/data/raffles';
import { Calendar, Users, DollarSign, Trophy } from 'lucide-react';

interface StatsBarProps {
  raffle: Raffle;
}

const StatsBar = ({ raffle }: StatsBarProps) => {
  const formatDrawDate = () => {
    if (raffle.endDate === 'TBD') {
      return 'Draw Date: TBD';
    }
    
    try {
      const drawDate = new Date(raffle.endDate);
      if (isNaN(drawDate.getTime())) {
        return 'Draw Date: TBD';
      }
      return drawDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Draw Date: TBD';
    }
  };

  const stats = [
    {
      icon: <Calendar className="h-5 w-5" />,
      label: 'Draw Date',
      value: formatDrawDate(),
      color: 'text-blue-600'
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Total Slots',
      value: raffle.totalSlots.toLocaleString(),
      color: 'text-green-600'
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: 'Price per Slot',
      value: `₱${raffle.bettingCost.toLocaleString()}`,
      color: 'text-purple-600'
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      label: 'Prize Value',
      value: `₱${raffle.prize.toLocaleString()}`,
      color: 'text-orange-600'
    }
  ];

  return (
    <Card className="mb-8 shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsBar;
