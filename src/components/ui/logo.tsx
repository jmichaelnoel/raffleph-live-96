
import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", width = 120, height = 40 }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span 
        className="font-bold text-2xl bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent"
        style={{ fontSize: `${height * 0.6}px` }}
      >
        Raffle
      </span>
      <span 
        className="font-bold text-2xl bg-gradient-to-r from-white via-blue-100 to-gray-200 bg-clip-text text-transparent ml-1"
        style={{ fontSize: `${height * 0.6}px` }}
      >
        PH
      </span>
    </div>
  );
};

export default Logo;
