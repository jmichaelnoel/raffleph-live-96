import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, Eye } from 'lucide-react';
import AdminSubmissionModal from '@/components/admin/AdminSubmissionModal';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminStats from '@/components/admin/AdminStats';
import AdminFilters from '@/components/admin/AdminFilters';
import SubmissionsList from '@/components/admin/SubmissionsList';
import { useSubmissions } from '@/hooks/useSubmissions';
import { useAdminStats } from '@/hooks/useAdminStats';

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
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const { submissions, isLoading, fetchSubmissions, setSubmissions } = useSubmissions(statusFilter);
  const { stats, isLoading: statsLoading, refreshStats } = useAdminStats();

  const handleApproveSubmission = async (submission: Submission) => {
    if (processingIds.has(submission.id)) return;
    
    setProcessingIds(prev => new Set(prev).add(submission.id));
    
    // Optimistic update
    setSubmissions(prev => prev.map(s => 
      s.id === submission.id 
        ? { ...s, status: 'approved' as const }
        : s
    ));

    toast({
      title: "Processing...",
      description: "Approving submission...",
    });
    
    try {
      // Check if already approved
      const { data: existingApprovals } = await supabase
        .from('approved_raffles')
        .select('id')
        .eq('submission_id', submission.id);

      if (existingApprovals && existingApprovals.length > 0) {
        // Revert optimistic update
        setSubmissions(prev => prev.map(s => 
          s.id === submission.id 
            ? { ...s, status: 'pending' as const }
            : s
        ));
        
        toast({
          title: "Already Approved",
          description: "This submission has already been approved",
          variant: "destructive",
        });
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

      // Show success toast with action to view approved raffles
      toast({
        title: "Success! 🎉",
        description: `"${submission.title}" has been approved and published!`,
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatusFilter('approved')}
            className="ml-auto"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View Approved
          </Button>
        ),
      });

      setSelectedSubmission(null);
      
      // Auto-switch to approved tab to show the newly approved item
      setTimeout(() => {
        setStatusFilter('approved');
      }, 1500);
      
    } catch (error) {
      console.error('Error approving submission:', error);
      
      // Revert optimistic update on error
      setSubmissions(prev => prev.map(s => 
        s.id === submission.id 
          ? { ...s, status: 'pending' as const }
          : s
      ));
      
      toast({
        title: "Error",
        description: "Failed to approve submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(submission.id);
        return newSet;
      });
    }
  };

  const handleRejectSubmission = async (submission: Submission) => {
    if (processingIds.has(submission.id)) return;
    
    setProcessingIds(prev => new Set(prev).add(submission.id));
    
    // Optimistic update
    setSubmissions(prev => prev.map(s => 
      s.id === submission.id 
        ? { ...s, status: 'rejected' as const }
        : s
    ));

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
        title: "Submission Rejected",
        description: `"${submission.title}" has been rejected`,
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatusFilter('rejected')}
            className="ml-auto"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Rejected
          </Button>
        ),
      });

      setSelectedSubmission(null);
      
    } catch (error) {
      console.error('Error rejecting submission:', error);
      
      // Revert optimistic update
      setSubmissions(prev => prev.map(s => 
        s.id === submission.id 
          ? { ...s, status: 'pending' as const }
          : s
      ));
      
      toast({
        title: "Error",
        description: "Failed to reject submission",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(submission.id);
        return newSet;
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'all') {
      return matchesSearch;
    }

    return matchesSearch && submission.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage raffle submissions and approvals</p>
            </div>
            <Button 
              onClick={() => {
                fetchSubmissions();
                refreshStats();
              }} 
              variant="outline" 
              size="sm"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <AdminStats stats={stats} isLoading={statsLoading} />

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>Review and manage raffle submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            {/* Submissions List */}
            <SubmissionsList
              submissions={filteredSubmissions}
              isLoading={isLoading}
              processingIds={processingIds}
              statusFilter={statusFilter}
              onReview={setSelectedSubmission}
              onApprove={handleApproveSubmission}
              onReject={handleRejectSubmission}
              onViewPending={() => setStatusFilter('pending')}
            />
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
          isApproving={processingIds.has(selectedSubmission.id)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
