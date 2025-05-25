
import React, { useState, useEffect } from 'react';

const defaultCategories = [
  "Cash Prizes", 
  "Latest Gadgets", 
  "Dream Vacations", 
  "Luxury Cars", 
  "Unique Experiences"
];

interface AnimatedCategoryTextProps {
  categories?: string[];
  interval?: number;
}

const AnimatedCategoryText: React.FC<AnimatedCategoryTextProps> = ({ 
  categories = defaultCategories, 
  interval = 2500 // Adjusted interval for a slightly faster change
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, interval);
    return () => clearInterval(timer);
  }, [categories, interval]);

  return (
    <span 
      key={currentIndex} 
      className="inline-block animate-fade-in text-ph-blue font-semibold px-1" // Added animate-fade-in from index.css
    >
      {categories[currentIndex]}
    </span>
  );
};

export default AnimatedCategoryText;
