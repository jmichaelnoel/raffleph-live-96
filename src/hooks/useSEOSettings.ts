
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

  const updateFavicon = (faviconUrl: string) => {
    try {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());

      // Add cache-busting parameter
      const cacheBustUrl = faviconUrl.includes('?') 
        ? `${faviconUrl}&t=${Date.now()}` 
        : `${faviconUrl}?t=${Date.now()}`;

      // Create new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = cacheBustUrl;
      link.type = 'image/x-icon';
      document.head.appendChild(link);

      console.log('Favicon updated:', cacheBustUrl);
    } catch (error) {
      console.error('Error updating favicon:', error);
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

      // Update local state immediately
      setSettings(newSettings);
      
      // Update favicon if it changed
      if (newSettings.favicon_url && newSettings.favicon_url !== settings.favicon_url) {
        updateFavicon(newSettings.favicon_url);
      }

      console.log('SEO settings updated successfully in database');
      
      // Refresh the settings from database to ensure consistency
      await fetchSettings();
    } catch (error) {
      console.error('Failed to update SEO settings:', error);
      throw error;
    }
  };

  return { settings, loading, updateSettings, refetch: fetchSettings };
};
