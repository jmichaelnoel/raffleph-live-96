
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Eye, Clock } from 'lucide-react';
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
    approvedRaffles: 0
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
        .select('raffle_status');

      if (error) throw error;

      const totalRaffles = data.length;
      const pendingRaffles = data.filter(r => r.raffle_status === 'pending').length;
      const approvedRaffles = data.filter(r => r.raffle_status === 'approved').length;

      setStats({
        totalRaffles,
        pendingRaffles,
        approvedRaffles
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
        return <Badge variant="outline" className="bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-gradient-to-r from-red-100 to-rose-100">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <SEOHead title="Admin Login - RafflePH" />
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Enter password to access admin panel</p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="border-2 border-purple-200 focus:border-purple-400 rounded-xl"
            />
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <SEOHead title="Admin Dashboard - RafflePH" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍💼</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Raffles</CardTitle>
              <Eye className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stats.totalRaffles}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {stats.pendingRaffles}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Approved</CardTitle>
              <Check className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {stats.approvedRaffles}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Raffles Table */}
        <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
            <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎯 All Raffles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-2xl mb-2">⏳</div>
                <div className="text-gray-600">Loading raffles...</div>
              </div>
            ) : pendingRaffles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📭</div>
                <div className="text-gray-500">No raffles submitted yet</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Title</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Organization</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Prize</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRaffles.map((raffle, index) => (
                      <tr 
                        key={raffle.id} 
                        className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-800">{raffle.title}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(raffle.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{raffle.organization_name}</td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-800">{raffle.grand_prize}</div>
                            <div className="text-sm text-green-600 font-semibold">
                              {formatCurrency(raffle.grand_prize_value)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            {raffle.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(raffle.raffle_status)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            {raffle.raffle_status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproval(raffle.id, true)}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproval(raffle.id, false)}
                                  className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 rounded-lg"
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
                                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 rounded-lg"
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            )}
                            {raffle.raffle_status === 'rejected' && (
                              <Button
                                size="sm"
                                onClick={() => handleApproval(raffle.id, true)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg"
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
