
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
import { useNavigate } from 'react-router-dom';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
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
          <button
            onClick={() => handleNavigation('/how-it-works')}
            className="text-lg font-medium text-gray-600 hover:text-ph-blue transition-colors py-2 text-left"
          >
            How It Works
          </button>
          <Button 
            onClick={() => handleNavigation('/submit-raffle')}
            className="mt-4 rounded-full w-full bg-gradient-to-r from-ph-red to-ph-blue text-white"
          >
            🎁 Submit Raffle
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
