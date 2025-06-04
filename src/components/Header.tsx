
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserCircle, LogIn } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="hidden md:block">
            <h1 
              className="text-xl font-bold cursor-pointer group flex items-center" 
              onClick={() => navigate('/')}
            >
              <span className="text-ph-red">Raffle</span>
              <span className="text-ph-blue group-hover:animate-bounce">PH</span>
              <span className="text-xs font-sans font-bold text-gray-600 tracking-tight transform rotate-90 origin-center whitespace-nowrap -ml-1 mr-0.5" style={{ fontSize: '0.5rem', lineHeight: '1.8rem', letterSpacing: '0.02em' }}>.com</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <UserCircle className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{user.email}</span>
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
