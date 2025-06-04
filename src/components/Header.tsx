
import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <>
      <Navbar />
      {isHomepage && <HeroSection />}
    </>
  );
};

export default Header;
