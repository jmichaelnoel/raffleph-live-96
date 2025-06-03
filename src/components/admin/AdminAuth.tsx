
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthProps {
  onAuthenticated: (sessionToken: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get user's IP and user agent for audit logging
      const userAgent = navigator.userAgent;
      
      // Call the admin authentication function
      const { data, error } = await supabase.rpc('create_admin_session', {
        password: password,
        user_agent_str: userAgent
      });

      if (error) {
        console.error('Authentication error:', error);
        toast({
          title: "Error",
          description: "Authentication failed. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0 && data[0].success) {
        const sessionToken = data[0].session_token;
        localStorage.setItem('adminSessionToken', sessionToken);
        localStorage.setItem('adminSessionExpires', data[0].expires_at);
        
        onAuthenticated(sessionToken);
        
        toast({
          title: "Success",
          description: "Welcome to the admin dashboard!",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if already authenticated on component mount
  React.useEffect(() => {
    const checkExistingSession = async () => {
      const sessionToken = localStorage.getItem('adminSessionToken');
      const expiresAt = localStorage.getItem('adminSessionExpires');
      
      if (sessionToken && expiresAt && new Date(expiresAt) > new Date()) {
        // Validate session with server
        try {
          const { data } = await supabase.rpc('validate_admin_session', {
            session_token: sessionToken
          });
          
          if (data) {
            onAuthenticated(sessionToken);
          } else {
            // Clear invalid session
            localStorage.removeItem('adminSessionToken');
            localStorage.removeItem('adminSessionExpires');
          }
        } catch (error) {
          console.error('Session validation error:', error);
          localStorage.removeItem('adminSessionToken');
          localStorage.removeItem('adminSessionExpires');
        }
      }
    };

    checkExistingSession();
  }, [onAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Enter the admin password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>For demo purposes, password is: <code className="bg-gray-100 px-1 rounded">admin123</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
