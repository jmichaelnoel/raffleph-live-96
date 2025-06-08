
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Settings, Globe, Share2, Palette } from 'lucide-react';

interface SEOSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description: string;
}

const SEOSettingsManager = () => {
  const [settings, setSettings] = useState<SEOSetting[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Using type assertion to work around TypeScript not knowing about seo_settings table
      const { data, error } = await (supabase as any)
        .from('seo_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch SEO settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingKey: string, value: string) => {
    try {
      setSaving(true);
      // Using type assertion to work around TypeScript not knowing about seo_settings table
      const { error } = await (supabase as any)
        .from('seo_settings')
        .update({ setting_value: value })
        .eq('setting_key', settingKey);

      if (error) throw error;

      setSettings(prev => 
        prev.map(setting => 
          setting.setting_key === settingKey 
            ? { ...setting, setting_value: value }
            : setting
        )
      );

      toast({
        title: "Success",
        description: "SEO setting updated successfully"
      });
    } catch (error) {
      console.error('Error updating SEO setting:', error);
      toast({
        title: "Error",
        description: "Failed to update SEO setting",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (settingKey: string, value: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.setting_key === settingKey 
          ? { ...setting, setting_value: value }
          : setting
      )
    );
  };

  const getInputComponent = (setting: SEOSetting) => {
    const commonProps = {
      value: setting.setting_value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleInputChange(setting.setting_key, e.target.value),
      className: "border-2 border-purple-200 focus:border-purple-400 rounded-xl"
    };

    switch (setting.setting_type) {
      case 'textarea':
        return (
          <Textarea 
            {...commonProps}
            rows={3}
            placeholder={setting.description}
          />
        );
      case 'color':
        return (
          <div className="flex gap-2">
            <Input 
              {...commonProps}
              type="color"
              className="w-20 h-12 p-1"
            />
            <Input 
              {...commonProps}
              type="text"
              placeholder="#8B5CF6"
              className="flex-1"
            />
          </div>
        );
      default:
        return (
          <Input 
            {...commonProps}
            type="text"
            placeholder={setting.description}
          />
        );
    }
  };

  const getSettingIcon = (settingKey: string) => {
    if (settingKey.includes('title') || settingKey.includes('description')) {
      return <Globe className="h-4 w-4" />;
    }
    if (settingKey.includes('social') || settingKey.includes('og') || settingKey.includes('twitter')) {
      return <Share2 className="h-4 w-4" />;
    }
    if (settingKey.includes('color') || settingKey.includes('theme')) {
      return <Palette className="h-4 w-4" />;
    }
    return <Settings className="h-4 w-4" />;
  };

  const getSettingCategory = (settingKey: string) => {
    if (settingKey.includes('title') || settingKey.includes('description')) {
      return { name: 'Basic SEO', color: 'bg-blue-100 text-blue-700' };
    }
    if (settingKey.includes('social') || settingKey.includes('og') || settingKey.includes('twitter')) {
      return { name: 'Social Media', color: 'bg-green-100 text-green-700' };
    }
    if (settingKey.includes('favicon') || settingKey.includes('theme')) {
      return { name: 'Appearance', color: 'bg-purple-100 text-purple-700' };
    }
    return { name: 'General', color: 'bg-gray-100 text-gray-700' };
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-2xl mb-2">⏳</div>
        <div className="text-gray-600">Loading SEO settings...</div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
        <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-600" />
          🔧 SEO Settings Manager
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Manage your site's SEO properties, meta tags, and social sharing settings
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {settings.map((setting) => {
            const category = getSettingCategory(setting.setting_key);
            return (
              <div key={setting.id} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSettingIcon(setting.setting_key)}
                    <h3 className="font-semibold text-gray-800 capitalize">
                      {setting.setting_key.replace(/_/g, ' ')}
                    </h3>
                    <Badge className={category.color}>
                      {category.name}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => updateSetting(setting.setting_key, setting.setting_value)}
                    disabled={saving}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                
                {getInputComponent(setting)}
                
                {setting.setting_key.includes('image') && setting.setting_value && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img 
                      src={setting.setting_value} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Quick Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Changes take effect immediately across the site</li>
            <li>• For images, use full URLs or upload files to your media library</li>
            <li>• Keep titles under 60 characters and descriptions under 160 characters</li>
            <li>• Test your social sharing with tools like Facebook Debugger</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSettingsManager;
