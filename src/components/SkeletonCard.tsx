
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const SkeletonCard: React.FC = () => {
  return (
    <Card className="overflow-hidden h-full flex flex-col rounded-2xl lg:rounded-3xl border-2 border-gray-100/50 shadow-md bg-white animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-40 lg:h-48 bg-gray-200 relative">
        <div className="absolute top-2 lg:top-3 right-2 lg:right-3 w-16 h-6 bg-gray-300 rounded-full"></div>
        <div className="absolute top-2 lg:top-3 left-2 lg:left-3 w-20 h-6 bg-gray-300 rounded-full"></div>
      </div>
      
      <CardContent className="pt-4 lg:pt-6 pb-0 flex-grow px-4 lg:px-6">
        {/* Title Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-3">
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 lg:pt-4 px-4 lg:px-6">
        <div className="w-full h-12 bg-gray-200 rounded-full"></div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
