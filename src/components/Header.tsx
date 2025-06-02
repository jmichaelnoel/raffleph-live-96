
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleBrowseRaffles = () => {
    if (window.location.pathname === '/') {
      // If on homepage, scroll to raffles section
      const rafflesSection = document.getElementById('raffles-section');
      if (rafflesSection) {
        rafflesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to homepage and then scroll
      navigate('/', { state: { scrollToRaffles: true } });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-purple-600">Raffle</span>
              <span className="text-pink-600">PH</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/how-it-works" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Button
              onClick={handleBrowseRaffles}
              className="px-6 py-2 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white"
              style={{
                background: 'linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
              }}
            >
              Browse Raffles
            </Button>
            <Link to="/submit-raffle">
              <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
                Submit Raffle
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Search Bar - Only show on homepage */}
        {window.location.pathname === '/' && (
          <div className="pb-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for raffles... (Try 'iPhone', 'Car', 'Cash')"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border-2 border-purple-200 focus:border-purple-400 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onBrowseRaffles={handleBrowseRaffles}
      />
    </header>
  );
};

export default Header;
