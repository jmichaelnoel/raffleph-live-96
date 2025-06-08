
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
      // Using type assertion to work around TypeScript not knowing about seo_settings table
      const { data, error } = await (supabase as any)
        .from('seo_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      const settingsObj: SEOSettings = {};
      data?.forEach((item: any) => {
        settingsObj[item.setting_key as keyof SEOSettings] = item.setting_value;
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, refetch: fetchSettings };
};
