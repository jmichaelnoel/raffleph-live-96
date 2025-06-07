
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SupabaseRaffle } from './useSupabaseRaffles';

export const useSupabaseRaffle = (raffleId: string) => {
  const [raffle, setRaffle] = useState<SupabaseRaffle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRaffle = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: raffleData, error: raffleError } = await supabase
        .from('raffles')
        .select(`
          *,
          consolation_prizes(*),
          bundle_pricing(*)
        `)
        .eq('id', raffleId)
        .eq('approved', true)
        .maybeSingle();

      if (raffleError) {
        throw raffleError;
      }

      setRaffle(raffleData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch raffle';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (raffleId) {
      fetchRaffle();
    }
  }, [raffleId]);

  return {
    raffle,
    loading,
    error,
    refetch: fetchRaffle
  };
};
