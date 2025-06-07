
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SupabaseRaffle {
  id: string;
  title: string;
  batch_number: string | null;
  description: string;
  slug: string;
  grand_prize: string;
  grand_prize_value: number;
  grand_prize_images: string[];
  convertible_to_cash: boolean;
  category: 'Cars' | 'Motorcycle' | 'Gadgets' | 'Cash';
  cost_per_slot: number;
  total_slots: number;
  draw_date: string;
  organization_name: string;
  facebook_page_url: string;
  raffle_link: string;
  buying_slots_url: string;
  approved: boolean;
  created_at: string;
  updated_at: string;
  consolation_prizes?: Array<{
    id: string;
    title: string;
    value: number;
    is_cash: boolean;
    images: string[];
  }>;
  bundle_pricing?: Array<{
    id: string;
    slots: number;
    price: number;
  }>;
}

export const useSupabaseRaffles = () => {
  const [raffles, setRaffles] = useState<SupabaseRaffle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: rafflesData, error: rafflesError } = await supabase
        .from('raffles')
        .select(`
          *,
          consolation_prizes(*),
          bundle_pricing(*)
        `)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (rafflesError) {
        throw rafflesError;
      }

      setRaffles(rafflesData || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch raffles';
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
    fetchRaffles();
  }, []);

  return {
    raffles,
    loading,
    error,
    refetch: fetchRaffles
  };
};
