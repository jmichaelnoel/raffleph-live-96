
import React, { useState, useEffect } from 'react';
import { useSupabaseRaffles } from '@/hooks/useSupabaseRaffles';
import { convertSupabaseRaffleToRaffle } from '@/utils/raffleConverter';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import RaffleDrawDateEditor from '@/components/admin/RaffleDrawDateEditor';

const AdminDashboard = () => {
  const { raffles: supabaseRaffles, loading, refetch } = useSupabaseRaffles();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Convert Supabase raffles to the format expected by components
  const raffles = supabaseRaffles.map(convertSupabaseRaffleToRaffle);

  const approveRaffle = async (raffleId: string) => {
    try {
      setProcessingId(raffleId);
      
      const { error } = await supabase
        .from('raffles')
        .update({ approved: true })
        .eq('id', raffleId);

      if (error) throw error;

      toast({
        title: "✅ Raffle Approved",
        description: "The raffle has been approved and is now live!",
      });

      refetch();
    } catch (error) {
      console.error('Error approving raffle:', error);
      toast({
        title: "❌ Error",
        description: "Failed to approve raffle",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const rejectRaffle = async (raffleId: string) => {
    try {
      setProcessingId(raffleId);
      
      const { error } = await supabase
        .from('raffles')
        .delete()
        .eq('id', raffleId);

      if (error) throw error;

      toast({
        title: "❌ Raffle Rejected",
        description: "The raffle has been rejected and removed.",
      });

      refetch();
    } catch (error) {
      console.error('Error rejecting raffle:', error);
      toast({
        title: "❌ Error",
        description: "Failed to reject raffle",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const pendingRaffles = supabaseRaffles.filter(r => !r.approved);
  const approvedRaffles = supabaseRaffles.filter(r => r.approved);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage raffle submissions and draw dates</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Pending ({pendingRaffles.length})</span>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Approved ({approvedRaffles.length})</span>
          </TabsTrigger>
          <TabsTrigger value="dates" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Draw Dates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingRaffles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No pending raffles to review</p>
                </CardContent>
              </Card>
            ) : (
              pendingRaffles.map((raffle) => (
                <Card key={raffle.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{raffle.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{raffle.organization_name}</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Prize Value:</span>
                          <p>₱{raffle.grand_prize_value.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Total Slots:</span>
                          <p>{raffle.total_slots.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Cost per Slot:</span>
                          <p>₱{raffle.cost_per_slot.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Draw Date:</span>
                          <p>{raffle.draw_date ? new Date(raffle.draw_date).toLocaleDateString() : 'TBD'}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => approveRaffle(raffle.id)}
                          disabled={processingId === raffle.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => rejectRaffle(raffle.id)}
                          disabled={processingId === raffle.id}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="space-y-4">
            {approvedRaffles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No approved raffles yet</p>
                </CardContent>
              </Card>
            ) : (
              approvedRaffles.map((raffle) => (
                <Card key={raffle.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{raffle.title}</h3>
                        <p className="text-gray-600">{raffle.organization_name}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          Prize: ₱{raffle.grand_prize_value.toLocaleString()} • 
                          Slots: {raffle.total_slots.toLocaleString()} • 
                          Cost: ₱{raffle.cost_per_slot.toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✅ Approved
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="dates">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Draw Dates</CardTitle>
                <p className="text-sm text-gray-600">
                  Update draw dates for approved raffles, especially those marked as TBD
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedRaffles.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No approved raffles to manage</p>
                  ) : (
                    approvedRaffles.map((raffle) => (
                      <RaffleDrawDateEditor
                        key={raffle.id}
                        raffleId={raffle.id}
                        currentDate={raffle.draw_date}
                        title={raffle.title}
                        onUpdate={refetch}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
