
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-ph-red via-ph-blue to-ph-yellow opacity-90"></div>
      <div className="absolute top-4 left-4 text-2xl animate-bounce text-white">🚀</div>
      <div className="absolute bottom-4 right-4 text-2xl animate-pulse text-white">📢</div>
      <div className="absolute top-1/2 left-1/4 text-xl animate-sparkle text-white">⭐</div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
            Organizing a Raffle? 📢
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in delay-150">
            Get your raffle in front of thousands! 🎯
          </p>
          <Button
            onClick={() => navigate('/submit-raffle')}
            className="rounded-full text-ph-blue bg-white font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 transform animate-fade-in delay-300 hover:animate-button-hover-pop"
          >
            🚀 Submit a Raffle
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="flex justify-center items-center gap-4 mt-8 animate-fade-in delay-500">
            <div className="text-2xl animate-bounce text-white">🎊</div>
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm backdrop-blur-sm">
              Free to List!
            </Badge>
            <div className="text-2xl animate-bounce delay-300 text-white">🏆</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
