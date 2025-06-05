
import React from 'react';
import { Raffle } from '@/data/raffles';
import { DollarSign, Percent, CalendarDays, BarChartBig, Users } from 'lucide-react';

interface StatsBarProps {
  raffle: Raffle;
}

const StatItem: React.FC<{ icon: React.ElementType; label: string; value: string | number; iconColor?: string }> = ({ icon: Icon, label, value, iconColor = "text-ph-blue" }) => (
  <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
    <Icon className={`h-8 w-8 mb-2 ${iconColor}`} />
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className="text-lg font-bold text-gray-800">{value}</span>
  </div>
);

const StatsBar: React.FC<StatsBarProps> = ({ raffle }) => {
  const daysLeft = Math.max(0, Math.ceil((new Date(raffle.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate win rate: 1/total slots with 3 decimals
  const totalSlots = raffle.totalSlots || raffle.entriesLeft || 1000;
  const winRate = ((1 / totalSlots) * 100).toFixed(3);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
      <StatItem icon={BarChartBig} label="Total Prize Value" value={`₱${raffle.prize.toLocaleString()}`} iconColor="text-ph-red" />
      <StatItem icon={DollarSign} label="Entry Cost" value={`₱${raffle.bettingCost.toLocaleString()}`} iconColor="text-green-500" />
      <StatItem icon={Percent} label="Win Rate" value={`${winRate}%`} iconColor="text-yellow-600" />
      <StatItem icon={CalendarDays} label="Days Left" value={daysLeft} iconColor="text-blue-500" />
      <StatItem icon={Users} label="Total Entries" value={totalSlots.toLocaleString()} iconColor="text-indigo-500" />
    </div>
  );
};

export default StatsBar;
