import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Check, X } from 'lucide-react';
import DrawDateBadge from '@/components/DrawDateBadge';
import DrawDateEditor from '@/components/admin/DrawDateEditor';

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

interface SubmissionsListProps {
  submissions: Submission[];
  isLoading: boolean;
  processingIds: Set<string>;
  statusFilter: 'all' | 'pending' | 'approved' | 'rejected';
  onReview: (submission: Submission) => void;
  onApprove: (submission: Submission) => void;
  onReject: (submission: Submission) => void;
  onViewPending: () => void;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  isLoading,
  processingIds,
  statusFilter,
  onReview,
  onApprove,
  onReject,
  onViewPending,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading submissions...</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          {statusFilter === 'pending' ? 'No pending submissions' : 
           statusFilter === 'approved' ? 'No approved submissions' :
           statusFilter === 'rejected' ? 'No rejected submissions' : 'No submissions found'}
        </p>
        {statusFilter !== 'all' && statusFilter !== 'pending' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={onViewPending}
          >
            View Pending Submissions
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => {
        const isProcessing = processingIds.has(submission.id);
        
        return (
          <div 
            key={submission.id} 
            className={`border rounded-lg p-4 bg-white transition-all ${
              isProcessing ? 'opacity-75' : ''
            }`}
          >
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
                  {submission.status === 'approved' && submission.draw_date !== undefined && (
                    <DrawDateBadge drawDate={submission.draw_date} />
                  )}
                  {isProcessing && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{submission.description.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>Prize: ₱{submission.prize?.toLocaleString()}</span>
                  <span>Category: {submission.category}</span>
                  <span>Organization: {submission.organization || 'N/A'}</span>
                  <span>Submitted: {new Date(submission.submitted_at).toLocaleDateString()}</span>
                  {submission.draw_date && (
                    <span>Draw: {new Date(submission.draw_date).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReview(submission)}
                  disabled={isProcessing}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
                {submission.status === 'approved' && submission.draw_date !== undefined && (
                  <DrawDateEditor
                    raffleId={submission.id}
                    currentDate={submission.draw_date}
                    onUpdate={(newDate) => {
                      // Update the submission in the parent component
                      // This would need to be passed as a prop or handled via state management
                    }}
                  />
                )}
                {submission.status === 'pending' && (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onApprove(submission)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      {isProcessing ? 'Processing...' : 'Approve'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onReject(submission)}
                      disabled={isProcessing}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;
