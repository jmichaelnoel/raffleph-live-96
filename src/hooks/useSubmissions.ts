
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useSubmissions = (statusFilter: 'all' | 'pending' | 'approved' | 'rejected') => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    fetchSubmissions();
  }, [statusFilter]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('raffle_submissions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'raffle_submissions'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchSubmissions(); // Refresh data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [statusFilter]);

  return {
    submissions,
    isLoading,
    fetchSubmissions,
    setSubmissions
  };
};
