
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
      console.log('Fetching SEO settings...');
      
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching SEO settings:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
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
        console.log('SEO settings fetched successfully:', data);
        setSettings(data);
        // Update favicon immediately if we have a custom one
        if (data.favicon_url) {
          updateFavicon(data.favicon_url);
        }
      } else {
        console.log('No SEO settings found, using defaults');
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
      console.error('Unexpected error fetching SEO settings:', error);
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
      console.log('Starting SEO settings update:', newSettings);
      
      // Get the current settings ID or create new one
      const { data: existingData, error: fetchError } = await supabase
        .from('seo_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching existing settings for update:', fetchError);
        throw fetchError;
      }

      console.log('Existing data:', existingData);

      let result;
      if (existingData) {
        // Update existing settings
        console.log('Updating existing settings with ID:', existingData.id);
        result = await supabase
          .from('seo_settings')
          .update(newSettings)
          .eq('id', existingData.id)
          .select()
          .single();
      } else {
        // Insert new settings
        console.log('Inserting new settings');
        result = await supabase
          .from('seo_settings')
          .insert([newSettings])
          .select()
          .single();
      }

      console.log('Update/Insert result:', result);

      if (result.error) {
        console.error('Database operation error:', result.error);
        console.error('Error details:', {
          message: result.error.message,
          details: result.error.details,
          hint: result.error.hint,
          code: result.error.code
        });
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
      
      return result.data;
    } catch (error) {
      console.error('Failed to update SEO settings:', error);
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error?.constructor?.name);
      
      // Create enhanced error without using Error.cause (not available in older TypeScript)
      const enhancedError = new Error(`SEO settings update failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw enhancedError;
    }
  };

  return { settings, loading, updateSettings, refetch: fetchSettings };
};
