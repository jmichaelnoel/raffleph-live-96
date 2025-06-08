
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSEOSettings } from '@/hooks/useSEOSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, Settings, Globe, Share2, Palette, Download, Upload } from 'lucide-react';

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

  const handleSave = () => {
    setSaving(true);
    updateSettings(localSettings);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Updated",
        description: "SEO settings have been updated successfully (in-memory only)"
      });
    }, 500);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(localSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'seo-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setLocalSettings(importedSettings);
          toast({
            title: "Settings Imported",
            description: "SEO settings have been imported successfully"
          });
        } catch (error) {
          toast({
            title: "Import Error",
            description: "Failed to import settings. Please check the file format.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const getInputComponent = (field: SEOSettingField) => {
    const value = localSettings[field.key as keyof typeof localSettings] || '';
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
          🔧 SEO Settings Manager (File-Based)
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Manage your site's SEO properties, meta tags, and social sharing settings
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Import/Export Controls */}
        <div className="flex gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <Button
            onClick={exportSettings}
            variant="outline"
            className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <label className="cursor-pointer">
            <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2 border-green-200 text-green-600 hover:bg-green-50 rounded-xl">
              <Upload className="h-4 w-4 mr-2" />
              Import Settings
            </span>
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
            />
          </label>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg ml-auto"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save All'}
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
                
                {field.key.includes('image') && localSettings[field.key as keyof typeof localSettings] && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img 
                      src={localSettings[field.key as keyof typeof localSettings] as string} 
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
          <h4 className="font-semibold text-blue-800 mb-2">💡 File-Based System Notes</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Settings are stored locally and persist in browser session</li>
            <li>• Use Export/Import to backup or transfer settings</li>
            <li>• Changes are applied immediately to the site preview</li>
            <li>• For permanent storage, consider upgrading to database version</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSettingsManager;
