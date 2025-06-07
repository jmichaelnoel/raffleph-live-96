
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Eye, Clock, DollarSign, Users } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface PendingRaffle {
  id: string;
  title: string;
  organization_name: string;
  grand_prize: string;
  grand_prize_value: number;
  category: string;
  cost_per_slot: number;
  total_slots: number;
  draw_date: string;
  raffle_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingRaffles, setPendingRaffles] = useState<PendingRaffle[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRaffles: 0,
    pendingRaffles: 0,
    approvedRaffles: 0,
    totalValue: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if already authenticated in session
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchPendingRaffles();
      fetchStats();
    }
  }, []);

  const handleLogin = () => {
    if (password === 'john123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      fetchPendingRaffles();
      fetchStats();
      toast({
        title: "Welcome, Admin!",
        description: "Successfully logged into admin dashboard."
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
    setPendingRaffles([]);
  };

  const fetchPendingRaffles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('raffles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingRaffles(data || []);
    } catch (error) {
      console.error('Error fetching raffles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch raffles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('raffles')
        .select('raffle_status, grand_prize_value');

      if (error) throw error;

      const totalRaffles = data.length;
      const pendingRaffles = data.filter(r => r.raffle_status === 'pending').length;
      const approvedRaffles = data.filter(r => r.raffle_status === 'approved').length;
      const totalValue = data.reduce((sum, r) => sum + (r.grand_prize_value || 0), 0);

      setStats({
        totalRaffles,
        pendingRaffles,
        approvedRaffles,
        totalValue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleApproval = async (raffleId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('raffles')
        .update({ 
          approved,
          raffle_status: approved ? 'approved' : 'rejected'
        })
        .eq('id', raffleId);

      if (error) throw error;

      toast({
        title: approved ? "Raffle Approved" : "Raffle Rejected",
        description: `Raffle has been ${approved ? 'approved' : 'rejected'} successfully.`
      });

      fetchPendingRaffles();
      fetchStats();
    } catch (error) {
      console.error('Error updating raffle:', error);
      toast({
        title: "Error",
        description: "Failed to update raffle status",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <SEOHead title="Admin Login - RafflePH" />
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Enter password to access admin panel</p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead title="Admin Dashboard - RafflePH" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raffles</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRaffles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRaffles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedRaffles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prize Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Raffles Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Raffles</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading raffles...</div>
            ) : pendingRaffles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No raffles submitted yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Title</th>
                      <th className="text-left py-3 px-2">Organization</th>
                      <th className="text-left py-3 px-2">Prize</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRaffles.map((raffle) => (
                      <tr key={raffle.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium">{raffle.title}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(raffle.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">{raffle.organization_name}</td>
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium">{raffle.grand_prize}</div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(raffle.grand_prize_value)}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline">{raffle.category}</Badge>
                        </td>
                        <td className="py-3 px-2">
                          {getStatusBadge(raffle.raffle_status)}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            {raffle.raffle_status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproval(raffle.id, true)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproval(raffle.id, false)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {raffle.raffle_status === 'approved' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleApproval(raffle.id, false)}
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            )}
                            {raffle.raffle_status === 'rejected' && (
                              <Button
                                size="sm"
                                onClick={() => handleApproval(raffle.id, true)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
