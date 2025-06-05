
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3 flex items-center justify-center gap-3">
            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent">Raffle</span>
            <span className="bg-gradient-to-r from-white via-blue-100 to-gray-200 bg-clip-text text-transparent">PH</span>
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            The ultimate destination for online raffles in the Philippines! 🎊
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <button 
            onClick={handleBrowseRaffles}
            className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-pink-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🏠</span>
            Browse Raffles
          </button>
          
          <Link to="/how-it-works" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-yellow-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">❓</span>
            How It Works
          </Link>
          
          <Link to="/submit-raffle" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-green-400 decoration-2 underline-offset-4 flex flex-col items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📝</span>
            Submit Raffle
          </Link>
        </div>
        
        <div className="border-t border-purple-700/40 pt-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-blue-200">
            <span>&copy; 2025 RafflePH. All rights reserved.</span>
            <span className="text-pink-300 font-semibold">Made with ❤️ in Cebu, Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
