
import React from 'react';
import { Raffle } from '@/data/raffles';
import { DollarSign, Percent, CalendarDays, MapPin, BarChartBig } from 'lucide-react';

interface StatsBarProps {
  raffle: Raffle;
}

const StatItem: React.FC<{ icon: React.ElementType; label: string; value: string | number; iconColor?: string }> = ({ icon: Icon, label, value, iconColor = "text-ph-blue" }) => (
  <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg shadow-sm">
    <Icon className={`h-7 w-7 mb-1.5 ${iconColor}`} />
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-md font-semibold text-gray-800">{value}</span>
  </div>
);

const StatsBar: React.FC<StatsBarProps> = ({ raffle }) => {
  const daysLeft = Math.max(0, Math.ceil((new Date(raffle.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-8">
      <StatItem icon={BarChartBig} label="Total Prize Value" value={`₱${raffle.prize.toLocaleString()}`} iconColor="text-ph-red" />
      <StatItem icon={DollarSign} label="Entry Cost" value={`₱${raffle.bettingCost.toLocaleString()}`} iconColor="text-green-500" />
      <StatItem icon={Percent} label="Win Rate" value={`${(raffle.winningPercentage * 100).toFixed(3)}%`} iconColor="text-yellow-600" />
      <StatItem icon={CalendarDays} label="Days Left" value={daysLeft} />
      <StatItem icon={MapPin} label="Location" value={raffle.location} />
    </div>
  );
};

export default StatsBar;
