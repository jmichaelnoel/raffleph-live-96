
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simple password check - in production, this should be more secure
  const ADMIN_PASSWORD = 'admin123'; // This should be in environment variables

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthenticated', 'true');
      onAuthenticated();
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

    setIsLoading(false);
  };

  // Check if already authenticated
  React.useEffect(() => {
    if (sessionStorage.getItem('adminAuthenticated') === 'true') {
      onAuthenticated();
    }
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
