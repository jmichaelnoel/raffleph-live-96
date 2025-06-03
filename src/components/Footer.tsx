
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Trophy, Target, Zap, Home, Star, Plus, HelpCircle, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 mt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-float-slow">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
        </div>
        <div className="absolute top-20 right-16 animate-bounce-slow delay-500">
          <Sparkles className="h-6 w-6 text-pink-400 opacity-80" />
        </div>
        <div className="absolute bottom-16 left-20 animate-float-gentle delay-700">
          <Trophy className="h-7 w-7 text-yellow-300 opacity-70" />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse delay-300">
          <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 animate-float-gentle delay-200">
          <Target className="h-5 w-5 text-blue-300 opacity-50" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float-slow delay-800">
          <Zap className="h-6 w-6 text-orange-300 opacity-60" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 flex items-center justify-center gap-4">
            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-500 bg-clip-text text-transparent">Raffle</span>
            <span className="bg-gradient-to-r from-white via-blue-100 to-gray-200 bg-clip-text text-transparent">PH</span>
            <div className="animate-spin-slow">
              <Sparkles className="h-8 w-8 text-pink-400" />
            </div>
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            🎊 The ultimate destination for online raffles in the Philippines! 
            <br />
            <span className="text-yellow-300 font-semibold">Find incredible prizes and win big!</span> 🏆✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-pink-500 to-red-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">🏆 Premium Prizes</h3>
            <p className="text-blue-200 leading-relaxed">Discover crazy rewards across the Philippines</p>
          </div>
          
          <div className="text-center group transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">🎯 Smart Filters</h3>
            <p className="text-blue-200 leading-relaxed">Find perfect raffles with our intelligent filtering system</p>
          </div>
          
          <div className="text-center group transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">⚡ Updated Daily</h3>
            <p className="text-blue-200 leading-relaxed">Real-time raffle updates and winning statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="text-center">
            <Link to="/" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-pink-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
              <Home className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              Home
            </Link>
          </div>
          <div className="text-center">
            <Link to="/?featured=true" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-yellow-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
              <Star className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              Featured
            </Link>
          </div>
          <div className="text-center">
            <Link to="/submit-raffle" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-green-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
              <Plus className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              Submit Raffle
            </Link>
          </div>
          <div className="text-center">
            <Link to="/how-it-works" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-blue-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
              <HelpCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              How It Works
            </Link>
          </div>
          <div className="text-center">
            <a href="#faq" className="text-blue-200 hover:text-white transition-colors duration-300 text-lg font-medium hover:underline decoration-purple-400 decoration-2 underline-offset-4 flex flex-col items-center gap-3 group">
              <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              FAQ
            </a>
          </div>
        </div>
        
        <div className="border-t border-purple-700/40 pt-10 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-blue-200">
            <span className="text-lg">&copy; 2025 RafflePH. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <div className="animate-pulse">
                <Sparkles className="h-5 w-5 text-pink-400" />
              </div>
              <span className="text-pink-300 font-semibold text-lg">Made with ❤️ in Cebu, Philippines</span>
              <div className="animate-bounce">
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
