import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === '/';

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
    <header className="bg-white shadow-sm border-b border-gray-100"> 
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl lg:text-3xl font-bold group flex items-center">
              <span className="text-ph-red">Raffle</span>
              <span className="text-ph-blue group-hover:animate-bounce">PH</span>
              <span className="text-xs lg:text-sm font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.6rem', lineHeight: '2.4rem', letterSpacing: '0.02em' }}>.com</span>
            </h1>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => navigate('/how-it-works')}
              variant="outline"
              className="hidden md:flex rounded-full border-2 border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 font-medium px-6 py-2 transition-all duration-300 hover:scale-105 transform bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50"
            >
              How It Works
            </Button>
            <Button 
              onClick={handleBrowseRaffles}
              className="rounded-full text-white font-bold px-6 md:px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform text-sm md:text-base"
              style={{
                background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
              }}
            >
              🎯 Browse Raffles
            </Button>
            <Button 
              onClick={() => navigate('/submit-raffle')}
              className="rounded-full text-white font-medium px-4 md:px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform text-sm md:text-base" 
              style={{
                background: 'linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)'
              }}
            >
              🎁 Submit Raffle
            </Button>
          </div>
        </div>

        {/* Hero Section - Only show on homepage */}
        {isHomepage && (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mt-8">
            <div className="w-full lg:w-2/3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 animate-fade-in text-center lg:text-left">
                Join a <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent">Raffle</span>. Change Your <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Life</span>. 
                <span className="inline-block ml-2 animate-bounce delay-300">👑</span>
              </h2>
              
              <div className="text-lg lg:text-xl text-gray-600 max-w-2xl mb-5 lg:mb-6 animate-fade-in delay-1 text-center lg:text-left">
                <p className="mb-2">
                  Browse top online raffles and get a chance to win <span className="text-blue-600 font-semibold">Cash Prizes</span>!
                </p>
                <p>
                  Join for as low as ₱20. 
                  <span className="inline-block ml-1 animate-bounce delay-700">🎯</span>
                  <span className="inline-block ml-1 animate-pulse delay-1000">💰</span>
                </p>
              </div>
            </div>
            
            <FeaturedRaffleCard />
          </div>
        )}
      </div>
    </header>
  );
};

// Create a separate component for the featured raffle card that uses real data
const FeaturedRaffleCard = () => {
  const [featuredRaffle, setFeaturedRaffle] = React.useState(null);

  React.useEffect(() => {
    const fetchFeaturedRaffle = async () => {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data, error } = await supabase
          .from('approved_raffles')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setFeaturedRaffle(data[0]);
        }
      } catch (error) {
        console.error('Error fetching featured raffle:', error);
      }
    };

    fetchFeaturedRaffle();
  }, []);

  if (!featuredRaffle) {
    return (
      <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg animate-fade-in delay-3 hidden md:block relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-purple-100/50 backdrop-blur-sm">
        <div className="relative z-10 p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleJoinClick = () => {
    window.open(featuredRaffle.external_join_url, '_blank');
  };

  return (
    <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg animate-fade-in delay-3 hidden md:block relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-purple-100/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
      <div className="absolute top-2 right-2 text-2xl animate-spin-slow">✨</div>
      <div className="absolute bottom-2 left-2 text-xl animate-bounce delay-700">🏆</div>
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="bg-ph-red hover:bg-ph-red/90 text-white px-3 py-1 rounded-full text-xs mr-2 animate-pulse">🎁 Featured</span>
            <span className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs animate-bounce delay-200">🔥 Trending</span>
          </div>
          <span className="text-sm text-gray-600 font-medium">📍 {featuredRaffle.location}</span>
        </div>
        <h3 className="text-xl font-bold mb-1 text-gray-800 line-clamp-1">🎊 {featuredRaffle.title}</h3>
        <p className="text-xs text-gray-500 mb-3">From: {featuredRaffle.organization} ⭐</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{featuredRaffle.description}</p>
        <div className="grid grid-cols-3 gap-2 text-sm mb-4 text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
            <span className="block text-gray-600 text-xs">🏆 Prize</span>
            <span className="font-bold text-lg text-gray-800">₱{Number(featuredRaffle.prize).toLocaleString()}</span>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
            <span className="block text-gray-600 text-xs">🎯 Odds</span>
            <span className="font-bold text-lg text-gray-800">{(Number(featuredRaffle.winning_percentage) * 100).toFixed(2)}%</span>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-2 hover:scale-105 transition-transform duration-200">
            <span className="block text-gray-600 text-xs">💵 Cost</span>
            <span className="font-bold text-lg text-gray-800">₱{Number(featuredRaffle.betting_cost).toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={handleJoinClick}
          className="w-full bg-gradient-to-r from-ph-yellow to-orange-400 text-ph-blue py-2.5 px-4 rounded-full font-bold transition-all hover:shadow-lg text-base hover:animate-button-hover-pop transform hover:scale-105"
        >
          🎟 Join Raffle Now ⚡
        </button>
      </div>
    </div>
  );
};

export default Header;
