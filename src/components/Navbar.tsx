
import React from 'react';
import { Button } from '@/components/ui/button';
import MobileNavigation from './MobileNavigation';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MobileNavigation />
            <div className="flex items-center ml-2 md:ml-0">
              <h1 className="text-2xl lg:text-3xl font-bold group cursor-pointer flex items-center" onClick={() => navigate('/')}>
                <span className="text-ph-red">Raffle</span>
                <span className="text-ph-blue">PH</span>
                <span className="text-xs lg:text-sm font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.6rem', lineHeight: '2.4rem', letterSpacing: '0.02em' }}>.com</span>
              </h1>
            </div>
          </div>
          
          {/* Desktop/Tablet Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={() => navigate('/how-it-works')}
              variant="outline"
              className="rounded-full border-2 border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 font-medium px-6 py-2 transition-all duration-300 hover:scale-105 transform bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50"
            >
              How It Works
            </Button>
            <Button 
              onClick={handleBrowseRaffles}
              className="rounded-full text-white font-bold px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform text-lg"
              style={{
                background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
              }}
            >
              Browse Raffles
            </Button>
            <Button 
              onClick={() => navigate('/submit-raffle')}
              className="rounded-full text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform" 
              style={{
                background: 'linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)'
              }}
            >
              Submit Raffle
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
