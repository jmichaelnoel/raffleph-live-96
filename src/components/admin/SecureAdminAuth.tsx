
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';

interface SecureAdminAuthProps {
  onAuthenticated: () => void;
}

const SecureAdminAuth: React.FC<SecureAdminAuthProps> = ({ onAuthenticated }) => {
  const { user, isAdmin, isLoading, checkAdminRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (user && !isLoading) {
        const hasAdminAccess = await checkAdminRole();
        if (hasAdminAccess) {
          onAuthenticated();
        }
      }
    };

    verifyAdmin();
  }, [user, isLoading, checkAdminRole, onAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Verifying access...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              You must be signed in with an admin account to access this area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/auth')} 
              className="w-full"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              Your account does not have admin privileges. Please contact an administrator if you believe this is an error.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
              variant="outline"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default SecureAdminAuth;
