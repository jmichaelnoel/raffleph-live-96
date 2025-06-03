
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, ExternalLink } from 'lucide-react';
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

interface AdminSubmissionModalProps {
  submission: Submission;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  isApproving?: boolean;
}

const AdminSubmissionModal: React.FC<AdminSubmissionModalProps> = ({
  submission,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isApproving = false,
}) => {
  const bundlePricing = Array.isArray(submission.bundle_pricing) 
    ? submission.bundle_pricing 
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{submission.title}</DialogTitle>
              <DialogDescription className="mt-1">
                Submitted on {new Date(submission.submitted_at).toLocaleDateString()}
              </DialogDescription>
            </div>
            <Badge variant={
              submission.status === 'pending' ? 'secondary' :
              submission.status === 'approved' ? 'default' : 'destructive'
            }>
              {submission.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Preview */}
          {submission.image_url && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Raffle Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={submission.image_url} 
                  alt={submission.title}
                  className="w-full max-w-md h-64 object-cover rounded-lg border-2 border-gray-200"
                />
              </CardContent>
            </Card>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-lg">{submission.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Prize Value</label>
                  <p className="text-lg font-semibold text-green-600">₱{submission.prize?.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Organization</label>
                  <p className="text-lg">{submission.organization || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-lg">{submission.location || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Betting Cost</label>
                  <p className="text-lg">₱{submission.betting_cost || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Slots (available & taken)</label>
                  <p className="text-lg">{submission.entries_left || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Draw Date</label>
                  <p className="text-lg">
                    {submission.draw_date ? new Date(submission.draw_date).toLocaleDateString() : 'Not specified'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Convertible to Cash</label>
                  <p className="text-lg">{submission.convertible_to_cash ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{submission.description}</p>
            </CardContent>
          </Card>

          {/* Bundle Pricing */}
          {bundlePricing.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bundle Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tickets</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bundlePricing.map((bundle: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{bundle.tickets}</TableCell>
                        <TableCell>₱{bundle.price}</TableCell>
                        <TableCell>{bundle.savings || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">External Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {submission.organizer_facebook_url && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Facebook Page</label>
                  <div className="flex items-center gap-2">
                    <a 
                      href={submission.organizer_facebook_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {submission.organizer_facebook_url}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
              
              {submission.raffle_details_url && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Raffle Details URL</label>
                  <div className="flex items-center gap-2">
                    <a 
                      href={submission.raffle_details_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {submission.raffle_details_url}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
              
              {submission.slot_inquiry_url && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Slot Inquiry URL</label>
                  <div className="flex items-center gap-2">
                    <a 
                      href={submission.slot_inquiry_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {submission.slot_inquiry_url}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {submission.status === 'pending' && (
            <div className="flex gap-4 pt-4 border-t">
              <Button 
                onClick={onApprove} 
                className="flex-1"
                disabled={isApproving}
              >
                {isApproving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Approving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Approve & Publish
                  </>
                )}
              </Button>
              <Button 
                onClick={onReject} 
                variant="destructive" 
                className="flex-1"
                disabled={isApproving}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSubmissionModal;
