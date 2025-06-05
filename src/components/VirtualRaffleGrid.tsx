
import React, { useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import RaffleCard from './RaffleCard';
import SkeletonCard from './SkeletonCard';
import { Raffle } from '@/data/raffles';
import { useInView } from 'react-intersection-observer';

interface VirtualRaffleGridProps {
  raffles: Raffle[];
  isLoading?: boolean;
  containerHeight?: number;
}

const VirtualRaffleGrid: React.FC<VirtualRaffleGridProps> = ({ 
  raffles, 
  isLoading = false, 
  containerHeight = 600 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Calculate grid dimensions
  const getColumnCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1280) return 3; // xl
      if (width >= 768) return 2;  // md
      return 1; // mobile
    }
    return 3;
  };

  const columnCount = getColumnCount();
  const rowCount = Math.ceil(raffles.length / columnCount);
  const itemWidth = typeof window !== 'undefined' ? (window.innerWidth - 80) / columnCount : 400;
  const itemHeight = 520;

  // Cell renderer for react-window
  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const raffleIndex = rowIndex * columnCount + columnIndex;
    const raffle = raffles[raffleIndex];

    if (!raffle) return null;

    return (
      <div style={style} className="p-2">
        <div className="animate-slide-up" style={{ animationDelay: `${raffleIndex * 100}ms` }}>
          <RaffleCard raffle={raffle} />
        </div>
      </div>
    );
  };

  // Skeleton loading grid
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (raffles.length === 0) {
    return (
      <div className="text-center py-12 lg:py-16 bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-lg">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">No raffles found</h3>
        <p className="text-gray-600 text-sm lg:text-base">
          Try adjusting your filters or search query to find more raffles.
        </p>
      </div>
    );
  }

  // Use virtual scrolling for large lists
  if (raffles.length > 50) {
    return (
      <div ref={ref} className="w-full">
        {inView && (
          <Grid
            columnCount={columnCount}
            columnWidth={itemWidth}
            height={containerHeight}
            rowCount={rowCount}
            rowHeight={itemHeight}
            width="100%"
            className="scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100"
          >
            {Cell}
          </Grid>
        )}
      </div>
    );
  }

  // Regular grid for smaller lists
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
      {raffles.map((raffle, index) => (
        <div key={raffle.id} className={`animate-slide-up ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}>
          <RaffleCard raffle={raffle} />
        </div>
      ))}
    </div>
  );
};

export default VirtualRaffleGrid;
