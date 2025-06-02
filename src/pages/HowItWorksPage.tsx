
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientText } from '@/components/ui/gradient-text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, FileText, Rocket, Megaphone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "🔎 Discover Raffles",
      description: "Browse through a growing list of active raffles across the Philippines. Use filters to quickly find raffles based on prize type (like cars, gadgets, or cash), ticket price, or raffle deadline. New raffles are added regularly — you might just spot your dream prize today!",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: FileText,
      title: "📄 View Raffle Details", 
      description: "Click on a raffle to see everything you need to know: High-quality prize photos, how much per entry, the draw date, and how the winner will be announced. You'll also see links to the organizer's page so you can do a quick background check.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Rocket,
      title: "🚀 Join the Raffle",
      description: "Once you're ready, hit the 'Join Now' button — this takes you directly to the organizer's Messenger, Facebook group, or their preferred channel. You'll complete your payment or reservation directly with them. We don't handle transactions — you deal straight with the organizer.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Megaphone,
      title: "📣 Submit Your Raffle",
      description: "Are you organizing a raffle? You can list it here for free! Just head to our Submit Raffle page and enter all the details: your prize, joining process, deadline, and Messenger/FB links. Once reviewed, we'll publish it and help you get more joiners.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const faqs = [
    {
      question: "How do I join a raffle?",
      answer: "Just click 'Join Now' on the raffle details — we'll redirect you to the organizer's channel."
    },
    {
      question: "Is using this site free?",
      answer: "Yes! You can explore and join raffles without any fees from us."
    },
    {
      question: "Do you organize the raffles?",
      answer: "No, we only list raffles from external organizers. Always check before joining."
    },
    {
      question: "How do I know if it's legit?",
      answer: "We show as much info as possible — but you should always verify on your own."
    },
    {
      question: "How can I post my own raffle?",
      answer: "Go to the Submit Raffle page, fill out the form, and we'll review it fast!"
    },
    {
      question: "Can I make an account?",
      answer: "Soon! You'll be able to log in, save raffles, and get alerts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <Header onSearchChange={() => {}} />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-4 right-4 text-2xl animate-sparkle">✨</div>
        <div className="absolute bottom-8 left-8 text-xl animate-float-gently">🎊</div>
        <div className="absolute top-1/2 right-1/4 text-lg animate-bounce delay-300">⭐</div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              How It <GradientText>Works</GradientText>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 animate-fade-in delay-150">
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
                  className="relative overflow-hidden bg-white/70 backdrop-blur-sm border-2 border-purple-100/50 hover:border-purple-200 transition-all duration-300 hover:shadow-xl card-hover animate-fade-in"
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
                      
                      {/* Image Section */}
                      <div className={`relative bg-gradient-to-br from-purple-100 to-pink-100 ${isEven ? 'lg:order-1' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                        <img 
                          src={step.image} 
                          alt={`Step ${index + 1} illustration`}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 text-2xl animate-bounce">
                          {index === 0 ? '🔍' : index === 1 ? '📋' : index === 2 ? '🎯' : '📢'}
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

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Frequently Asked <GradientText>Questions</GradientText> ❓
              </h2>
              <p className="text-lg text-gray-600">Get answers to common questions about joining raffles</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-100/50 p-8 shadow-lg">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-purple-100 rounded-lg px-6 bg-gradient-to-r from-white to-purple-50/30 hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-purple-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
