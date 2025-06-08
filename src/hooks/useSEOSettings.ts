
import { useState, useEffect } from 'react';

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
      // Load settings from local JSON file
      const response = await fetch('/src/data/seoSettings.json');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        // Fallback to default settings if file not found
        setSettings({
          site_title: 'Philippine Raffles - Win Amazing Prizes | Join Verified Raffles',
          site_description: 'Discover verified raffles in the Philippines. Win gadgets, cars, cash prizes and more. Join trusted raffles from verified organizers with transparent winning odds.',
          default_social_image: '/placeholder.svg',
          favicon_url: '/favicon.ico',
          og_site_name: 'Philippine Raffles',
          twitter_handle: '@PhilippineRaffles',
          theme_color: '#8B5CF6'
        });
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (newSettings: SEOSettings) => {
    setSettings(newSettings);
    // Note: In a real implementation, you'd need a backend API to save the file
    console.log('Settings updated (in-memory only):', newSettings);
  };

  return { settings, loading, updateSettings, refetch: fetchSettings };
};
