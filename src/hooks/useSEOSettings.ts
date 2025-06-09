
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
          site_title: 'RafflePH - Win Cars, Millions in Cash, and More | No Sign-up Required',
          site_description: 'Win cars, millions in cash, and more — no sign-up required. Para sa pamilya, para sa pangarap — ito na \'yon! Join exciting online raffles in the Philippines with entry fees starting at ₱20.',
          default_social_image: '/lovable-uploads/adc5bb76-0107-4448-9683-195bd554314c.png',
          favicon_url: '/favicon.ico',
          og_site_name: 'RafflePH',
          twitter_handle: '@PhilippineRaffles',
          theme_color: '#6366f1'
        });
      } else if (data) {
        setSettings(data);
        // Update favicon immediately if we have a custom one
        if (data.favicon_url) {
          updateFavicon(data.favicon_url);
        }
      } else {
        // No data exists yet, use defaults
        setSettings({
          site_title: 'RafflePH - Win Cars, Millions in Cash, and More | No Sign-up Required',
          site_description: 'Win cars, millions in cash, and more — no sign-up required. Para sa pamilya, para sa pangarap — ito na \'yon! Join exciting online raffles in the Philippines with entry fees starting at ₱20.',
          default_social_image: '/lovable-uploads/adc5bb76-0107-4448-9683-195bd554314c.png',
          favicon_url: '/favicon.ico',
          og_site_name: 'RafflePH',
          twitter_handle: '@PhilippineRaffles',
          theme_color: '#6366f1'
        });
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
      const cacheBustUrl = `${faviconUrl}?v=${Date.now()}`;

      // Create new favicon link
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = cacheBustUrl;
      document.head.appendChild(link);

      console.log('Favicon updated:', cacheBustUrl);
    } catch (error) {
      console.error('Error updating favicon:', error);
    }
  };

  const updateSettings = async (newSettings: SEOSettings) => {
    try {
      console.log('Updating SEO settings:', newSettings);
      
      // Get the current settings ID or create new one
      const { data: existingData } = await supabase
        .from('seo_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      let result;
      if (existingData) {
        // Update existing settings
        result = await supabase
          .from('seo_settings')
          .update(newSettings)
          .eq('id', existingData.id)
          .select()
          .single();
      } else {
        // Insert new settings
        result = await supabase
          .from('seo_settings')
          .insert([newSettings])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error updating SEO settings:', result.error);
        throw result.error;
      }

      console.log('SEO settings updated successfully:', result.data);
      
      // Update local state immediately
      setSettings(newSettings);
      
      // Update favicon if it changed
      if (newSettings.favicon_url && newSettings.favicon_url !== settings.favicon_url) {
        updateFavicon(newSettings.favicon_url);
      }

      // Refresh the settings from database to ensure consistency
      await fetchSettings();
    } catch (error) {
      console.error('Failed to update SEO settings:', error);
      throw error;
    }
  };

  return { settings, loading, updateSettings, refetch: fetchSettings };
};
