
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-blue-100/30"></div>
      
      {/* Floating animations */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce delay-100">✨</div>
      <div className="absolute top-20 right-20 text-3xl animate-float-gently delay-300">🎁</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-pulse delay-500">🚀</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-spin-slow">⭐</div>
      <div className="absolute top-1/2 left-1/4 text-2xl animate-bounce delay-700">💎</div>
      <div className="absolute top-1/3 right-1/3 text-2xl animate-float-gently delay-900">🎊</div>
      
      <div className="relative container mx-auto px-4 py-16 text-center">
        {/* FREE Promotion Banner */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Badge className="bg-gradient-to-r from-ph-yellow to-orange-500 text-black px-8 py-3 text-lg font-bold rounded-full animate-pulse shadow-2xl border-4 border-yellow-300">
              🔥 FREE SUBMISSIONS - BETA PERIOD! 🔥
            </Badge>
            <div className="absolute -top-2 -right-2 bg-ph-red text-white text-xs px-2 py-1 rounded-full animate-bounce">
              LIMITED TIME!
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-gray-800">
          Submit Your <GradientText>Epic Raffle</GradientText> 
          <span className="inline-block ml-3 animate-bounce delay-300">🎯</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in delay-1 text-gray-600">
          Ready to reach <span className="font-bold text-purple-600">thousands of excited participants</span>? 
          Submit your raffle today and watch the magic happen! 
          <span className="inline-block ml-2 animate-pulse delay-500">✨</span>
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-lg animate-fade-in delay-2">
          <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 backdrop-blur-sm border border-purple-200">
            <span className="mr-2">🚀</span>
            <span className="text-gray-700">Instant Exposure</span>
          </div>
          <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 backdrop-blur-sm border border-purple-200">
            <span className="mr-2">💰</span>
            <span className="text-gray-700">Zero Fees</span>
          </div>
          <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 backdrop-blur-sm border border-purple-200">
            <span className="mr-2">⚡</span>
            <span className="text-gray-700">24hr Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
