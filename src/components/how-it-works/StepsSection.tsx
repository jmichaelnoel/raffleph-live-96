
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';
import { Search, FileText, Rocket } from 'lucide-react';

const StepsSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "🔎 Discover Raffles",
      description: "Browse through a growing list of active raffles across the Philippines. Use filters to quickly find raffles based on prize type (like cars, gadgets, or cash), ticket price, or raffle deadline. New raffles are added regularly — you might just spot your dream prize today!",
      screenshotUrl: "/lovable-uploads/944b4344-fd08-4ca8-8bc7-46689550d7a2.png"
    },
    {
      icon: FileText,
      title: "📄 View Raffle Details", 
      description: "Click on a raffle to see everything you need to know: High-quality prize photos, how much per entry, the draw date, and how the winner will be announced. You'll also see links to the organizer's page so you can do a quick background check.",
      screenshotUrl: "/lovable-uploads/dce113d7-0d2e-4bd8-af66-23912112a0a3.png"
    },
    {
      icon: Rocket,
      title: "🚀 Join the Raffle",
      description: "Once you're ready, hit the 'Join Now' button — this takes you directly to the organizer's Messenger, Facebook group, or their preferred channel. You'll complete your payment or reservation directly with them. We don't handle transactions — you deal straight with the organizer.",
      screenshotUrl: "/lovable-uploads/ce2e60ac-491a-4c59-9ff0-2606b9d5fe64.png"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <GradientText>Step-by-Step Guide</GradientText> 🪄
          </h2>
          <p className="text-lg text-gray-600">Follow these simple steps to start winning!</p>
        </div>
        
        <div className="space-y-16 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <Card 
                key={index}
                className="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 backdrop-blur-sm border-2 border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-xl card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-2 right-2 text-lg animate-sparkle">✨</div>
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${isEven ? 'lg:grid-flow-col' : ''}`}>
                    {/* Content Section */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${isEven ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4 animate-pulse">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge className="bg-ph-yellow text-ph-blue px-3 py-1 text-sm font-bold">
                          Step {index + 1}
                        </Badge>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Screenshot Section */}
                    <div className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-black ${isEven ? 'lg:order-1' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                      <div className="relative p-8 flex items-center justify-center min-h-[400px]">
                        <img 
                          src={step.screenshotUrl} 
                          alt={`Step ${index + 1} screenshot`}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/20"
                        />
                      </div>
                      <div className="absolute bottom-4 right-4 text-2xl animate-bounce">
                        {index === 0 ? '🔍' : index === 1 ? '📋' : '🎯'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
