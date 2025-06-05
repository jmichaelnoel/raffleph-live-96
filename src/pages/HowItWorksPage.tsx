
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, FileText, Rocket, ArrowRight, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SimpleFooter from '@/components/SimpleFooter';

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

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

  const faqs = [
    {
      question: "Do I pay here?",
      answer: "No, RafflePH is a directory. Payments are made directly to the raffle organizer through their specified payment channels. We do not handle any transactions."
    },
    {
      question: "Can I buy multiple entries?",
      answer: "This depends on the specific raffle's mechanics set by the organizer. Please check the 'Raffle Mechanics' section or the organizer's official page for details."
    },
    {
      question: "How will I know if I win?",
      answer: "Winners are typically announced by the organizer on their specified drawing date and platform (e.g., Facebook Live, official website). You will also be contacted directly by the organizer."
    },
    {
      question: "How do I join this raffle?",
      answer: "Click the 'Join Raffle Now' button to go to the official raffle post, or use the 'Buy Slots via Messenger' button to contact the organizer directly."
    },
    {
      question: "Is this raffle legitimate?",
      answer: "All raffles listed on RafflePH go through our verification process. Look for the verification badges and always verify the organizer's official social media presence."
    },
    {
      question: "How do I claim my prize if I win?",
      answer: "Prize claiming procedures are outlined by each organizer. Winners are contacted directly with specific instructions for prize collection or delivery arrangements."
    },
    {
      question: "Can I get a refund if I change my mind?",
      answer: "Refund policies vary by organizer. Please contact the raffle organizer directly through their official channels to inquire about their specific refund policy."
    },
    {
      question: "Are there any additional fees?",
      answer: "RafflePH does not charge any fees. However, payment processing fees may apply depending on the organizer's chosen payment method. Check with the organizer for details."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute top-4 right-4 text-2xl animate-sparkle">✨</div>
        <div className="absolute bottom-8 left-8 text-xl animate-float-gently">🎊</div>
        <div className="absolute top-1/2 right-1/4 text-lg animate-bounce delay-300">⭐</div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in">
              How It <GradientText>Works</GradientText>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-6 animate-fade-in delay-150">
              Join exciting raffles in just a few taps 🎟️
            </p>
            <div className="flex justify-center items-center gap-4 animate-fade-in delay-300">
              <div className="text-2xl animate-bounce">🎲</div>
              <Badge className="bg-ph-red hover:bg-ph-red/90 text-white px-4 py-2 text-lg animate-pulse">
                Super Easy!
              </Badge>
              <div className="text-2xl animate-bounce delay-200">🏆</div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
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

      {/* Final CTA Section */}
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

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 flex items-center justify-center">
                <HelpCircle className="mr-3 h-8 w-8 text-ph-blue animate-pulse" /> 
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get quick answers to common questions about raffles, payments, and prizes. 
                Still have questions? Contact the organizer directly!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    value={`item-${index}`} 
                    key={index} 
                    className="bg-white rounded-xl border-2 border-gray-100 hover:border-ph-blue/30 transition-all duration-300 shadow-sm hover:shadow-md px-6 py-2"
                  >
                    <AccordionTrigger className="text-left hover:no-underline text-lg font-semibold py-6 text-gray-800 hover:text-ph-blue transition-colors group">
                      <div className="flex items-center">
                        <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">
                          {index === 0 ? '💳' : index === 1 ? '🎫' : index === 2 ? '🏆' : index === 3 ? '📱' : index === 4 ? '✅' : index === 5 ? '🎁' : index === 6 ? '💰' : '💡'}
                        </span>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 pb-6 leading-relaxed pl-12">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-ph-blue">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-ph-blue/10 to-purple-100/50 rounded-xl border border-ph-blue/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center">
                <span className="mr-2 text-2xl">💬</span>
                Still Have Questions?
              </h3>
              <p className="text-gray-600">
                Contact the raffle organizer directly through their official Facebook page or messenger link for personalized assistance!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <SimpleFooter />
    </div>
  );
};

export default HowItWorksPage;
