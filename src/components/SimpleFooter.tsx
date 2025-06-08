
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/ui/logo';
import { scrollToTop } from '@/utils/navigationUtils';

const SimpleFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBrowseRaffles = () => {
    if (location.pathname === '/') {
      const rafflesSection = document.querySelector('main');
      if (rafflesSection) {
        rafflesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const rafflesSection = document.querySelector('main');
        if (rafflesSection) {
          rafflesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo width={180} height={60} />
          </div>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            The ultimate destination for online raffles in the Philippines! 🎊
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
          <button 
            onClick={handleBrowseRaffles}
            className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-pink-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🏠</span>
            Browse Raffles
          </button>
          
          <button 
            onClick={() => handleNavigation('/how-it-works')}
            className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-yellow-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">❓</span>
            How It Works
          </button>
          
          <button 
            onClick={() => handleNavigation('/submit-raffle')}
            className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-green-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📝</span>
            Submit Raffle
          </button>
        </div>
        
        <div className="border-t border-purple-700/40 pt-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-blue-200">
            <span>&copy; 2025 RafflePH.com. All rights reserved.</span>
            <span className="text-pink-300 font-semibold">Made with ❤️ in Cebu, Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
