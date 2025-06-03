
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Star, StarOff, Image, ExternalLink } from 'lucide-react';

interface Raffle {
  id: string;
  title: string;
  description: string;
  prize: number;
  category: string;
  organization: string;
  featured: boolean;
  image_url: string | null;
  external_join_url: string;
  end_date: string;
}

const FeaturedRafflesManager = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchRaffles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('approved_raffles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching raffles:', error);
        toast({
          title: "Error",
          description: "Failed to fetch raffles",
          variant: "destructive",
        });
        return;
      }

      setRaffles(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRaffles();
  }, []);

  const handleToggleFeatured = async (raffleId: string, currentFeaturedStatus: boolean) => {
    if (processingIds.has(raffleId)) return;

    const newStatus = !currentFeaturedStatus;
    setProcessingIds(prev => new Set(prev).add(raffleId));

    try {
      // Optimistically update the UI
      setRaffles(prev => prev.map(raffle => 
        raffle.id === raffleId 
          ? { ...raffle, featured: newStatus }
          : raffle
      ));

      const { data, error } = await supabase.rpc('toggle_raffle_featured', {
        raffle_id: raffleId,
        featured_status: newStatus
      });

      if (error) {
        console.error('Error toggling featured status:', error);
        throw error;
      }

      if (!data) {
        // Revert optimistic update
        setRaffles(prev => prev.map(raffle => 
          raffle.id === raffleId 
            ? { ...raffle, featured: currentFeaturedStatus }
            : raffle
        ));

        toast({
          title: "Featured Limit Reached",
          description: "You can only have 6 featured raffles at a time. Please unfeature another raffle first.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: newStatus ? "Raffle Featured! ⭐" : "Raffle Unfeatured",
        description: newStatus 
          ? "This raffle will now appear on the homepage"
          : "This raffle was removed from the homepage",
      });

    } catch (error) {
      console.error('Error toggling featured status:', error);
      
      // Revert optimistic update
      setRaffles(prev => prev.map(raffle => 
        raffle.id === raffleId 
          ? { ...raffle, featured: currentFeaturedStatus }
          : raffle
      ));

      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(raffleId);
        return newSet;
      });
    }
  };

  const featuredCount = raffles.filter(r => r.featured).length;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Featured Raffles Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading raffles...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Featured Raffles Management
        </CardTitle>
        <CardDescription>
          Select which approved raffles to feature on the homepage. Maximum 6 featured raffles allowed.
          <br />
          <span className="font-medium">Currently featured: {featuredCount}/6</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {raffles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No approved raffles found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {raffles.map((raffle) => {
              const isProcessing = processingIds.has(raffle.id);
              
              return (
                <div 
                  key={raffle.id}
                  className={`border rounded-lg p-4 transition-all ${
                    raffle.featured ? 'bg-yellow-50 border-yellow-200' : 'bg-white'
                  } ${isProcessing ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {raffle.image_url ? (
                        <img 
                          src={raffle.image_url} 
                          alt={raffle.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{raffle.title}</h3>
                          {raffle.featured && (
                            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {raffle.description.substring(0, 120)}...
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          <span>Prize: ₱{raffle.prize?.toLocaleString()}</span>
                          <span>•</span>
                          <span>Category: {raffle.category}</span>
                          <span>•</span>
                          <span>Organization: {raffle.organization}</span>
                          <span>•</span>
                          <span>Ends: {new Date(raffle.end_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={raffle.featured ? "destructive" : "default"}
                        size="sm"
                        onClick={() => handleToggleFeatured(raffle.id, raffle.featured)}
                        disabled={isProcessing || (!raffle.featured && featuredCount >= 6)}
                        className="min-w-[120px]"
                      >
                        {isProcessing ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                        ) : raffle.featured ? (
                          <StarOff className="h-4 w-4 mr-1" />
                        ) : (
                          <Star className="h-4 w-4 mr-1" />
                        )}
                        {isProcessing 
                          ? 'Processing...' 
                          : raffle.featured 
                            ? 'Unfeature' 
                            : 'Feature'
                        }
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(raffle.external_join_url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturedRafflesManager;
