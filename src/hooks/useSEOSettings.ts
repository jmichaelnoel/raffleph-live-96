
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SEOSettings {
  site_title?: string;
  site_description?: string;
  default_social_image?: string;
  favicon_url?: string;
  og_site_name?: string;
  twitter_handle?: string;
  theme_color?: string;
}

export const useSEOSettings = () => {
  const [settings, setSettings] = useState<SEOSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching SEO settings:', error);
        // Use default settings on error
        setSettings({
          site_title: 'Philippine Raffles - Win Amazing Prizes | Join Verified Raffles',
          site_description: 'Discover verified raffles in the Philippines. Win gadgets, cars, cash prizes and more. Join trusted raffles from verified organizers with transparent winning odds.',
          default_social_image: '/placeholder.svg',
          favicon_url: '/favicon.ico',
          og_site_name: 'Philippine Raffles',
          twitter_handle: '@PhilippineRaffles',
          theme_color: '#8B5CF6'
        });
      } else if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: SEOSettings) => {
    try {
      // Get the current settings ID or create new one
      const { data: existingData } = await supabase
        .from('seo_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existingData) {
        // Update existing settings
        const { error } = await supabase
          .from('seo_settings')
          .update(newSettings)
          .eq('id', existingData.id);

        if (error) {
          console.error('Error updating SEO settings:', error);
          throw error;
        }
      } else {
        // Insert new settings
        const { error } = await supabase
          .from('seo_settings')
          .insert([newSettings]);

        if (error) {
          console.error('Error inserting SEO settings:', error);
          throw error;
        }
      }

      setSettings(newSettings);
      console.log('SEO settings updated successfully in database');
    } catch (error) {
      console.error('Failed to update SEO settings:', error);
      throw error;
    }
  };

  return { settings, loading, updateSettings, refetch: fetchSettings };
};
