import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Eye, Check, X, Users, Clock, CheckCircle } from 'lucide-react';
import AdminSubmissionModal from '@/components/admin/AdminSubmissionModal';
import AdminAuth from '@/components/admin/AdminAuth';

interface Submission {
  id: string;
  title: string;
  description: string;
  prize: number;
  category: string;
  betting_cost: number | null;
  organization: string | null;
  location: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  bundle_pricing: any;
  draw_date: string | null;
  organizer_facebook_url: string | null;
  raffle_details_url: string | null;
  slot_inquiry_url: string | null;
  entries_left: number | null;
  convertible_to_cash: boolean | null;
  image_url: string | null;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('raffle_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Error",
          description: "Failed to fetch submissions",
          variant: "destructive",
        });
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated, statusFilter]);

  const handleApproveSubmission = async (submission: Submission) => {
    if (isApproving === submission.id) return;
    
    setIsApproving(submission.id);
    
    try {
      console.log('Starting approval process for submission:', submission.id);

      // Check if already approved
      const { data: existingApprovals } = await supabase
        .from('approved_raffles')
        .select('id')
        .eq('submission_id', submission.id);

      if (existingApprovals && existingApprovals.length > 0) {
        toast({
          title: "Already Approved",
          description: "This submission has already been approved",
          variant: "destructive",
        });
        setIsApproving(null);
        return;
      }

      // Calculate end date (30 days from now)
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      // Create approved raffle entry
      const { error: approveError } = await supabase
        .from('approved_raffles')
        .insert({
          submission_id: submission.id,
          title: submission.title,
          description: submission.description,
          category: submission.category,
          prize: submission.prize,
          betting_cost: submission.betting_cost || 20,
          winning_percentage: 0.001,
          end_date: endDate.toISOString(),
          organization: submission.organization || 'Unknown',
          location: submission.location || 'Philippines',
          external_join_url: submission.raffle_details_url || '#',
          organizer_facebook_url: submission.organizer_facebook_url || '#',
          entries_left: submission.entries_left,
          convertible_to_cash: submission.convertible_to_cash || false,
          featured: false,
          image_url: submission.image_url || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'
        });

      if (approveError) {
        console.error('Error creating approved raffle:', approveError);
        throw approveError;
      }

      // Update submission status
      const { error: updateError } = await supabase
        .from('raffle_submissions')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', submission.id);

      if (updateError) {
        console.error('Error updating submission status:', updateError);
        throw updateError;
      }

      toast({
        title: "Success",
        description: "Raffle approved and published successfully!",
      });

      // Close modal and refresh data
      setSelectedSubmission(null);
      await fetchSubmissions(); // Simple refetch to ensure UI is updated
      
    } catch (error) {
      console.error('Error approving submission:', error);
      toast({
        title: "Error",
        description: "Failed to approve submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApproving(null);
    }
  };

  const handleRejectSubmission = async (submission: Submission) => {
    try {
      const { error } = await supabase
        .from('raffle_submissions')
        .update({
          status: 'rejected'
        })
        .eq('id', submission.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Submission rejected",
      });

      setSelectedSubmission(null);
      await fetchSubmissions(); // Simple refetch to ensure UI is updated
    } catch (error) {
      console.error('Error rejecting submission:', error);
      toast({
        title: "Error",
        description: "Failed to reject submission",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const filteredSubmissions = submissions.filter(submission =>
    submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    total: submissions.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage raffle submissions and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Raffles</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>Review and manage raffle submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    onClick={() => setStatusFilter(status)}
                    size="sm"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Submissions List */}
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading submissions...</p>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No submissions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{submission.title}</h3>
                          <Badge variant={
                            submission.status === 'pending' ? 'secondary' :
                            submission.status === 'approved' ? 'default' : 'destructive'
                          }>
                            {submission.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{submission.description.substring(0, 100)}...</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>Prize: ₱{submission.prize?.toLocaleString()}</span>
                          <span>Category: {submission.category}</span>
                          <span>Organization: {submission.organization || 'N/A'}</span>
                          <span>Submitted: {new Date(submission.submitted_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        {submission.status === 'pending' && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleApproveSubmission(submission)}
                              disabled={isApproving === submission.id}
                            >
                              {isApproving === submission.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                              ) : (
                                <Check className="h-4 w-4 mr-1" />
                              )}
                              {isApproving === submission.id ? 'Approving...' : 'Approve'}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRejectSubmission(submission)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submission Modal */}
      {selectedSubmission && (
        <AdminSubmissionModal
          submission={selectedSubmission}
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onApprove={() => handleApproveSubmission(selectedSubmission)}
          onReject={() => handleRejectSubmission(selectedSubmission)}
          isApproving={isApproving === selectedSubmission.id}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
