
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminStats {
  pending: number;
  approved: number;
  total: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    pending: 0,
    approved: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      // Fetch total submissions count
      const { count: totalCount, error: totalError } = await supabase
        .from('raffle_submissions')
        .select('*', { count: 'exact', head: true });

      if (totalError) {
        console.error('Error fetching total submissions:', totalError);
        throw totalError;
      }

      // Fetch approved raffles count
      const { count: approvedCount, error: approvedError } = await supabase
        .from('approved_raffles')
        .select('*', { count: 'exact', head: true });

      if (approvedError) {
        console.error('Error fetching approved raffles:', approvedError);
        throw approvedError;
      }

      const total = totalCount || 0;
      const approved = approvedCount || 0;
      const pending = total - approved;

      setStats({
        pending,
        approved,
        total
      });

    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Set up real-time subscriptions for both tables
  useEffect(() => {
    const submissionsChannel = supabase
      .channel('raffle_submissions_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'raffle_submissions'
        },
        () => {
          console.log('Submissions table changed, refreshing stats');
          fetchStats();
        }
      )
      .subscribe();

    const approvedChannel = supabase
      .channel('approved_raffles_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'approved_raffles'
        },
        () => {
          console.log('Approved raffles table changed, refreshing stats');
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(submissionsChannel);
      supabase.removeChannel(approvedChannel);
    };
  }, []);

  return {
    stats,
    isLoading,
    refreshStats: fetchStats
  };
};
