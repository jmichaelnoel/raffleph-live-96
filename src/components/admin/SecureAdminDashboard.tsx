
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAuditLog } from '@/hooks/useAuditLog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminSubmissionModal from './AdminSubmissionModal';
import { sanitizeInput, validateUrl, sanitizeUrl } from '@/utils/inputValidation';
import { Shield, Users, FileText, Activity, LogOut } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

const SecureAdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { logAction } = useAuditLog();
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('raffle_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

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
      console.error('Unexpected error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveSubmission = async (submission: Submission) => {
    setIsApproving(true);
    try {
      // Validate and sanitize all inputs
      const sanitizedTitle = sanitizeInput(submission.title, 200);
      const sanitizedDescription = sanitizeInput(submission.description, 2000);
      const sanitizedOrganization = submission.organization ? sanitizeInput(submission.organization, 200) : '';
      const sanitizedLocation = submission.location ? sanitizeInput(submission.location, 200) : '';

      // Validate URLs
      let sanitizedFacebookUrl = '';
      let sanitizedJoinUrl = '';
      
      if (submission.organizer_facebook_url) {
        if (validateUrl(submission.organizer_facebook_url)) {
          sanitizedFacebookUrl = sanitizeUrl(submission.organizer_facebook_url);
        } else {
          toast({
            title: "Validation Error",
            description: "Invalid Facebook URL format",
            variant: "destructive",
          });
          return;
        }
      }

      if (submission.slot_inquiry_url) {
        if (validateUrl(submission.slot_inquiry_url)) {
          sanitizedJoinUrl = sanitizeUrl(submission.slot_inquiry_url);
        } else {
          toast({
            title: "Validation Error",
            description: "Invalid join URL format",
            variant: "destructive",
          });
          return;
        }
      }

      // Calculate winning percentage (simplified for demo)
      const winningPercentage = submission.betting_cost && submission.entries_left 
        ? Math.min(1 / submission.entries_left, 0.02)
        : 0.01;

      // Create approved raffle entry
      const { error: insertError } = await supabase
        .from('approved_raffles')
        .insert({
          title: sanitizedTitle,
          description: sanitizedDescription,
          category: submission.category,
          prize: submission.prize,
          betting_cost: submission.betting_cost || 0,
          winning_percentage: winningPercentage,
          draw_date: submission.draw_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          organization: sanitizedOrganization,
          location: sanitizedLocation,
          featured: false,
          entries_left: submission.entries_left,
          external_join_url: sanitizedJoinUrl,
          organizer_facebook_url: sanitizedFacebookUrl,
          convertible_to_cash: submission.convertible_to_cash || false,
          image_url: submission.image_url,
          submission_id: submission.id
        });

      if (insertError) {
        console.error('Error creating approved raffle:', insertError);
        toast({
          title: "Error",
          description: "Failed to approve raffle",
          variant: "destructive",
        });
        return;
      }

      // Update submission status
      const { error: updateError } = await supabase
        .from('raffle_submissions')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: user?.id
        })
        .eq('id', submission.id);

      if (updateError) {
        console.error('Error updating submission status:', updateError);
        toast({
          title: "Error",
          description: "Failed to update submission status",
          variant: "destructive",
        });
        return;
      }

      // Log the approval action
      await logAction(
        'RAFFLE_APPROVED',
        'raffle_submissions',
        submission.id,
        { status: 'pending' },
        { status: 'approved', approved_by: user?.id }
      );

      toast({
        title: "Success",
        description: `Raffle "${sanitizedTitle}" has been approved and published!`,
      });

      setIsModalOpen(false);
      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Unexpected error approving submission:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const rejectSubmission = async (submission: Submission) => {
    try {
      const { error } = await supabase
        .from('raffle_submissions')
        .update({ status: 'rejected' })
        .eq('id', submission.id);

      if (error) {
        console.error('Error rejecting submission:', error);
        toast({
          title: "Error",
          description: "Failed to reject submission",
          variant: "destructive",
        });
        return;
      }

      // Log the rejection action
      await logAction(
        'RAFFLE_REJECTED',
        'raffle_submissions',
        submission.id,
        { status: 'pending' },
        { status: 'rejected' }
      );

      toast({
        title: "Submission Rejected",
        description: `Raffle "${submission.title}" has been rejected.`,
      });

      setIsModalOpen(false);
      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Unexpected error rejecting submission:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSubmissionClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleSignOut = async () => {
    await logAction('ADMIN_LOGOUT');
    await signOut();
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const approvedSubmissions = submissions.filter(s => s.status === 'approved');
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Raffles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedSubmissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedSubmissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedSubmissions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingSubmissions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No pending submissions</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Prize</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingSubmissions.map((submission) => (
                      <TableRow 
                        key={submission.id}
                        onClick={() => handleSubmissionClick(submission)}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{submission.title}</TableCell>
                        <TableCell>{submission.category}</TableCell>
                        <TableCell>₱{submission.prize?.toLocaleString()}</TableCell>
                        <TableCell>{new Date(submission.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Pending</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {approvedSubmissions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No approved submissions</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Prize</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedSubmissions.map((submission) => (
                      <TableRow 
                        key={submission.id}
                        onClick={() => handleSubmissionClick(submission)}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{submission.title}</TableCell>
                        <TableCell>{submission.category}</TableCell>
                        <TableCell>₱{submission.prize?.toLocaleString()}</TableCell>
                        <TableCell>{new Date(submission.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge>Approved</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {rejectedSubmissions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No rejected submissions</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Prize</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedSubmissions.map((submission) => (
                      <TableRow 
                        key={submission.id}
                        onClick={() => handleSubmissionClick(submission)}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{submission.title}</TableCell>
                        <TableCell>{submission.category}</TableCell>
                        <TableCell>₱{submission.prize?.toLocaleString()}</TableCell>
                        <TableCell>{new Date(submission.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">Rejected</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedSubmission && (
        <AdminSubmissionModal
          submission={selectedSubmission}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSubmission(null);
          }}
          onApprove={() => approveSubmission(selectedSubmission)}
          onReject={() => rejectSubmission(selectedSubmission)}
          isApproving={isApproving}
        />
      )}
    </div>
  );
};

export default SecureAdminDashboard;
