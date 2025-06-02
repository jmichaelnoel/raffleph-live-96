
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleBrowseRaffles = () => {
    if (location.pathname === '/') {
      // If on homepage, scroll to raffles section
      const rafflesSection = document.querySelector('main');
      if (rafflesSection) {
        rafflesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to homepage
      navigate('/');
      // After navigation, scroll to raffles section
      setTimeout(() => {
        const rafflesSection = document.querySelector('main');
        if (rafflesSection) {
          rafflesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <span className="text-ph-red">Raffle</span>
            <span className="text-ph-blue">PH</span>
            <span className="text-ph-yellow">.</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Button
            onClick={() => handleNavigation('/how-it-works')}
            variant="outline"
            className="rounded-full border-2 border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 font-medium px-6 py-2 transition-all duration-300 bg-white hover:bg-gray-50"
          >
            How It Works
          </Button>
          <Button 
            onClick={handleBrowseRaffles}
            className="rounded-full text-white font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            style={{
              background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
            }}
          >
            🎯 Browse Raffles
          </Button>
          <Button 
            onClick={() => handleNavigation('/submit-raffle')}
            className="rounded-full text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            style={{
              background: 'linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)'
            }}
          >
            🎁 Submit Raffle
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
