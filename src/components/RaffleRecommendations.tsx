
import React from 'react';
import { Raffle } from '@/data/raffles';
import RaffleCard from './RaffleCard';
import { Sparkles, Clock, Eye } from 'lucide-react';
import useLocalStorageState from 'use-local-storage-state';

interface RaffleRecommendationsProps {
  raffles: Raffle[];
  currentRaffle?: Raffle;
  className?: string;
}

const RaffleRecommendations: React.FC<RaffleRecommendationsProps> = ({ 
  raffles, 
  currentRaffle,
  className = "" 
}) => {
  const [recentlyViewed] = useLocalStorageState<string[]>('recently-viewed', {
    defaultValue: []
  });

  // Get similar raffles based on category and prize range
  const getSimilarRaffles = (raffle: Raffle, count: number = 3) => {
    return raffles
      .filter(r => r.id !== raffle.id)
      .filter(r => 
        r.category === raffle.category || 
        Math.abs(r.prize - raffle.prize) / raffle.prize < 0.5
      )
      .sort((a, b) => {
        // Prioritize same category
        const aScore = a.category === raffle.category ? 1 : 0;
        const bScore = b.category === raffle.category ? 1 : 0;
        if (aScore !== bScore) return bScore - aScore;
        
        // Then by prize similarity
        const aDiff = Math.abs(a.prize - raffle.prize);
        const bDiff = Math.abs(b.prize - raffle.prize);
        return aDiff - bDiff;
      })
      .slice(0, count);
  };

  // Get ending soon raffles
  const getEndingSoonRaffles = (count: number = 3) => {
    const now = new Date();
    return raffles
      .filter(r => !currentRaffle || r.id !== currentRaffle.id)
      .map(raffle => ({
        ...raffle,
        daysLeft: Math.max(0, Math.ceil((new Date(raffle.endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
      }))
      .filter(r => r.daysLeft <= 7 && r.daysLeft > 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, count);
  };

  // Get recently viewed raffles
  const getRecentlyViewedRaffles = (count: number = 3) => {
    return recentlyViewed
      .map(id => raffles.find(r => r.id === id))
      .filter((r): r is Raffle => r !== undefined)
      .filter(r => !currentRaffle || r.id !== currentRaffle.id)
      .slice(0, count);
  };

  const RecommendationSection = ({ 
    title, 
    icon: Icon, 
    raffles: sectionRaffles, 
    gradient 
  }: {
    title: string;
    icon: any;
    raffles: Raffle[];
    gradient: string;
  }) => {
    if (sectionRaffles.length === 0) return null;

    return (
      <div className="mb-8">
        <div className={`flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r ${gradient}`}>
          <Icon className="h-5 w-5 text-white" />
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionRaffles.map((raffle, index) => (
            <div key={raffle.id} className={`animate-slide-up delay-${index + 1}`}>
              <RaffleCard raffle={raffle} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const similarRaffles = currentRaffle ? getSimilarRaffles(currentRaffle) : [];
  const endingSoonRaffles = getEndingSoonRaffles();
  const recentlyViewedRaffles = getRecentlyViewedRaffles();

  return (
    <div className={className}>
      {currentRaffle && (
        <RecommendationSection
          title="Similar Raffles You Might Like"
          icon={Sparkles}
          raffles={similarRaffles}
          gradient="from-purple-500 to-pink-500"
        />
      )}

      <RecommendationSection
        title="Ending Soon - Don't Miss Out!"
        icon={Clock}
        raffles={endingSoonRaffles}
        gradient="from-red-500 to-orange-500"
      />

      {recentlyViewedRaffles.length > 0 && (
        <RecommendationSection
          title="Recently Viewed"
          icon={Eye}
          raffles={recentlyViewedRaffles}
          gradient="from-green-500 to-teal-500"
        />
      )}
    </div>
  );
};

export default RaffleRecommendations;
