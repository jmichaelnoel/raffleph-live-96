
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSEOSettings } from '@/hooks/useSEOSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Settings, Globe, Share2, Palette } from 'lucide-react';
import SEOImageUpload from './SEOImageUpload';

interface SEOSettingField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'url';
  description: string;
  category: 'basic' | 'social' | 'appearance';
}

const seoFields: SEOSettingField[] = [
  {
    key: 'site_title',
    label: 'Site Title',
    type: 'text',
    description: 'Main title for your website (max 60 characters)',
    category: 'basic'
  },
  {
    key: 'site_description',
    label: 'Site Description',
    type: 'textarea',
    description: 'Meta description for your website (max 160 characters)',
    category: 'basic'
  },
  {
    key: 'og_site_name',
    label: 'Site Name (Open Graph)',
    type: 'text',
    description: 'Site name for social media sharing',
    category: 'social'
  },
  {
    key: 'twitter_handle',
    label: 'Twitter Handle',
    type: 'text',
    description: 'Your Twitter username (e.g., @YourHandle)',
    category: 'social'
  },
  {
    key: 'default_social_image',
    label: 'Default Social Image',
    type: 'url',
    description: 'Default image for social media sharing (1200x630px recommended)',
    category: 'social'
  },
  {
    key: 'favicon_url',
    label: 'Favicon URL',
    type: 'url',
    description: 'URL to your website favicon',
    category: 'appearance'
  },
  {
    key: 'theme_color',
    label: 'Theme Color',
    type: 'color',
    description: 'Primary theme color for your website',
    category: 'appearance'
  }
];

const SEOSettingsManager = () => {
  const { settings, loading, updateSettings } = useSEOSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleInputChange = (key: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(localSettings);
      toast({
        title: "Settings Saved",
        description: "SEO settings have been successfully saved to the database."
      });
    } catch (error) {
      console.error('Failed to save SEO settings:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save SEO settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getInputComponent = (field: SEOSettingField) => {
    const value = localSettings[field.key as keyof typeof localSettings] || '';

    // Special handling for image fields
    if (field.key === 'default_social_image') {
      return (
        <SEOImageUpload
          label="Default Social Image"
          value={value}
          onChange={(newValue) => handleInputChange(field.key, newValue)}
          type="social"
          description={field.description}
        />
      );
    }

    if (field.key === 'favicon_url') {
      return (
        <SEOImageUpload
          label="Favicon"
          value={value}
          onChange={(newValue) => handleInputChange(field.key, newValue)}
          type="favicon"
          description={field.description}
        />
      );
    }

    // Regular input handling for non-image fields
    const commonProps = {
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleInputChange(field.key, e.target.value),
      className: "border-2 border-purple-200 focus:border-purple-400 rounded-xl"
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea 
            {...commonProps}
            rows={3}
            placeholder={field.description}
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
            placeholder={field.description}
          />
        );
    }
  };

  const getSettingIcon = (category: string) => {
    switch (category) {
      case 'basic': return <Globe className="h-4 w-4" />;
      case 'social': return <Share2 className="h-4 w-4" />;
      case 'appearance': return <Palette className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      basic: { name: 'Basic SEO', color: 'bg-blue-100 text-blue-700' },
      social: { name: 'Social Media', color: 'bg-green-100 text-green-700' },
      appearance: { name: 'Appearance', color: 'bg-purple-100 text-purple-700' }
    };
    return badges[category as keyof typeof badges] || { name: 'General', color: 'bg-gray-100 text-gray-700' };
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
          🔧 SEO Settings Manager (Database-Backed)
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Manage your site's SEO properties, meta tags, and social sharing settings. Changes are saved to the database.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Save Button */}
        <div className="flex justify-end mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save All Settings'}
          </Button>
        </div>

        <div className="space-y-6">
          {seoFields.map((field) => {
            const category = getCategoryBadge(field.category);
            return (
              <div key={field.key} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSettingIcon(field.category)}
                    <h3 className="font-semibold text-gray-800">{field.label}</h3>
                    <Badge className={category.color}>
                      {category.name}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{field.description}</p>
                
                {getInputComponent(field)}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Database-Backed System Notes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Settings are stored permanently in the Supabase database</li>
            <li>• Images are uploaded to secure Supabase storage buckets</li>
            <li>• Changes are applied immediately to the site preview</li>
            <li>• All data persists across sessions and deployments</li>
            <li>• Admin authentication required for making changes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSettingsManager;
