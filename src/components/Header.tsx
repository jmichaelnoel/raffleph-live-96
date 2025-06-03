
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { MobileNavigation } from './MobileNavigation';
import { UserCircle, LogIn, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNavigation />
            <div className="flex items-center ml-2 md:ml-0">
              <h1 className="text-2xl lg:text-3xl font-bold group cursor-pointer flex items-center" onClick={() => navigate('/')}>
                <span className="text-ph-red animate-pulse">Raffle</span>
                <span className="text-ph-blue group-hover:animate-bounce">PH</span>
                <span className="text-xs lg:text-sm font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.6rem', lineHeight: '2.4rem', letterSpacing: '0.02em' }}>.com</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <h1 className="text-2xl lg:text-3xl font-bold group cursor-pointer flex items-center" onClick={() => navigate('/')}>
              <span className="text-ph-red animate-pulse">Raffle</span>
              <span className="text-ph-blue group-hover:animate-bounce">PH</span>
              <span className="text-xs lg:text-sm font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.6rem', lineHeight: '2.4rem', letterSpacing: '0.02em' }}>.com</span>
            </h1>
            
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'} 
                onClick={() => navigate('/')}
                className="text-sm font-medium"
              >
                Home
              </Button>
              
              <Button 
                variant={isActive('/how-it-works') ? 'default' : 'ghost'} 
                onClick={() => navigate('/how-it-works')}
                className="text-sm font-medium"
              >
                How it Works
              </Button>
              
              <Button 
                variant={isActive('/submit-raffle') ? 'default' : 'ghost'} 
                onClick={() => navigate('/submit-raffle')}
                className="text-sm font-medium"
              >
                Submit Raffle
              </Button>

              {isAdmin && (
                <Button 
                  variant={isActive('/admin') ? 'default' : 'outline'} 
                  onClick={() => navigate('/admin')}
                  className="text-sm font-medium"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                  <Badge variant="secondary" className="ml-2">Admin</Badge>
                </Button>
              )}
            </nav>
          </div>
        </div>

        {/* Auth Controls */}
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <UserCircle className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{user.email}</span>
                {isAdmin && (
                  <Badge variant="outline" className="text-xs">Admin</Badge>
                )}
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="default" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
